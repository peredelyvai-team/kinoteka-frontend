import React from 'react'
import PropTypes from 'prop-types'
import { getRating } from '../../utils/getGenres'
import cn from 'classnames'
import styles from './Rating.module.css'

export const Rating = ({ rating, size }) => {
  console.log(rating)
  const percents = getRating(rating)

  return (
    <span
      className={cn(
        styles[size],
        { [styles.red]: percents <= 50 },
        { [styles.yellow]: percents > 50 && percents < 70 },
        { [styles.green]: percents >= 70 }
      )}
    >
      {rating}
    </span>
  )
}

Rating.propType = {
  rating: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
}
