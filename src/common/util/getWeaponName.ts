const weaponIdNameMap: Record<string, string> = {
  "-657541680": "SR-84",
  "473278792": "AKM",
  "-160507163": "SA1216"
}

export const getWeaponNameFromId = (id: string) => {
  const name = weaponIdNameMap[id]
  
  return name ? name : id
}