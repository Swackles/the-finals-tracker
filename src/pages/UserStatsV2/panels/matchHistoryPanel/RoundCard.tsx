import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import Skeleton from "@mui/joy/Skeleton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import React from "react";
import {RoundCardText} from "./RoundCardText"
import {getMapVariant} from "@common/util";
import {TournamentRound} from "@common/util/mapGameStats";

export interface RoundCardProps {
  data?: TournamentRound
}

export const RoundCard = ({ data }: RoundCardProps) => {
  const isLoading = !data

  return (
    <Grid xs={12} sm={6} xl={3}>
      <Card variant="outlined">
        <CardOverflow>
          <AspectRatio ratio="16/9">
            <Skeleton animation={false} loading={isLoading}>
              <img
                src={data ? `/images/maps/${data.mapVariant}.png` : ""}
                loading="lazy"
                alt={data?.mapVariant || "loading..."}
              />
            </Skeleton>
          </AspectRatio>
          {data &&
            <Typography style={{
              width: "100%",
              top: "10px",
              left: "0",
              textShadow: "1px 1px 5px white",
              position: "absolute",
              textAlign: "center"
            }}  level="h4" color={data.won ? "success" : "primary"}>{getMapVariant(data.mapVariant)}</Typography>
          }
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Stack sx={{ width: "100%" }}
                   direction="row"
                   alignItems="center"
                   divider={<Divider orientation="vertical" />}
                   justifyContent="space-around" >
              <RoundCardText isLoading={isLoading}
                             firstRow={data ? Math.round(data.kills / data.deaths * 100) / 100 : 0}
                             secondRowRow="k/d" />
              <RoundCardText isLoading={isLoading}
                             firstRow={data ? data.kills : 0}
                             secondRowRow="kills" />
              <RoundCardText isLoading={isLoading}
                             firstRow={data ? data.deaths : 0}
                             secondRowRow="deaths" />
              <RoundCardText isLoading={isLoading}
                             firstRow={data ? data.respawns : 0}
                             secondRowRow="respawns" />
              <RoundCardText isLoading={isLoading}
                             firstRow={data ? data.revives : 0}
                             secondRowRow="revives" />
            </Stack>
          </CardContent>
        </CardOverflow>
      </Card>
    </Grid>
  )
}
