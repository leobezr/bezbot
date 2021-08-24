import Utils from "./utils";

describe("Testing utils methods", () => {
   it("Percent reverse should return 100", () => {
      expect(Utils.percentOf(0, 95)).toEqual(0);
   })

   it("Removes CSS HEX and returns hex numbers", () => {
      expect(Utils.hexToNumber("#99c448")).toEqual("99c448");
   })
})