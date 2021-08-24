import settings from "./assets/settings.json";
import config from "./assets/coordinates.json";
import Pixel from "./pixel";
import Utils from "../../../lib/utils";
import robot from "robotjs";

export default class Field {
  public static async attackMonster(monsterName: string): Promise<void> {
    const target = await Pixel.monster(monsterName);

    if (target) {
      const map = robot.screen.capture(
        config.field.x,
        config.field.y,
        config.field.width,
        config.field.height
      );

      for (let i = 0; i < 500; i++) {
        const x = Utils.randomize(0, map.width);
        const y = Utils.randomize(0, map.height);

        target.forEach(color => {
          if (Pixel.measureDistance(color, map.colorAt(x, y)) <= settings.colorProximityRange) {
            
            robot.moveMouse(x + config.field.x, y + config.field.y);
            
            if (this.confirmTarget(x + config.field.x, y + config.field.y)) {
              console.log(`Found rabbit x:${x} y:${y}, with value: ${Pixel.measureDistance(color, map.colorAt(x, y))}`);
              robot.mouseClick();
            }
          }
        })
      }
    }
  }

  private static confirmTarget(posX: number, posY: number): boolean {
    const { width, height } = settings.targetCropContainer;
    const scene = robot.screen.capture(posX, posY, width, height);

    let isTarget = false;

    for(let x = 0; x < scene.width; x++) {
      if (isTarget) {
        break;
      }

      for(let y = 0; y < scene.height; y++) {
        if (isTarget) {
          break;
        }

        isTarget = settings.targetCropContainerColorAssert.includes(scene.colorAt(x, y));
      }
    }
    return isTarget;
  }
}
