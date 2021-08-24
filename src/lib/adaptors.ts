import { Adaptor, SelectItem } from "../core/decorators/type";

export default class Adaptors {
  public static jsonListToSelectValue(
    jsonList: Adaptor<unknown>
  ): SelectItem[] {
    return Object.values(jsonList).reduce((list: SelectItem[], item) => {
      return [...list, item] as SelectItem[]
   }, []);
  }
}
