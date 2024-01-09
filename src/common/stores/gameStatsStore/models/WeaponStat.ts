import {GameLoadoutAsset} from "@common/util";

export interface WeaponStat extends GameLoadoutAsset {
  damage: number,
  kills: number
}
