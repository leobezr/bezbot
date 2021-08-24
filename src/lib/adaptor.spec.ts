import Adaptor from "./adaptors";
import Spells from "../games/tibia/settings/spells.json";

describe("Testing adaptor", () => {
   it("Creates a list for select", () => {
      expect(Adaptor.jsonListToSelectValue(Spells.knights.attack)).toEqual(expect.arrayContaining([
         {
            "cooldown": 30000,
            "groupCooldown": 4000,
            "mana": 300,
            "spellWord": "exori gran ico",
            "key": "annihilation",
            "name": "Annihilation"
         }
      ]))
   })
})