import {Card, CardOverflow, Table} from '@mui/joy';

export interface ClassesTableRow {
  class: string
  roundWinRate?: string,
  timePlayed?: string,
  tournamentWinRate?: string
}

export interface ClassesTableProps {
  data: ClassesTableRow[]
}

export const ClassesTableCard = ({ data }: ClassesTableProps) => {
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
            <th>Class</th>
            <th>Time played</th>
            <th>Round win rate</th>
            <th>Tournament win rate</th>
          </tr>
          </thead>
          <tbody>
          {data.map(x => (
            <tr key={x.class}>
              <td>{x.class}</td>
              <td>{x.timePlayed}</td>
              <td>{x.roundWinRate}</td>
              <td>{x.tournamentWinRate}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </CardOverflow>
    </Card>
  )
}