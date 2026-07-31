export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What services do you offer?",
    answer:
      "We offer home and business networking services that are customize to each client's particular needs. This includes wired and wireless networks and fibre optic or wireless links for outbuildings such as shops and barns. We also install camera surveillance, door access systems, network attached storage solutions, and integrated multi-zone audio systems.",
  },
  {
    question: "How do I get started?",
    answer:
      "The best way is to fill out our quote request form with as much detail as possible. We will then reach out within one or two business days to refine the requirements and book a site visit, phone call, or video chat.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The cost varies considerably depending on the hardware and services requested, size of the building, if there are any outbuildings that need service, etc.",
  },
  {
    question: "Do you offer support after the installation?",
    answer:
      "Definitely! We offer free support during the first 30 days after the installation. After 30 days we have paid support options. The hardware is covered by the manufacturer's warranty.",
  },
  {
    question: "What brand of hardware do you use and why?",
    answer:
      "We use UniFi hardware by Ubiquiti. UniFi has a wide range of hardware available which allows for great flexibility in the network design. It's also possible to upgrade or swap out individual components easily. One big advantage of UniFi over other vendors is you're not stuck with a cloud subscription fee to enable certain features. The hardware is yours and can be configured however it's needed.",
  },
  {
    question: "Do you mark up your hardware?",
    answer:
      "We don't mark up the hardware directly, but we will charge a 10% fee to cover the time associated with ordering and receiving the Ubiquiti equipment.",
  },
  {
    question: "Can you activate the Ethernet ports in my new house?",
    answer:
      "Absolutely! We use industry best practices when terminating Ethernet wiring to guarantee trouble free network connections for years.",
  },
  {
    question:
      "I have a detached building that needs internet access. How is this done?",
    answer:
      "There are two ways to do this. The best way is to run an underground fibre optic cable from the house to the detached building. If you've got an existing conduit then it's usually quite easy. If not, we can trench the fibre in. The second best way is to use a wireless point to point building link.",
  },
  {
    question: "Do you install CAT6 wiring?",
    answer:
      "In a lot of cases, yes. It depends on the structure whether it's possible to get a wire to a specific location.",
  },
  {
    question: "What if it's too difficult or impossible to run a wire?",
    answer:
      "If we can't install new CAT6 wiring, it's usually possible to use MoCA (Multimedia over Coax Alliance) to transmit Ethernet over existing coaxial TV wiring.",
  },
  {
    question: "Is wireless mesh any good?",
    answer:
      "Wireless mesh is an alternative when Ethernet wiring or MoCA aren't an option, and the wifi signal needs to be extended to a certain part of a house. It's not as fast as a hardwired access point, but is still usable when it's the only option.",
  },
];
