import {Skeleton, Stack, Typography} from "@mui/joy";
import React from "react";

export interface RoundCardTextProps {
  isLoading: boolean
  firstRow: string | number
  secondRowRow: string | number
}

export const RoundCardText = ({ isLoading, firstRow, secondRowRow }: RoundCardTextProps) => {
  return (
    <Stack direction="column" spacing={0} alignItems="center">
      {isLoading ? <Skeleton animation={false} variant="text" level="body-xs"/> : <Typography level="body-xs">{firstRow}</Typography>}
      {isLoading ? <Skeleton animation={false} variant="text" level="body-xs"/> : <Typography level="body-xs">{secondRowRow}</Typography>}
    </Stack>
  )

}
