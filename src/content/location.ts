export const location = {
  name: "ALDER Roastery & Tasting Room",
  address: ["17 Jalan 13/6", "Seksyen 13", "46200 Petaling Jaya, Selangor", "Malaysia"],
  coordinates: { latitude: 3.1087, longitude: 101.6352 },
  hours: [
    { days: "Monday–Friday", times: "8:00am–5:00pm" },
    { days: "Saturday–Sunday", times: "9:00am–5:00pm" },
  ],
  contact: { email: "hello@example.alderroasters.test", phone: "+60 3-0000 2018" },
  accessibility:
    "Step-free entrance and tasting-room seating are available. An accessible toilet is located on the ground floor. Please contact us for specific access questions.",
  amenities: ["Tasting bar", "Coffee collection", "Wi-Fi", "Bicycle stands", "Filtered water"],
  transit: "About 12 minutes on foot from Asia Jaya LRT; the final stretch has uneven pavements.",
  parking:
    "Limited shared parking is available in front of the workshop. Weekday spaces fill quickly.",
  mapUrl: "https://www.openstreetmap.org/?mlat=3.1087&mlon=101.6352#map=17/3.1087/101.6352",
  disclosure:
    "ALDER and this location are fictional; the coordinates are for presentation only and should not be used for a visit.",
} as const;
