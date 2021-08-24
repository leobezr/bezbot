import Bot from "./bot";
import Interface from "./games/tibia/settings/interface.json"
// import Utils from "./lib/utils";
// import robot, { Bitmap } from "robotjs";
// import Jimp from "jimp";
// import fs from "fs";

// import Tesseract from "tesseract.js";

const app = async () => {
  // const runescape = new Bot.RuneScape();

  // let maxCount = 25;
  // let count = 0;

  // while(count < maxCount) {
  //   count++;
  //   runescape.killCreature("rabbit");
  // }

  const Tibia = new Bot.Tibia();
  const text = await Tibia.getText(Interface.battle.cropPosition);

  console.log(`result: ${text}`);

  // const healer = new Tibia.AutoHealer({
  //   profile: {
  //     profileLowHp: {
  //       spellKey: "f2",
  //       potionKey: "f1",
  //       lowerThen: 30,
  //       manaNeeded: 0
  //     },
  //     profileHighHp: {
  //       spellKey: "f2",
  //       potionKey: false,
  //       lowerThen: 80,
  //       manaNeeded: 0
  //     }
  //   }
  // });

  // healer.on();

  // const scene = robot.screen.capture(1650, 425, 113, 13);
  // // console.log(scene.image)

  // function screenCaptureToFile2(
  //   robotScreenPic: Bitmap,
  //   path = "generatedFile.png"
  // ) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
  //       let pos = 0;
  //       image.scan(
  //         0,
  //         0,
  //         image.bitmap.width,
  //         image.bitmap.height,
  //         (x, y, idx) => {
  //           image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
  //           image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
  //           image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
  //           image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
  //         }
  //       );

  //       image.scale(5)

  //       image.getBuffer("image/png", (err, buffer) => {
  //         Tesseract.recognize(
  //           buffer,
  //           // path.resolve(__dirname + "/games/tibia/trainer", `connection-lost.png`),
  //           "eng",
  //           {
  //             logger: (m) => console.log(m),
  //           }
  //         ).then(({ data: { text } }) => {
  //           console.log(text);
  //         });
  //       })


  //       image.write(path, resolve);
  //     } catch (e) {
  //       console.error(e);
  //       reject(e);
  //     }
  //   });
  // }

  // screenCaptureToFile2(scene);
};

app();
