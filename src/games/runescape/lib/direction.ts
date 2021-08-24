import robot from "robotjs";
import config from "./assets/coordinates.json";
import settings from "./assets/settings.json";
import Engine from "../../../lib/engine";
import Utils from "../../../lib/utils";

export default class Direction {
   public static loop = null;

   public static readonly keyBindings = {
      rotate: "d",
      axisUp: "w",
      axisDown: "s",
      zoomIn: "pageup",
      zoomOut: "pagedown"
   }

   public static async resetMapSettings(): Promise<void> {
      await Engine.run(() => {
         const { resetMap } = config.map;
   
         robot.moveMouse(resetMap.x, resetMap.y);
         robot.mouseClick();
      })
   }

   public static rotateCamera(): void {
      robot.keyTap(this.keyBindings.rotate);
   }

   public static async turnNorth(): Promise<void> {
      await Engine.run(() => this.resetMapSettings());
   }

   public static async turnSouth(): Promise<void> {
      await Engine.run(() => {
         const { resetMap } = config.map;
   
         robot.moveMouse(resetMap.x, resetMap.y);
         robot.mouseClick("right");

         Utils.sleep(settings.systemDelay);

         robot.moveMouse(1591, 115);
         Utils.sleep(settings.systemDelay);
         robot.mouseClick()
      })
   }

   private static async cameraZoomIn(): Promise<void> {
      robot.setKeyboardDelay(.005);

      await Engine.run(async () => {
         robot.moveMouse(config.map.safeClick.x, config.map.safeClick.y);
         robot.mouseClick();

         for(let i = 0; i < 12; i++) {
            robot.keyTap(this.keyBindings.zoomIn);
         }

         robot.keyTap(this.keyBindings.zoomOut);
         robot.setKeyboardDelay(10);
      })
   }

   public static async cameraTopView(): Promise<void> {
      robot.setKeyboardDelay(.005);

      await this.cameraZoomIn();
      await Engine.run(async () => {
         for(let i = 0; i < 12; i++) {
            robot.keyTap(this.keyBindings.axisUp);
         }
         robot.setKeyboardDelay(10);
      })
   }
}