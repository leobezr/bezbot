/** Runescape */

/** Directions */
export type MapDirection = "N" | "W" | "S" | "E";

/** Core */
export interface Position {
  x: number;
  y: number;
}

/** Color */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/** Tibia */

/** Core */
export type Adaptor<T> = Record<string, T>;

export interface SelectItem {
  text: string;
  value: string;
}

/** Spells */
export interface TibiaSpells {
  cooldown: number;
  groupCooldown: number;
  mana: number;
  spellWord: string;
  key: string;
}

export interface HealOptions {
   spellKey?: string | false;
   potionKey?: string | false;
   lowerThen: number;
   manaNeeded: number;
}
export interface HealthProfileBundle {
   profileLowHp?: HealOptions;
   profileHighHp?: HealOptions;
}

export interface HealthConstructor {
   profile: HealthProfileBundle;
}

/** Scene */
export interface SceneMeasurement {
  x: number;
  y: number;
  width: number;
  height: number;
}
