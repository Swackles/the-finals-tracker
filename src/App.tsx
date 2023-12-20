import './App.css';
import {UserStats} from "./pages";
import {Box, Container} from "@mui/material";
import {Button, Input, Stack} from "@mui/joy";
import {API} from "@common/sdk";
import {useEffect, useState} from "react";
import {getAuthenticationToken, saveAuthenticationToken} from "@common/util";

function App() {
  const [auth, setAuth] = useState(!!getAuthenticationToken())
  const [isMocked, setIsMocked] = useState(false)

  useEffect(() => {
    const resInterceptor = API.interceptors.response.use(
      res => res,
      (err) => {
        if (err.response.status.status === 401) {
          setAuth(false)
          saveAuthenticationToken()
        }
    })

    return () => API.interceptors.response.eject(resInterceptor);
  }, [setAuth])

  return (
    <>
      <Box style={{ backgroundColor: "#d31f3c", height: "20em" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1} sx={{ height: "100%" }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={1} sx={{ height: "100%" }}>
          <Input placeholder="API token" size="lg" onChange={e => {
            API.defaults.headers.Authorization = `Bearer ${e.target.value}`
            saveAuthenticationToken(e.target.value)
            setAuth(true)
          }} />
          <Button onClick={() => setIsMocked(x => !x)}>{isMocked ? "Use live data" : "Use mocked data"}</Button>
          </Stack>
        </Stack>
      </Box>
      <Container maxWidth="lg" className="App">
        <Box>
          {(auth || isMocked) && <UserStats isMocked={isMocked}/>}
        </Box>
      </Container>
    </>
  );
}

export default App;
