import {ExporterJson} from "./models";

export const JsonParser = (input: ExporterJson) => {
  switch (input.version) {
    case 1:
      return {
        roundStats: input["v1-discovery-roundstats"],
        roundStatsSummary: input["v1-discovery-roundstatsummary"],
        profile: input["v1-shared-profile"]
      }
  default:
    throw new Error(`Unknown file version "${input.version}"`)
  }
}
