export default {
  formatTime(timeInSeconds) {
    timeInSeconds = Math.round(timeInSeconds)

    const minutes = Math.floor(timeInSeconds / 60)

    let seconds = timeInSeconds % 60
    if (seconds < 10) seconds = '0' + seconds

    return `${minutes}:${seconds}`
  }
}
