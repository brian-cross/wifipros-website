export interface Business {
  name: string;
  legalName: string;
  email: string;
  phone: string;
  hours: {
    weekdays: string;
    weekends: string;
    holidays: string;
  };
}

export const business: Business = {
  name: "Wi-Fi Pros Network Consulting",
  legalName: "Wi-Fi Pros Network Consulting Ltd.",
  email: "info@wifipros.ca",
  phone: "+1 (587) 410-3819",
  hours: {
    weekdays: "9:00 AM – 5:00 PM",
    weekends: "Closed",
    holidays: "Closed",
  },
};
