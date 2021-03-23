export const getGenres = genres => {
  if (!!genres) {
    return genres.join(' - ')
  }

}

export const getDuration = duration => {
  if (!!duration) {
    return duration.slice(0, duration.indexOf(':')) + 'ч ' + duration.slice(duration.indexOf(':') + 1) + 'м'
  }
}

export const getDate = date => {
  if (!!date) {
    return date.split("-").reverse().join("-");
  }
}

export const checkData = data => {
  return data.length == 0
}