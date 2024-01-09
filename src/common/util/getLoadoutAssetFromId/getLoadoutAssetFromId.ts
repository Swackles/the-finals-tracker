import {GameLoadoutAsset, GameLoadoutAssetType} from "./models"
import {Archetype} from "@common//models"

export const GAME_LOADOUT_ASSET_ID_MAP: Record<string, GameLoadoutAsset> = {
  // Light
  "757827716": {
    name: "Dagger",
    archetype: Archetype.LIGHT,
    type: GameLoadoutAssetType.WEAPON
  },
  "1599997630": {
    name: "M11",
    archetype: Archetype.LIGHT,
    type: GameLoadoutAssetType.WEAPON
  },
  "1612446258": {
    name: "SH1900",
    archetype: Archetype.LIGHT,
    type: GameLoadoutAssetType.WEAPON
  },
  "-657541680": {
    name: "SR-84",
    archetype: Archetype.LIGHT,
    type: GameLoadoutAssetType.WEAPON
  },
  "-158222801": {
    name: "V95",
    archetype: Archetype.LIGHT,
    type: GameLoadoutAssetType.WEAPON
  },
  "-322594587": {
    name: "XP-54",
    archetype: Archetype.LIGHT,
    type: GameLoadoutAssetType.WEAPON
  },
  "-1900663257": {
    name: "Throwing Knives",
    archetype: Archetype.LIGHT,
    type: GameLoadoutAssetType.WEAPON
  },

  // Medium
  "473278792": {
    name: "AKM",
    archetype: Archetype.MEDIUM,
    type: GameLoadoutAssetType.WEAPON
  },
  "1501440399": {
    name: "CL-40",
    archetype: Archetype.MEDIUM,
    type: GameLoadoutAssetType.WEAPON
  },
  "-566338044": {
    name: "FCAR",
    archetype: Archetype.MEDIUM,
    type: GameLoadoutAssetType.WEAPON
  },
  "1333183869": {
    name: "Model 1887",
    archetype: Archetype.MEDIUM,
    type: GameLoadoutAssetType.WEAPON
  },
  "-2036840549": {
    name: "R.357",
    archetype: Archetype.MEDIUM,
    type: GameLoadoutAssetType.WEAPON
  },
  "-1714487033": {
    name: "Riot Shield",
    archetype: Archetype.MEDIUM,
    type: GameLoadoutAssetType.WEAPON
  },

  "-21077747": {
    name: "Gas Mine",
    archetype: Archetype.MEDIUM,
    type: GameLoadoutAssetType.GADGET
  },

  // Heavy
  "1480845770": {
    name: "Flamethrower",
    archetype: Archetype.HEAVY,
    type: GameLoadoutAssetType.WEAPON
  },
  "1743942098": {
    name: "Lewis gun",
    archetype: Archetype.HEAVY,
    type: GameLoadoutAssetType.WEAPON
  },
  "1088429850": {
    name: "M32GL",
    archetype: Archetype.HEAVY,
    type: GameLoadoutAssetType.WEAPON
  },
  "-212966229": {
    name: "M60",
    archetype: Archetype.HEAVY,
    type: GameLoadoutAssetType.WEAPON
  },
  "-160507163": {
    name: "SA1216",
    archetype: Archetype.HEAVY,
    type: GameLoadoutAssetType.WEAPON
  },
  "-211705009": {
    name: "Sledgehammer",
    archetype: Archetype.HEAVY,
    type: GameLoadoutAssetType.WEAPON
  },

  "-455578974": {
    name: "C4",
    archetype: Archetype.HEAVY,
    type: GameLoadoutAssetType.GADGET
  },
  "1042541498": {
    name: "RPG-7",
    archetype: Archetype.HEAVY,
    type: GameLoadoutAssetType.GADGET
  },

  // Shared
  "207168914": {
    name: "Gas grenade",
    archetype: Archetype.SHARED,
    type: GameLoadoutAssetType.GADGET
  },
  "1886362451": {
    name: "Pyro grenade",
    archetype: Archetype.SHARED,
    type: GameLoadoutAssetType.GADGET
  }, // Maybe turret or C4
  "1082327915": {
    name: "Frag Grenade",
    archetype: Archetype.SHARED,
    type: GameLoadoutAssetType.GADGET
  },

  "-351094439": {
    name: "Explosive Mine",
    archetype: Archetype.SHARED,
    type: GameLoadoutAssetType.GADGET
  }
}

export const getLoadoutAssetFromId = (id: string): GameLoadoutAsset => {
  const asset = GAME_LOADOUT_ASSET_ID_MAP[id]

  return asset ? asset : {
    name: id,
    archetype: Archetype.UNKNOWN,
    type: "unknonw"
  }
}
