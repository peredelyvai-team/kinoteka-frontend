import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '../../components'
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
        <Rating rating={rating} size='xs' className={styles.cardRating} />
        <span className={styles.cardTitle}>{title}</span>
      </div>
    </Link>
  )
}
