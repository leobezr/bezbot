import { SceneMeasurement } from "../../../core/decorators/type";
import Chroma from "chroma-js";
import FontReader from "./font-reader";

export default class Pixel {
  public static measureDistance(
    colorTarget: string,
    pixelProximity: string
  ): number {
    return Chroma.distance(colorTarget, pixelProximity);
  }

  public static async readText(props: SceneMeasurement): Promise<string> {
    return (new FontReader(props)).text();
  }
}
