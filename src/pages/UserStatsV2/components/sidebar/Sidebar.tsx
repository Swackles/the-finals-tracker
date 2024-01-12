import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { closeSidebar } from './helpers';
import {Stack} from "@mui/joy";

export interface SidebarProps {
  activeTab: string,
  setActiveTab: (tab: string) => void
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100vh',
        width: 'var(--Sidebar-width)',
        top: 0,
        pr: 2,
        pl: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: 'fixed',
            zIndex: 9998,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            opacity: 'var(--SideNavigation-slideIn)',
            backgroundColor: 'var(--joy-palette-background-backdrop)',
            transition: 'opacity 0.4s',
            transform: {
              xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * calc(var(--Sidebar-width, 0px) + 33px)))',
              lg: 'translateX(-100%)',
            },
          }}
          onClick={() => closeSidebar()}
        />
        <Box sx={{ display: 'flex', gap: 1, pt: 2, alignItems: 'center' }}>
          <Typography level="title-lg">The Finals Tracker</Typography>
        </Box>
        <Box
          sx={{
            minHeight: 0,
            overflow: 'hidden auto',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }} >
          <List
            size="sm"
            sx={{
              gap: 1,
              '--List-nestedInsetStart': '30px',
              '--ListItem-radius': (theme) => theme.vars.radius.sm,
            }} >
              <ListItem>
                <ListItemButton selected={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                  <DashboardRoundedIcon />
                  <ListItemContent>
                  <Typography level="title-sm">Overview</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton selected={activeTab === "weapons"} onClick={() => setActiveTab("weapons")}>
                  <ListItemContent>
                    <Typography level="title-sm">Weapons</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton selected={activeTab === "match-history"} onClick={() => setActiveTab("match-history")}>
                  <EmojiEventsIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Match History</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
          </List>
          <Stack justifyContent="center"
                 alignItems="center">
            <a style={{ marginBottom: 10 }} href="https://github.com/Swackles/the-finals-tracker" target="_blank">
              <img style={{ width: 35, height: 35}} src={"/github-mark.svg"}/>
            </a>
          </Stack>
        </Box>
    </Sheet>
  );
}
