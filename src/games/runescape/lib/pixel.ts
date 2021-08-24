import path from "path";
import getColors from "get-image-colors";
import Chroma from "chroma-js";
import settings from "./assets/settings.json";

const options = {
  count: settings.targetGeneratePixelFrames,
  type: "image/png",
};

export default class Pixel {
  public static async monster(monsterName: string): Promise<string[]> {
    const colors = await getColors(
      path.resolve(__dirname + "/monsters", `${monsterName}.png`),
      options
    );

    return colors.map((color) => color.hex());
  }

  public static measureDistance(colorTarget: string, pixelProximity: string): number {
    return Chroma.distance(colorTarget, pixelProximity);
  }
}
