import {Card, CardOverflow, Stack, Table, Typography} from '@mui/joy';
import {getWeaponNameFromId} from "@common/util";
import {GameLoadoutAsset} from "@common/sdk/finals-tracker";

export interface WeaponsTableProps {
  data: GameLoadoutAsset[]
}

export const WeaponsTableCard = ({ data }: WeaponsTableProps) => {
  return (
    <Card
      variant="outlined"
      orientation="vertical" >
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
              <td>{x.damage}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </CardOverflow>
    </Card>
  )
}
