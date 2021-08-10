import { random } from "lodash";
import { v4 } from "uuid";

import { SputnikModel } from "src/types/SputnikModel";
import { SputnikSpeed } from "src/types/Speed";

export const sputnikModelBuilder = (count: number = 4): SputnikModel[] => {
  let array: SputnikModel[] = [];

  for (let i = 0; i < count; i++) {
    array.push({
      id: v4(),
      speed: random(7, 10) as SputnikSpeed,
      radius: random(240, 360),
      xOffset: random(0, 50),
      yOffset: random(0, 50),
      rotate: random(0, 360),
      isClockwise: Boolean(random(0, 1)),
    });
  }

  return array;
};
