import './App.css';
import {UserStatsV2} from "./pages/UserStatsV2";
import {Box} from "@mui/material";
import {Button, Input, Stack} from "@mui/joy";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {getAuthenticationToken, saveAuthenticationToken} from "@common/util";
import {API} from "@common/sdk/finals-tracker/api";

function App() {
  const [auth, setAuth] = useState(!!getAuthenticationToken())
  const [isMocked, setIsMocked] = useState(false)

  useEffect(() => {
    const resInterceptor = API.interceptors.response.use(
      res => {
        console.log(res)

        if (res.status === 401) {
          API.defaults.headers.Authorization = null
          saveAuthenticationToken()
          setAuth(false)
        }

        return res
      })

    return () => API.interceptors.response.eject(resInterceptor);
  }, [setAuth])

  const onJwtInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    API.defaults.headers.Authorization = `Bearer ${e.target.value}`
    saveAuthenticationToken(e.target.value)
    setAuth(true)
  }, [])

  return (
    <>
        {!(auth || isMocked) && <Box style={{backgroundColor: "#d31f3c", height: "20em"}}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1} sx={{height: "100%"}}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={1} sx={{height: "100%"}}>
                    <Input placeholder="API token" size="lg" onChange={onJwtInput}/>
                    <Button
                        onClick={() => setIsMocked(x => !x)}>{isMocked ? "Use live data" : "Use mocked data"}</Button>
                </Stack>
            </Stack>
        </Box>}
      {(auth || isMocked) && <UserStatsV2 isMocked={isMocked}/>}
    </>
  );
}

export default App;
