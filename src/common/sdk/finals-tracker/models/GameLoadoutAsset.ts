export enum GameLoadoutAssetType {
  WEAPON = "Weapon",
  GADGET = "Gadget"
}

export enum GameLoadoutAssetArchetype {
  SHARED = "Shared",
  LIGHT = "Light",
  MEDIUM = "Medium",
  HEAVY = "Heavy"
}

export interface GameLoadoutAsset {
  name: string
  archetype: GameLoadoutAssetArchetype | "unknown"
  type: GameLoadoutAssetType | "unknown"
  damage: number
  kills: number
}
