export const policies = {
  shipping: {
    title: "Shipping & returns",
    sections: [
      {
        heading: "Roast and dispatch",
        body: "Coffee is fictionally roasted Monday to Thursday. Orders placed before 10:00am are usually prepared within two working days.",
      },
      {
        heading: "Delivery",
        body: "Demo orders over RM120 qualify for fictional standard shipping within Peninsular Malaysia. Sabah and Sarawak delivery would be quoted at checkout.",
      },
      {
        heading: "Coffee returns",
        body: "Coffee is perishable, so change-of-mind returns are not accepted in this demonstration. If a real product arrived damaged or incorrect, a credible retailer would ask to be contacted within seven days and offer a replacement or refund.",
      },
      {
        heading: "Demo boundary",
        body: "No order is transmitted, packed or delivered. No payment is taken.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    sections: [
      {
        heading: "What this demo handles",
        body: "Checkout details remain in the browser only long enough to validate the demonstration flow and are cleared after confirmation. They are not sent to ALDER.",
      },
      {
        heading: "Analytics",
        body: "If enabled, product analytics should record content IDs and option categories, never checkout fields or raw search text.",
      },
      {
        heading: "Your choices",
        body: "Do not enter real sensitive information. You can clear locally saved cart data through your browser storage controls.",
      },
    ],
  },
  terms: {
    title: "Terms",
    sections: [
      {
        heading: "A fictional service",
        body: "ALDER ROASTERS is a portfolio demonstration. Products, subscriptions, location details and availability are fictional and no contract of sale is created.",
      },
      {
        heading: "Prices",
        body: "All displayed prices are fictional Malaysian ringgit amounts. They do not include a real charge or tax calculation.",
      },
      {
        heading: "Content",
        body: "Coffee and brewing information is educational guidance. Recipes are starting points and results vary by water, grinder and equipment.",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    sections: [
      {
        heading: "Can I really order?",
        body: "No. The shop and checkout demonstrate a commercial experience, but no payment or fulfilment service is connected.",
      },
      {
        heading: "Can subscriptions be changed?",
        body: "The fictional terms allow pausing, changing or cancelling before renewal. The demo does not create an account or recurring charge.",
      },
      {
        heading: "Do you ship outside Malaysia?",
        body: "Not in this demonstration. The fictional shipping policy covers Malaysia only.",
      },
    ],
  },
} as const;
