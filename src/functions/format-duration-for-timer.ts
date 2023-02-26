export function formatDurationForTimer(amountOfSeconds: number) {
  const minutes = Math.floor(amountOfSeconds / 60)
  const seconds = amountOfSeconds % 60

  return `${minutes}\u00A0: ${formatSeconds(seconds)}`
}

function formatSeconds(duration: number) {
  const oneDigitSeconds = duration < 10
  return oneDigitSeconds ? "0" + duration : duration
}
