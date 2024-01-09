import {Archetype} from "@common/models";

export enum GameLoadoutAssetType {
  WEAPON = "Weapon",
  GADGET = "Gadget"
}

export interface GameLoadoutAsset {
  name: string
  archetype: Archetype
  type: GameLoadoutAssetType | "unknonw"
}
