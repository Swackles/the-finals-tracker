import {UserStatsV2Store} from "./UserStatsV2Store";
import {useStore} from "@common/stores";
import {observer} from "mobx-react";
import {Sidebar} from "./components/sidebar";
import Box from "@mui/joy/Box";
import {WeaponsPanel} from "./panels/weaponsPanel/WeaponsPanel";
import {MatchHistoryPanel} from "./panels/matchHistoryPanel/MatchHistoryPanel";
import {OverviewPanel} from "./panels/overviewPanel/OverviewPanel";
import {Filter} from "@common/components";
import {GameMode} from "@common/sdk/finals-tracker";
import {useAuthStore} from "@common/stores/AuthProvider";
import {useEffect} from "react";

export const UserStatsV2 = observer(() => {
  const { json, authMethod } = useAuthStore()
  const store = useStore(UserStatsV2Store.new)

  useEffect(() => {
    store.fetchData(json)
  }, [])

  if (store.isLoading || store.isErrored) return <></>

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar activeTab={store.activeTab} setActiveTab={store.setActiveTab} />
        <Box
            sx={{
                px: { xs: 2, md: 6 },
                pt: {
                    xs: 'calc(12px + var(--Header-height))',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                gap: 1,
                marginBottom: 5
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: 1 }}>
                {store.activeTab !== "match-history" && <Filter values={[GameMode.TOTAL, GameMode.CASUAL, GameMode.RANKED]}
                                                                defaultValue={store.gameMode}
                                                                onChange={x => store.setGameMode(x as GameMode)}/>}
                {store.activeTab === "overview" && <OverviewPanel
                    data={store.statsSummary}
                    classesTableData={store.getClassesTableRows}
                    timePlayed={store.getTimePlayed}/> }
                {store.activeTab === "weapons" && <WeaponsPanel weaponTableData={store.weaponTableRows} />}
                {store.activeTab === "match-history" && <MatchHistoryPanel tournaments={store.tournaments} />}
            </Box>
        </Box>
    </Box>
  )
})
