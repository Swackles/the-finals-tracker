import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import {Button, FormControl, FormHelperText, IconButton, Stack, Typography, useTheme} from "@mui/joy";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import {useGameStatsStore} from "@common/stores/gameStatsStore";
import {ChangeEvent, useCallback, useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { toggleSidebar } from "./helper";

export interface HeaderProps {
  compact?: boolean
}

export default function Header({ compact }: HeaderProps) {
  const theme = useTheme()
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
    <Sheet
      sx={{
        position: 'fixed',
        top: 0,
        height: 'var(--Header-height)',
        zIndex: 9995,
        gap: 1,
        width: "100vw",
        backgroundColor: compact ? "#FFF" : theme.vars.palette.primary[600]
      }}
    >
      <Stack
        direction="row"
        justifyContent={{ xs: compact ? "space-between" : "flex-end", md: "space-between" }}
        alignItems="center"
        spacing={0}
        sx={{ p: compact ? 3 : 7 }}
      >
        {!compact && <Typography level="h1"
                     sx={{
                       color: "#FFF",
                       display: {
                         xs: "none",
                         md: "block"
                       }
                     }}>
          THE FINALS TRACKER
        </Typography>}
        {compact && <IconButton
          onClick={() => toggleSidebar()}
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <MenuIcon/>
        </IconButton>}
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={4}
        >
          <Button size="lg" component="a" target="_blank" href="https://the-finals-leaderboard.leonlarsson.com/" color="neutral">
            Leaderboard
          </Button>
          <FormControl error={!!fileError} sx={{ width: "100%" }} >
            <Button size="lg" color="neutral" component="label">
              Upload JSON
              <input type="file"
                     accept="application/json"
                     hidden
                     onChange={onFileInput} />
            </Button>
            {fileError && <FormHelperText><InfoOutlined/> {fileError}</FormHelperText>}
          </FormControl>
          <a href="https://github.com/Swackles/the-finals-tracker" target="_blank">
            <img style={{ width: 35, height: 35 }} src={compact ? "/github-mark.svg" : "/github-mark-white.svg"}/>
          </a>
        </Stack>
      </Stack>
    </Sheet>
  );
}
