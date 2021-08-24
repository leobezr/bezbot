import robot from "robotjs";
import delays from "../settings/delays.json";
import Utils from "../../../lib/utils";

export default class Chat {
   private static setDelay(delaySpeed: number): void {
      robot.setKeyboardDelay(delaySpeed);
   }

   public static type(text: string): void {
      this.setDelay(delays.keyboard);

      robot.keyTap("enter");
      robot.typeString(text);

      Utils.sleep(100);
      robot.keyTap("enter");
   }
}