import {Button, FormControl, FormHelperText, Stack, Typography} from "@mui/joy";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import {Box} from "@mui/material";
import {ChangeEvent, useCallback, useState} from "react";
import {useGameStatsStore} from "@common/stores/gameStatsStore";

export const HomePage = () => {
  const { setJson } = useGameStatsStore()

  const [fileError, setFileError] = useState<string>()

  const onFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    setFileError(undefined)

    reader.readAsText(e.target.files![0], "UTF-8");
    reader.onload = event => {
      try {
        setJson(JSON.parse(event.target!.result as string))
      } catch (e) {
        setFileError((e as Error).message)
      }
    }
    reader.onerror = event => {
      console.error(event)
      setFileError("Error occured when parsing the file")
    }
  }, [setJson, setFileError])

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
          <FormControl error={!!fileError} sx={{ width: "100%" }} >
            <Button color="neutral" component="label">
              Upload JSON
              <input type="file"
                     accept="application/json"
                     hidden
                     onChange={onFileInput} />
            </Button>
            {fileError && <FormHelperText><InfoOutlined/> {fileError}</FormHelperText>}
          </FormControl>
          <Button component="a"
                  sx={{ "&:hover": {backgroundColor: "transparent"}, color: "white" }}
                  target="_blank"
                  href="https://github.com/Swackles/the-finals-tracker?tab=readme-ov-file#how-to-get-json"
                  color="neutral"
                  variant="plain" >
            How do get JSON?
          </Button>

        </Stack>
        <a style={{ marginBottom: 20 }} href="https://github.com/Swackles/the-finals-tracker" target="_blank">
          <img style={{ width: 50, height: 50}} src={"/github-mark-white.svg"}/>
        </a>
      </Stack>
    </Box>
  )
}
