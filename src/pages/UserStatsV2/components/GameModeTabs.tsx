import {Tab, tabClasses, TabList, Tabs} from "@mui/joy";
import {GameMode} from "@common/sdk/finals-tracker";

export interface GameModeTabsProps {
    gameMode: GameMode,
    onGameModeChange: (gameMode: GameMode) => void
}

export const GameModeTabs = ({ gameMode, onGameModeChange }: GameModeTabsProps) => {
    return (
        <Tabs
            aria-label="tabs"
            defaultValue={gameMode}
            sx={{ bgcolor: 'transparent', width: "100%" }}
            onChange={(_, value) => onGameModeChange(value as any)}>
            <TabList
                disableUnderline
                sx={{
                    p: 0.5,
                    gap: 0.5,
                    borderRadius: 'xl',
                    bgcolor: 'background.level1',
                    [`& .${tabClasses.root}[aria-selected="true"]`]: {
                        boxShadow: 'sm',
                        bgcolor: 'background.surface',
                    },
                }}
            >
                <Tab disableIndicator value="total">Total</Tab>
                <Tab disableIndicator value="casual">Casual</Tab>
                <Tab disableIndicator value="ranked">Ranked</Tab>
            </TabList>
        </Tabs>
    )
}