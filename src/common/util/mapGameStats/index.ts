import {GameStatsJson, GameStats} from "./models";
import {mapGameStatsV1} from "./mapGameStatsV1";

export * from "./models"

export const mapGameStats = (json: GameStatsJson): GameStats => {
  switch (json.version) {
    case 1:
      return mapGameStatsV1(json)
    default:
      throw new Error("Unknown JSON version")
  }
}
