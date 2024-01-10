import {Stack, Typography, useTheme} from "@mui/joy";
import {Box} from "@mui/material";
import Header from "@common/components/Header";

export const HomePage = () => {
  const theme = useTheme()

  return (
    <Box style={{backgroundColor: theme.vars.palette.primary[600], height: "100vh"}}>
      <Header />
      <Stack direction="column"
             justifyContent="center"
             alignItems="center"
             spacing={1}
             sx={{
               height: "100%",
               marginLeft: "10vw"
             }}>
        <Typography className="finals-title"
                    sx={{
                      wordSpacing: "100vw",
                      fontSize: "214px",
                      lineHeight: "80%",
                      color: "#FFF",
                      display: { xs: "none", sm: "block" }
                    }}>
          THE FINALS TRACKER
        </Typography>
      </Stack>
    </Box>
  )
}
