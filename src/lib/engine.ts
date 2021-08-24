import Utils from "./utils";
import settings from "../games/runescape/lib/assets/settings.json";

export default class Engine {
   public static readonly maxSafeLoopCounter = 10;
   public static loopCount: null | number = null;

   public static async run(cb: (argument?: any) => void | any): Promise<void | never> {
      return new Promise((resolve) => {
         cb.call(this);

         Utils.sleep(settings.systemDelay);

         resolve();
      })
   }

   public static safeRunLoop(cb: () => void, maxRunTime: number = this.maxSafeLoopCounter): void {
      for(let i = 0; i < maxRunTime; i++) {
         Utils.sleep(settings.systemDelay);
         cb();
      }
   }
}