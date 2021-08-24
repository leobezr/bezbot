import { SceneMeasurement } from "../../core/decorators/type";
import Healer from "./lib/healer";
import Chat from "./lib/chat";
import Pixel from "./lib/pixel";

export default class Tibia {
   public AutoHealer = Healer;
   public chat = Chat;
   
   public async getText(props: SceneMeasurement): Promise<string> {
      return Pixel.readText(props);
   }
}