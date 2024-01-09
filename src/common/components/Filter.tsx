import {Tab, tabClasses, TabList, Tabs} from "@mui/joy";

export interface FilterProps<T = string> {
  defaultValue: T
  onChange: (gameMode: T) => void
  values: T[]
  disableValues?: T[]
}

export const Filter = ({defaultValue, values, disableValues = [], onChange}: FilterProps) => {
  return (
    <Tabs aria-label="tabs"
          defaultValue={defaultValue}
          sx={{ bgcolor: 'transparent' }}
          onChange={(_ , val) => onChange(val as string)} >
      <TabList
        disableUnderline
        sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: 'xl',
            bgcolor: 'background.level1',
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: 'sm',
                bgcolor: 'background.surface',
            },
        }}
      >
        {values.map(x =>
          <Tab disabled={disableValues.includes(x)} key={x} value={x} indicatorInset>{x}</Tab>
        )}
      </TabList>
    </Tabs>
  )
}
