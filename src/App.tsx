import './App.css';
import {UserStatsV2} from "./pages/UserStatsV2";
import {HomePage} from "./pages/homePage/HomePage";
import {GameStatsProvider} from "@common/stores/gameStatsStore";

function App() {
  return <GameStatsProvider statsView={UserStatsV2}
                            homeView={HomePage} />
}

export default App;
