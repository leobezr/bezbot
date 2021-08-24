import { SceneMeasurement } from "../../../core/decorators/type";
import robot, { Bitmap } from "robotjs";
import Jimp from "jimp";
import Tesseract from "tesseract.js";
import path from "path";

export default class FontReader {
  public bitmap: Bitmap | null = null;
  public image: Jimp | null = null;
  public buffer: Buffer | null = null;

  public _cache: Tesseract.Page | null = null;

  private imageMeasurement: SceneMeasurement = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(measurement: SceneMeasurement) {
    this.readText(measurement);
    this.transformSceneToBuffer();
  }

  private setMeasurement(props: SceneMeasurement) {
    this.imageMeasurement = { ...props };
  }

  private scanImage(): void {
    const image = this.image as Jimp;
    const bitmap = this.bitmap as Bitmap;
    let pos = 0;

    this.image?.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      (x, y, idx) => {
        image.bitmap.data[idx + 2] = bitmap.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = bitmap.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = bitmap.image.readUInt8(pos++);
        image.bitmap.data[idx + 3] = bitmap.image.readUInt8(pos++);
      }
    );
  }

  private scaleImage(): void {
    this.image?.scale(5);
  }

  private async transformSceneToBuffer(): Promise<void> {
    try {
      this.buffer = await new Promise((resolve, reject) => {
        const { width, height } = this.imageMeasurement;

        this.image = new Jimp(width, height);

        this.scanImage();
      });
    } catch (err) {
      throw Error(err);
    }
  }

  public async text(): Promise<string> {
    let text = "";

    this.scaleImage();
    
    try {
      await new Promise((resolve, reject) => {
         this.image?.getBuffer("image/png", async (err, buffer) => {
            const generatedData = await Tesseract.recognize(buffer, "eng");
            
            this._cache = generatedData.data;
            text = generatedData.data.text;
            resolve(text);
         });
      })

      this.generateImage("test");

      return text;
    } catch (err) {
      throw Error(err);
    }
  }

  public async generateImage(fileName: string): Promise<void> {
   this.image?.write(path.resolve(__dirname + "../trainer/", `${fileName}.png`),)
  }

  private readText(props: SceneMeasurement): void {
    const { x, y, width, height } = props;

    this.bitmap = robot.screen.capture(x, y, width, height);
    this.setMeasurement(props);
  }
}
