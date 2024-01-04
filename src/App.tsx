import './App.css';
import {UserStatsV2} from "./pages/UserStatsV2";
import {HomePage} from "./pages/homePage/HomePage";
import {AuthProvider} from "@common/stores/AuthProvider";

function App() {
  return <AuthProvider authenticatedView={UserStatsV2}
                       unauthenticatedView={HomePage} />
}

export default App;
