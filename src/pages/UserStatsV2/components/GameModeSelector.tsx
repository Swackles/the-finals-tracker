import {Tab, TabList, Tabs} from "@mui/joy";
import {GameMode} from "@common/sdk/finals-tracker";

export interface GameModeSelectorProps {
    onChange: (gameMode: GameMode) => void
    gameMode: GameMode
}

export const GameModeSelector = ({gameMode, onChange}: GameModeSelectorProps) => {
    return (
        <Tabs
            defaultValue={gameMode}
            sx={{ bgcolor: 'transparent' }}
            orientation="horizontal"
            size="md"
            onChange={(_ , val) => onChange(val as GameMode)}
        >
            <TabList disableUnderline>
                <Tab value="total" variant="plain" color="primary" indicatorInset>Total</Tab>
                <Tab value="casual" variant="plain" color="primary" indicatorInset>Casual</Tab>
                <Tab value="ranked" variant="plain" color="primary" indicatorInset>Ranked</Tab>
            </TabList>
        </Tabs>
    )
}