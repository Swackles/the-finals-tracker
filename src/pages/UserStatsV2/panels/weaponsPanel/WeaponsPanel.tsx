import {WeaponsTableCard} from "./WeaponsTableCard";
import {useMemo, useState} from "react";
import {Filter} from "@common/components";
import Stack from "@mui/joy/Stack";
import {useGameStatsStore} from "@common/stores/gameStatsStore";
import {Archetype} from "@common/models";
import {GameLoadoutAssetType} from "@common/util";
import {observer} from "mobx-react";

export const WeaponsPanel = observer(() => {
  const { weapons } = useGameStatsStore()

  const [activeArchtypeFilters, setActiveArchtypeFilters] = useState("All")
  const [activeTypeFilters, setActiveTypeFilters] = useState("All")

  const filteredData = useMemo(() =>
      weapons.filter(data =>
      (activeArchtypeFilters === "All" || data.archetype === activeArchtypeFilters)
      && (activeTypeFilters === "All" || data.type === activeTypeFilters)
    )
  , [weapons, activeArchtypeFilters, activeTypeFilters])

  const archtypeFilters = [
    "All",
    Archetype.LIGHT,
    Archetype.MEDIUM,
    Archetype.HEAVY,
    Archetype.SHARED
  ]

  const typeFilters = [
    "All",
    GameLoadoutAssetType.WEAPON,
    GameLoadoutAssetType.GADGET
  ]

  const {disabledArchtype, disabledTypes} = useMemo(() => {
    const archetypes = weapons
      .map((data) => data.archetype)
    const types = weapons
      .map((data) => data.type)

    return {
      disabledArchtype: [...archtypeFilters.filter(x => x !== "All" && !archetypes.includes(x as any))],
      disabledTypes:  [...typeFilters.filter(x => x !== "All" && !types.includes(x as any))],
    }
  }, [weapons])


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
})
