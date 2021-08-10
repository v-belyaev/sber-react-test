import { SputnikSpeed } from "./Speed";

export type SputnikModel = {
  id: string;
  radius: number;
  speed: SputnikSpeed;
  xOffset: number;
  yOffset: number;
  rotate: number;
  isClockwise: boolean;
};
