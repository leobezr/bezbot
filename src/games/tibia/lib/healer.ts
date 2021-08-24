import Interface from "../settings/interface.json";
import Pixel from "./pixel";
import robot from "robotjs";
import Delay from "../settings/delays.json";
import Utils from "../../../lib/utils";

import {
  HealthConstructor,
  HealthProfileBundle,
  HealOptions,
} from "../../../core/decorators/type";

export default class Healer {
  constructor(prop: HealthConstructor) {
    this.setHealthProfile(prop.profile);
    this.on();
    this.watchHealth();
  }

  private healerActive = false;
  private cooldown = 0;

  private profileLowHp: HealOptions = {
    spellKey: false,
    potionKey: false,
    lowerThen: 0,
    manaNeeded: 0,
  };

  private profileHighHp: HealOptions = {
    spellKey: false,
    potionKey: false,
    lowerThen: 0,
    manaNeeded: 0,
  };

  public setHealthProfile(prop: HealthProfileBundle) {
    this.profileLowHp.spellKey = prop.profileLowHp?.spellKey;
    this.profileLowHp.potionKey = prop.profileLowHp?.potionKey;
    this.profileLowHp.lowerThen = (prop.profileLowHp as HealOptions).lowerThen;

    this.profileHighHp.spellKey = prop.profileHighHp?.spellKey;
    this.profileHighHp.potionKey = prop.profileHighHp?.potionKey;
    this.profileHighHp.lowerThen = (
      prop.profileHighHp as HealOptions
    ).lowerThen;
  }

  private get healthPercent(): number {
    const posX = Interface.lifeBar.health.x;
    const posY = Interface.lifeBar.health.y;
    const barWidth = Interface.lifeBar.health.width;

    const scene = robot.screen.capture(posX, posY, barWidth, 1);
    console.log(scene);

    let barDistance = 0;

    for (let x = scene.width - 1; x > 0; x--) {
      if (barDistance) {
        break;
      }

      for (const color of Interface.lifeBar.health.bar) {
        const colorDistance = Pixel.measureDistance(scene.colorAt(x, 0), color);

        if (colorDistance < 10) {
          barDistance = Utils.percentOf(x, barWidth);
          break;
        }
      }
    }

    return barDistance;
  }

  private get manaPercent(): number {
    return 100;
  }

  private heal(profile: HealOptions) {
    if (Utils.cooldown(this.cooldown)) {
      if (profile.potionKey) {
        robot.keyTap(profile.potionKey);
        Utils.sleep(Delay.humanize);
      }
      if (profile.spellKey && this.manaPercent > profile.manaNeeded) {
        robot.keyTap(profile.spellKey);
      }

      this.cooldown = Date.now() + Delay.healSpeed;
    }
  }

  private watchHealth(): void {
    if (this.healerActive) {
      const percent = this.healthPercent;

      if (percent <= this.profileHighHp.lowerThen) {
        this.heal(this.profileHighHp);
      } else if (percent <= this.profileLowHp.lowerThen) {
        this.heal(this.profileLowHp);
      }
    }
    Utils.sleep(Delay.healSpeed + Delay.healSpeed / 3);
    return this.watchHealth();
  }

  public on(): void {
    this.healerActive = true;
  }
  public off(): void {
    this.healerActive = false;
  }
}
