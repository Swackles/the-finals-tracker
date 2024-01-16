const MAP_REGEX = /DA_MV_(.*?)_[0-9]+_(.*?)$/g;

export const getMapVariant = (fullMapName: string): string => {
  let [[_, map, variant]] = fullMapName.matchAll(MAP_REGEX);
  map = map.replace(/([a-z])([A-Z])/g, '$1 $2');
  variant = variant.replace(/([a-z])([A-Z])/g, '$1 $2');

  if (variant === "Base") {
    switch (map) {
      case "Seoul":
        return "DEFAULT"
      default:
        return "STANDARD ISSUE"
    }
  }

  switch (variant) {
    case "Highrise":
      return "HIGH RISE"
    case "SuspendedStructures+MovingPlatforms":
      return "UP, DOWN, LEFT, RIGHT"
    case "Lockdown":
      return "TRIPWIRES & TURRETS"
    default:
      return variant.toUpperCase()
  }
}
