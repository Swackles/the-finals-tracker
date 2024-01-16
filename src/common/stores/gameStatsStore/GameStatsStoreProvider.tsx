import React, {useContext, useState} from "react";
import {GameStatsStore} from "./GameStatsStore";
import {observer} from "mobx-react";

const GameStatsStoreContext = React.createContext<GameStatsStore>({
} as GameStatsStore)

export const useGameStatsStore = () => useContext(GameStatsStoreContext)

export interface GameStatsProviderProps {
  homeView: () => JSX.Element,
  statsView: () => JSX.Element
}

export const GameStatsProvider = observer(({ homeView: HomeView, statsView: StatsView }: GameStatsProviderProps) => {
  const [store] = useState(GameStatsStore.new)

  return (
    <GameStatsStoreContext.Provider value={store}>
      {store.isJsonPresent ? <StatsView /> : <HomeView />}
    </GameStatsStoreContext.Provider>
  )
})
