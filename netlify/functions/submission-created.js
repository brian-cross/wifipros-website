const NOTIFY_FORMS = new Set(["quote-request"]);
const TO_EMAIL = "info@wifipros.ca";

const SKIP_FIELDS = new Set(["form-name", "bot-field"]);

function formatLabel(fieldName) {
  return fieldName
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(", ") || "(none)";
  if (value === undefined || value === null || value === "") return "(none)";
  return String(value);
}

function buildEmailBody(data) {
  return Object.entries(data)
    .filter(([key]) => !SKIP_FIELDS.has(key))
    .map(([key, value]) => `${formatLabel(key)}: ${formatValue(value)}`)
    .join("\n");
}

export const handler = async (event) => {
  const { payload } = JSON.parse(event.body);
  const formName = payload.form_name;

  if (!NOTIFY_FORMS.has(formName)) {
    return { statusCode: 200, body: "Skipped: not a watched form" };
  }

  const data = payload.data;
  const name = [data.first_name, data.last_name].filter(Boolean).join(" ");

  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
  const fromEmail = process.env.POSTMARK_FROM_EMAIL;

  if (!postmarkToken || !fromEmail) {
    console.error(
      "Missing POSTMARK_SERVER_TOKEN or POSTMARK_FROM_EMAIL env vars",
    );
    return { statusCode: 500, body: "Email not configured" };
  }

  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": postmarkToken,
    },
    body: JSON.stringify({
      From: fromEmail,
      To: TO_EMAIL,
      Subject: name
        ? `New quote request from ${name}`
        : "New quote request submitted",
      TextBody: buildEmailBody(data),
      MessageStream: "outbound",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Postmark request failed:", response.status, errorText);
    return { statusCode: 502, body: "Failed to send notification email" };
  }

  return { statusCode: 200, body: "Notification sent" };
};
