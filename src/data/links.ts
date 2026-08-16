export interface NavLink {
  href?: string;
  label: string;
  submenu?: NavLink[];
}

export const links: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    submenu: [
      { href: "/services", label: "All Services" },
      {
        href: "/services/ubiquiti-network-design-installation",
        label: "Network Design & Installation",
      },
      {
        href: "/services/unifi-protect-camera-installation",
        label: "Camera Installation",
      },
      {
        href: "/services/smart-building",
        label: "Smart Building & Access",
      },
      {
        href: "/services/rural-acreage-internet-wifi-edmonton-area",
        label: "Rural & Acreage Connectivity",
      },
    ],
  },
  {
    href: "/service-areas",
    label: "Service Areas",
  },
  {
    label: "Info",
    submenu: [
      { href: "/articles", label: "Articles" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    label: "Contact",
    submenu: [
      { href: "/contact", label: "Contact Us" },
      { href: "/quote-request", label: "Quote Request" },
      { href: "/site-assessment", label: "Book a Site Assessment" },
    ],
  },
];
