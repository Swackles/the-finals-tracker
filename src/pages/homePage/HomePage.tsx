import {Button, FormControl, FormHelperText, Input, Stack, Typography} from "@mui/joy";
import {InfoOutlined} from "@mui/icons-material";
import {Box} from "@mui/material";
import {ChangeEvent, useCallback, useState} from "react";
import {getAuthenticationToken, saveAuthenticationToken} from "@common/util";
import {useAuthStore} from "@common/stores/AuthProvider";
import {JsonParser} from "./helpers";

export const HomePage = () => {
  const { login } = useAuthStore()

  const [file, setFile] = useState<any>()
  const [jwt, setJwt] = useState(getAuthenticationToken())

  const [fileError, setFileError] = useState<string>()

  const onFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    setFileError(undefined)

    reader.readAsText(e.target.files![0], "UTF-8");
    reader.onload = event => {
      try {
        setFile(JsonParser(JSON.parse(event.target!.result as string)))
      } catch (e) {
        setFileError((e as Error).message)
      }
    }
    reader.onerror = event => {
      console.error(event)
      setFileError("Error occured when parsing the file")
    }
  }, [setFile, setFileError])

  const onJwtInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    saveAuthenticationToken(e.target.value)
    setJwt(e.target.value)
  }, [])

  return (
    <Box style={{backgroundColor: "#d31f3c", height: "100vh"}}>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={1} sx={{height: "100%"}}>
        <Typography sx={{ display: "none" }} level="h1">The Finals Stats Tracker</Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1} sx={{height: "100%"}}>
          <Input placeholder="API token" size="lg" onChange={onJwtInput}/>
          <FormControl error={!!fileError} sx={{ width: "100%" }} >
            <Button color="neutral" component="label">
              Upload File
              <input type="file"
                     accept="application/json"
                     hidden
                     onChange={onFileInput} />
            </Button>
            {fileError && <FormHelperText>
                <InfoOutlined/> {fileError}
            </FormHelperText>}
          </FormControl>
          <Button disabled={file === undefined && jwt === undefined}
                  color="neutral"
                  onClick={() => login(jwt, file)} >View Stats</Button>
        </Stack>
        <a style={{ marginBottom: 20 }} href="https://github.com/Swackles/the-finals-tracker" target="_blank">
          <img style={{ width: 50, height: 50}} src={"/github-mark-white.svg"}/>
        </a>
      </Stack>
    </Box>
  )
}
