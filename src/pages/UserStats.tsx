import {UserStatsStore} from "./UserStatsStore";
import {useStore} from "@common/stores";
import {Grid, Tab, tabClasses, TabList, Tabs} from "@mui/joy";
import {observer} from "mobx-react";
import {StatsSummaryCard, TournamentCard} from "./cards";
import {useEffect} from "react";

export interface UserStatsProps {
  isMocked: boolean
}

export const UserStats = observer(({ isMocked }: UserStatsProps) => {
  const store = useStore(UserStatsStore.new)

  useEffect(() => {
    store.fetchData(isMocked)
  }, [store, isMocked])

  if (store.isLoading) return <></>

  return (
    <Grid container spacing={4}>
      <Grid xs={12}>
        <Tabs
          aria-label="tabs"
          defaultValue={store.gameType}
          sx={{ bgcolor: 'transparent' }}
          onChange={(_, value) => store.setGameType(value as any)}>
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
      </Grid>
      <Grid container xs={12} sm={6} md={7} lg={10}>
        <StatsSummaryCard
          data={store.statsSummary}
          weaponTableData={store.weaponTableRows}
          classesTableData={store.getClassesTableRows}
          timePlayed={store.getTimePlayed}/>
      </Grid>
      <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12} sm={6} md={5} lg={2}
            spacing={2}>
        {store.tournaments.map(tournament => (
          <TournamentCard data={tournament} />
        ))}
      </Grid>
    </Grid>
  )
})