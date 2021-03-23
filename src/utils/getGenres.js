export const getGenres = genres => {
  if (!!genres) {
    return genres.join(' - ')
  }
  return ' - '
}

export const getDuration = duration => {
  if (!!duration) {
    return (
      duration.slice(0, duration.indexOf(':')) +
      'ч ' +
      duration.slice(duration.indexOf(':') + 1) +
      'м'
    )
  }
  return ' - '
}

export const getDate = date => {
  if (!!date) {
    return date.split('-').reverse().join('-')
  }
  return ' - '
}

export const checkData = data => {
  return !data
}


export const getTrailerPath = path => {
  if (path) {
    return path.slice(0, path.indexOf('&autoplay=1')) + '&autoplay=0'
  }
}

export const getRating = rating => {
  console.log(rating);
  let percentRating = rating <= 10 ? rating * 10 : rating.slice(0, rating.indexOf('%'))
  return percentRating
}