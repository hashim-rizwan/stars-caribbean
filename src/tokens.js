import design from "../design.json";

export const spring = {
  type: "spring",
  stiffness: design.motion.spring.stiffness,
  damping: design.motion.spring.damping,
};

export const press = {
  type: "spring",
  stiffness: design.motion.press.stiffness,
  damping: design.motion.press.damping,
};
