const sizePattern = /^(sm|small|lg|large)\s+/i;

function splitName(name) {
  const match = name.trim().match(sizePattern);
  if (!match) return { size: "", dish: name.trim() };
  const token = match[1].toLowerCase();
  return {
    size: token === "sm" || token === "small" ? "Small" : "Large",
    dish: name.trim().slice(match[0].length),
  };
}

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\bpeas\b/g, "pea")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function stem(key) {
  return key.endsWith("s") ? key.slice(0, -1) : key;
}

function showTitle(dish) {
  if (dish !== dish.toLowerCase()) return dish;
  return dish.charAt(0).toUpperCase() + dish.slice(1);
}

function money(amount) {
  return `$${amount.toFixed(2)}`;
}

function groupItems(items) {
  const groups = new Map();
  for (const item of items) {
    const { size, dish } = splitName(item.name);
    const key = stem(normalize(dish));
    if (!groups.has(key)) groups.set(key, { key, dish, options: [] });
    groups.get(key).options.push({ ...item, size, dish });
  }

  return [...groups.values()].map((group) => {
    const options = group.options.map((option) => {
      const twins = group.options.filter((item) => item.size && item.size === option.size);
      return {
        label: !option.size || twins.length > 1 ? option.name : option.size,
        name: option.name,
        price: option.price,
        href: option.href,
        description: option.description,
        image: option.image,
      };
    });
    const amounts = options.map((option) => Number(option.price.replace(/[^0-9.]/g, "")));
    const low = Math.min(...amounts);
    const high = Math.max(...amounts);
    const lead = options.find((option) => option.label === "Large") ?? options[0];
    return {
      key: group.key,
      title: showTitle(group.dish),
      price: low === high ? money(low) : `${money(low)} – ${money(high)}`,
      image: lead.image,
      options,
    };
  });
}

export function sectionsFrom(menu) {
  return menu.map((section) => ({
    title: section.title,
    short: section.title.replace(" Dishes", ""),
    dishes: groupItems(section.items),
  }));
}
