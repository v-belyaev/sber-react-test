export const checkCollision = (
  forElem: SVGSVGElement,
  withElem: SVGSVGElement
): boolean => {
  const rect1 = forElem.getBoundingClientRect();
  const rect2 = withElem.getBoundingClientRect();

  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  ) {
    return true;
  }
  return false;
};
