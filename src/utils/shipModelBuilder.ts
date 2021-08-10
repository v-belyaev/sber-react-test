import { random } from "lodash";
import { ShipSpeed } from "src/types/Speed";

export const shipModelBuilder = (): ShipSpeed => {
  return random(4, 6) as ShipSpeed;
};
