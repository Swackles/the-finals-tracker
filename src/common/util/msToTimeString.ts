const MINUTE_MULTIPLIER = 60 * 1000
const HOUR_MULTIPLIER = MINUTE_MULTIPLIER * 60
const DAY_MULTIPLIER = HOUR_MULTIPLIER * 24

export const msToTimeString = (ms?: number) => {
  if (!ms) return `0m`

  let time = ms
  const playedString = []

  const days = Math.floor(time / DAY_MULTIPLIER)
  if (days > 0) {
    time = time % (days * DAY_MULTIPLIER)
    playedString.push(`${days}d`)
  }

  const hours = Math.floor(time / HOUR_MULTIPLIER)
  if (hours > 0) {
    time = time % (hours * HOUR_MULTIPLIER)
    playedString.push(`${hours}h`)
  }

  const minutes = Math.floor(time / MINUTE_MULTIPLIER)
  if (minutes > 0) playedString.push(`${minutes}m`)

  return playedString.join(" ")
}