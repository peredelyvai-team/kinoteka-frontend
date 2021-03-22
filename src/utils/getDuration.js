export const getDuration = duration => {
  if (!!duration) {
    return Math.trunc(duration / 60) + ' : ' + (duration % 60)
  }
}
