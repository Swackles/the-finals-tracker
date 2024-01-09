import {Sidebar} from "./components/sidebar";
import Box from "@mui/joy/Box";
import {WeaponsPanel} from "./panels/weaponsPanel/WeaponsPanel";
import {MatchHistoryPanel} from "./panels/matchHistoryPanel/MatchHistoryPanel";
import {OverviewPanel} from "./panels/overviewPanel/OverviewPanel";
import {Filter} from "@common/components";
import {useState} from "react";
import {useGameStatsStore} from "@common/stores/gameStatsStore";
import {GameMode} from "@common/models";

export const UserStatsV2 = () => {
  const gameStatsStore = useGameStatsStore()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
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
                {activeTab !== "match-history" && <Filter values={[GameMode.TOTAL, GameMode.CASUAL, GameMode.RANKED]}
                                                                defaultValue={gameStatsStore.gameMode}
                                                                onChange={x => gameStatsStore.setGameMode(x as GameMode)}/>}
                {activeTab === "overview" && <OverviewPanel /> }
                {activeTab === "weapons" && <WeaponsPanel />}
                {activeTab === "match-history" && <MatchHistoryPanel />}
            </Box>
        </Box>
    </Box>
  )
}
