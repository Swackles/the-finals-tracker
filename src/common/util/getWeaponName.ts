const weaponIdNameMap: Record<string, string> = {
  // Light
  "757827716": "Dagger",
  "1599997630": "M11",
  "1612446258": "SH1900",
  "-657541680": "SR-84",
  "-158222801": "V95",
  "-322594587": "XP-54",
  "-1900663257": "Throwing Knives",

  // Medium
  "473278792": "AKM",
  "1501440399": "CL-40",
  "-566338044": "FCAR",
  "1333183869": "Model 1887",
  "-2036840549": "R.357",
  "-1714487033": "Riot Shield",

  "-21077747": "Gas Mine",

  // Heavy
  "1480845770": "Flamethrower",
  "1743942098": "Lewis gun",
  "1088429850": "M32GL",
  "-212966229": "M60",
  "-160507163": "SA1216",
  "-211705009": "Sledgehammer",

  "-455578974": "C4",
  "1042541498": "RPG-7",

  // Shared
  "207168914": "Gas grenade",
  "1886362451": "Pyro grenade", // Maybe turret or C4
  "1082327915": "Frag Grenade",

  "-351094439": "Explosive Mine"
}

export const getWeaponNameFromId = (id: string) => {
  const name = weaponIdNameMap[id]
  
  return name ? name : id
}