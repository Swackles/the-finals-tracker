const weaponIdNameMap: Record<string, string> = {
  // Light
  "-657541680": "SR-84",

  // Medium
  "473278792": "AKM",

  // Heavy
  "-160507163": "SA1216",
  "-212966229": "M60",
  "1743942098": "Lewis gun",

  "1042541498": "C4",
  "-455578974": "RPG-7"
}

export const getWeaponNameFromId = (id: string) => {
  const name = weaponIdNameMap[id]
  
  return name ? name : id
}