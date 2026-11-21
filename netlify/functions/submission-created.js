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

async function sendEmail(postmarkToken, message) {
  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": postmarkToken,
    },
    body: JSON.stringify({ MessageStream: "outbound", ...message }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Postmark request failed for ${message.To}:`,
      response.status,
      errorText,
    );
    return false;
  }
  return true;
}

export const handler = async (event) => {
  const { payload } = JSON.parse(event.body);
  const formName = payload.form_name;

  if (!NOTIFY_FORMS.has(formName)) {
    return { statusCode: 200, body: "Skipped: not a watched form" };
  }

  const data = payload.data;
  const name = [data.first_name, data.last_name].filter(Boolean).join(" ");
  const firstName = data.first_name || "there";

  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
  const fromEmail = process.env.POSTMARK_FROM_EMAIL;

  if (!postmarkToken || !fromEmail) {
    console.error(
      "Missing POSTMARK_SERVER_TOKEN or POSTMARK_FROM_EMAIL env vars",
    );
    return { statusCode: 500, body: "Email not configured" };
  }

  const notifyOk = await sendEmail(postmarkToken, {
    From: fromEmail,
    To: TO_EMAIL,
    Subject: name
      ? `New quote request from ${name}`
      : "New quote request submitted",
    TextBody: buildEmailBody(data),
  });

  let confirmationOk = true;
  if (data.email) {
    confirmationOk = await sendEmail(postmarkToken, {
      From: fromEmail,
      To: data.email,
      Subject: "We've received your quote request",
      TextBody: `Hi ${firstName},\n\nThanks for reaching out to Wi-Fi Pros — we've received your quote request and will follow up shortly with next steps.\n\nWi-Fi Pros Network Consulting`,
    });
  }

  if (!notifyOk || !confirmationOk) {
    return { statusCode: 502, body: "Failed to send one or more emails" };
  }

  return { statusCode: 200, body: "Notifications sent" };
};
