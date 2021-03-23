import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './Card.module.css'

export const Card = props => {
  const { id, image, rating, type, title } = props

  return (
    <Link
      to={{ pathname: `/item/${id}`, state: { id, type } }}
      className={styles.cardLink}
    >
      <div className={cn(styles.cardWrapper)}>
        <img src={image} alt='poster' className={styles.cardPoster} />
        <span className={styles.cardRating}>{rating}</span>
        <span className={styles.cardTitle}>{title}</span>
      </div>
    </Link>
  )
}
