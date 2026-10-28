const google =
  "https://www.google.com/maps/search/?api=1&query=Star%27s+Caribbean+Restaurant+1901+Blanding+Blvd+Jacksonville+FL+32210";
const yelp = "https://www.yelp.com/biz/stars-caribbean-restaurant-jacksonville";

export const reviewPlaces = [
  { name: "Google", score: "4.3", href: google },
  { name: "Yelp", score: "3.7", detail: "145 reviews", href: yelp },
];

export const reviews = [
  {
    name: "Chris Kick",
    when: "May 5, 2018",
    source: "Google",
    line: "Stars Caribbean is truly a hidden gem.",
    href: google,
  },
  {
    name: "L. Monique Starling",
    when: "May 22, 2018",
    source: "Google",
    line: "The food was amazing, friendly staff, and very clean establishment.",
    href: google,
  },
  {
    name: "Tavarez Richardson",
    when: "January 26, 2018",
    source: "Google",
    line: "Brown stew chicken or beef, and the oxtails.",
    href: google,
  },
  {
    name: "Scott Jai",
    when: "April 29, 2018",
    source: "Google",
    line: "The food here is good, but you take your chances.",
    href: google,
  },
];
