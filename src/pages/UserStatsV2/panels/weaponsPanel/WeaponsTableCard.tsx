import {Card, CardOverflow, Stack, Table, Typography} from '@mui/joy';
import {getWeaponNameFromId} from "@common/util";
import {WeaponStat} from "@common/stores/gameStatsStore";

export interface WeaponsTableProps {
  data: WeaponStat[]
}

export const WeaponsTableCard = ({ data }: WeaponsTableProps) => {
  return (
    <Card
      variant="soft"
      orientation="vertical" >
      <CardOverflow sx={{ padding: 0 }}>
        <Table
          sx={{
            '& tr > *:not(:first-child)': { textAlign: 'center' },
            '& tr > *:first-child': { textAlign: 'left' },
            "& td:first-child, & th:first-child": { pl: 2 },
            "& td:last-child, & th:last-child": { pr: 2 }
          }}
          borderAxis="xBetween"
          size="md"
        >
          <thead>
          <tr>
            <th style={{ width: "35%" }}>Weapon</th>
            <th>Class</th>
            <th>Type</th>
            <th>Kills</th>
            <th>Damage</th>
          </tr>
          </thead>
          <tbody>
          {data.map(x => (
            <tr key={x.name}>
              <td>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}>
                  <img alt={getWeaponNameFromId(x.name)} style={{ width: 60, height: 60}} src={`/images/weapons/${getWeaponNameFromId(x.name).replaceAll(" ", "-").replaceAll(".", "")}.png`}/>
                  <Typography>{getWeaponNameFromId(x.name)}</Typography>
                </Stack>
              </td>
              <td>{x.archetype}</td>
              <td>{x.type}</td>
              <td>{x.kills}</td>
              <td>{Math.round(x.damage)}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </CardOverflow>
    </Card>
  )
}
