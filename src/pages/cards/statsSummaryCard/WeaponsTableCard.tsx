import {Card, CardOverflow, Stack, Table, Typography} from '@mui/joy';
import {getWeaponNameFromId} from "@common/util";

export interface WeaponsTableRow {
  id: string
  damage?: number,
  kills?: number
}

export interface WeaponsTableProps {
  data: WeaponsTableRow[]
}

export const WeaponsTableCard = ({ data }: WeaponsTableProps) => {
  return (
    <Card
      variant="outlined"
      orientation="vertical"
      sx={{ width: "100%" }}>
      <CardOverflow sx={{ padding: 0 }}>
        <Table
          sx={{ '& tr > *:not(:first-child)': { textAlign: 'center' }, '& tr > *:first-child': { textAlign: 'left' } }}
          borderAxis="xBetween"
          size="md"
          stickyFooter={false}
          stickyHeader={false}
          stripe="even"
          variant="plain"
        >
          <thead>
          <tr>
            <th>Weapon</th>
            <th>Kills</th>
            <th>Damage</th>
          </tr>
          </thead>
          <tbody>
          {data.map(x => (
            <tr key={x.id}>
              <td>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}>
                  <img alt={getWeaponNameFromId(x.id)} style={{ width: 60, height: 60}} src={`/images/weapons/${getWeaponNameFromId(x.id).replaceAll(" ", "-").replaceAll(".", "")}.png`}/>
                  <Typography>{getWeaponNameFromId(x.id)}</Typography>
                </Stack>
              </td>
              <td>{x.kills}</td>
              <td>{x.damage}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </CardOverflow>
    </Card>
  )
}