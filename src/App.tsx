import './App.css';
import {UserStats} from "./pages";
import {Box, Container} from "@mui/material";

function App() {
  return (
    <Container maxWidth="lg" className="App">
      <Box>
        <UserStats />
      </Box>
    </Container>
  );
}

export default App;
