import {RoundType} from "@common/models";

export interface WinRates {
  type: RoundType,
  total: number,
  light: number,
  medium: number,
  heavy: number
}
