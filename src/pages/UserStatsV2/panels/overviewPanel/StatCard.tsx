import {Card, Divider, Grid, Stack, Typography} from "@mui/joy";

export interface StatCardProps {
  title: string
  value: string | number
  md?: number
}

export const StatCard = ({title, value, md = 4}: StatCardProps) =>
  <Grid xs={12} md={md}>
    <Card variant="soft" size="sm">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}>
          <Typography level="title-lg">{title}</Typography>
          <Divider />
          <Typography>{value}</Typography>
        </Stack>
    </Card>
  </Grid>
