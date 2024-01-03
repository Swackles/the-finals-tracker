import {WeaponsTableCard, WeaponsTableRow} from "./WeaponsTableCard";

export interface WeaponsPanelProps {
    weaponTableData: WeaponsTableRow[]
}

export const WeaponsPanel = ({ weaponTableData }: WeaponsPanelProps) => {
    return (
    <WeaponsTableCard data={weaponTableData} />
    )
}
