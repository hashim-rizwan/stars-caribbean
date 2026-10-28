const shop = "https://starscaribbeanrestaurant.com/";

function orderItem(categoryId, itemId) {
  return `${shop}?category-id=${categoryId}&item-id=${itemId}`;
}

export const plates = [
  {
    id: "combo",
    src: "/photos/menu/1000840514.jpg",
    width: 800,
    height: 800,
    alt: "Beef combo plate with oxtails, curry, ribs, rice and peas, cabbage, dumplings, and banana.",
    title: "Beef Combos",
    caption: "Oxtails, curry goat, pork, ribs, or stew beef, with rice, dumplings, banana, and cabbage.",
    price: "$27.00",
    href: orderItem("1000110873", "1000840514"),
  },
  {
    id: "oxtails",
    src: "/photos/menu/1000840511.jpg",
    width: 800,
    height: 800,
    alt: "Oxtails in brown gravy with rice and cabbage.",
    title: "Large Oxtails",
    caption: "Brown stew oxtail with rice and cabbage.",
    price: "$26.88",
    href: orderItem("1000110873", "1000840511"),
  },
  {
    id: "jerk",
    src: "/photos/menu/1000840544.jpg",
    width: 800,
    height: 800,
    alt: "Jerk chicken pieces on a wooden plate.",
    title: "sm jerk chicken",
    caption: "Jerk chicken, large or regular, with a side.",
    price: "$16.97",
    href: orderItem("1000110873", "1000840544"),
  },
  {
    id: "goat",
    src: "/photos/menu/1000840550.jpg",
    width: 800,
    height: 800,
    alt: "Curry goat with rice and peas, plantain, lettuce, and tomato.",
    title: "Large Curry Goat",
    caption: "Curry goat with rice and peas, fried plantain, lettuce, and tomato.",
    price: "$26.88",
    href: orderItem("1000110873", "1000840550"),
  },
  {
    id: "snapper",
    src: "/photos/menu/1000840638.jpg",
    width: 800,
    height: 800,
    alt: "Whole fried red snapper.",
    title: "Red Snapper",
    caption: "Curried, fried, brown stew, or jerk. Allow an extra 20–30 minutes.",
    price: "$26.00",
    href: orderItem("1000110877", "1000840638"),
  },
  {
    id: "wings",
    src: "/photos/menu/1000840562.jpg",
    width: 800,
    height: 800,
    alt: "Jerk wings with white rice and cabbage slaw.",
    title: "lg jerk wings",
    caption: "A large order of jerk wings.",
    price: "$18.81",
    href: orderItem("1000110873", "1000840562"),
  },
];
