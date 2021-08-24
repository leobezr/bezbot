import { MapDirection } from "../../core/decorators/type";
import Direction from "./lib/direction";
import Mapper from "./lib/mapper";

export default class Runescape {
  public async fixCamera(direction: MapDirection = "N"): Promise<void> {
    switch (direction) {
      case "S":
        await Direction.turnSouth();
        break;
      case "N":
      default:
        await Direction.turnNorth();
        break;
    }
    await Direction.cameraTopView();
  }

  public async killCreature(creatureName: string) {
    Mapper.field.attackMonster(creatureName);
  }
}
