import {WeaponsTableCard, WeaponsTableRow} from "./WeaponsTableCard";
import Box from "@mui/joy/Box";

export interface WeaponsPanelProps {
    weaponTableData: WeaponsTableRow[]
}

export const WeaponsPanel = ({ weaponTableData }: WeaponsPanelProps) => {
    return (
    <WeaponsTableCard data={weaponTableData} />
    )
}