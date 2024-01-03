import {AspectRatio, Card, CardContent, CardOverflow, Divider, Typography} from "@mui/joy";
import {TournamentRound} from "@common/sdk/finals-tracker";

export interface RoundCardProps {
  data: TournamentRound
}

export const RoundCard = ({ data }: RoundCardProps) => {
  return (
    <Card variant="outlined" sx={{ width: "100%" , mt: 3}}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={`/images/maps/${data.map}.png`}
            loading="lazy"
            alt={data.map}
          />
        </AspectRatio>
        <Typography style={{
          width: "100%",
          top: "10px",
          left: "0px",
          textShadow: "1px 1px 5px white",
          position: "absolute"
        }}  level="h2" color={data.won ? "success" : "danger"}>{data.won ? "WIN" : "LOSS"}</Typography>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">{Math.round(data.kills / data.deaths * 100) / 100} k/d</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">{data.kills} kills</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">{data.deaths} deaths</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">{data.respawns} respawns</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">{data.revives} revives</Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  )
}