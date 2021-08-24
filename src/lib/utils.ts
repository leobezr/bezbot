export default class Utils {
  public static percentOf(percent: number, maxVal: number): number {
    return Math.ceil(percent / maxVal * 100);
  }

  public static sleep(ms: number): void {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  }

  public static hexToNumber(hex: string): string {
    return hex.replace(/[#]/g, "");
  }

  public static randomize(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
  }

  public static cooldown(date: number): boolean {
    return Date.now() > date;
  }
}
