import {Archetype, GamePerArchetype} from "@common/models";

export const mapArchetype = (key: keyof GamePerArchetype): Archetype => {
  switch (key) {
    case "DA_Archetype_Small":
      return Archetype.LIGHT
    case "DA_Archetype_Medium":
      return Archetype.MEDIUM
    case "DA_Archetype_Heavy":
      return Archetype.HEAVY
    default:
      return Archetype.UNKNOWN
  }
}
