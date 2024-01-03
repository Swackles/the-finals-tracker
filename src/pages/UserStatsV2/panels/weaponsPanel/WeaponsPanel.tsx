import {WeaponsTableCard} from "./WeaponsTableCard";
import {GameLoadoutAsset, GameLoadoutAssetArchetype, GameLoadoutAssetType} from "@common/sdk/finals-tracker";
import {useMemo, useState} from "react";
import {Filter} from "@common/components";
import Stack from "@mui/joy/Stack";

export interface WeaponsPanelProps {
  weaponTableData: GameLoadoutAsset[]
}

export const WeaponsPanel = ({ weaponTableData }: WeaponsPanelProps) => {
  const [activeArchtypeFilters, setActiveArchtypeFilters] = useState("All")
  const [activeTypeFilters, setActiveTypeFilters] = useState("All")

  const filteredData = useMemo(() =>
    weaponTableData.filter(data =>
      (activeArchtypeFilters === "All" || data.archetype === activeArchtypeFilters)
      && (activeTypeFilters === "All" || data.type === activeTypeFilters)
    )
  , [weaponTableData, activeArchtypeFilters, activeTypeFilters])

  const archtypeFilters = [
    "All",
    GameLoadoutAssetArchetype.LIGHT,
    GameLoadoutAssetArchetype.MEDIUM,
    GameLoadoutAssetArchetype.HEAVY,
    GameLoadoutAssetArchetype.SHARED
  ]

  const typeFilters = [
    "All",
    GameLoadoutAssetType.WEAPON,
    GameLoadoutAssetType.GADGET
  ]

  const {disabledArchtype, disabledTypes} = useMemo(() => {
    const archetypes = weaponTableData
      .map((data) => data.archetype)
    const types = weaponTableData
      .map((data) => data.type)

    return {
      disabledArchtype: [...archtypeFilters.filter(x => x !== "All" && !archetypes.includes(x as any))],
      disabledTypes:  [...typeFilters.filter(x => x !== "All" && !types.includes(x as any))],
    }
  }, [weaponTableData])


    return (
      <>
        <Stack direction="row"
               justifyContent="flex-start"
               alignItems="center"
               spacing={2}
               useFlexGap
               flexWrap="wrap">
          <Filter defaultValue={"All"}
                  disableValues={disabledArchtype}
                  onChange={setActiveArchtypeFilters}
                  values={archtypeFilters} />
          <Filter defaultValue={"All"}
                  disableValues={disabledTypes}
                  onChange={setActiveTypeFilters}
                  values={typeFilters} />
        </Stack>
        <WeaponsTableCard data={filteredData} />
      </>
    )
}
