import {AspectRatio, Card, CardContent, CardOverflow, Divider, Skeleton, Stack, Typography} from "@mui/joy";
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
    <Card variant="outlined" sx={{mt: 3, width: 350}}>
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
            }}  level="h4" color={data.won ? "success" : "danger"}>{getMapVariant(data.mapVariant)}</Typography>
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
  )
}
