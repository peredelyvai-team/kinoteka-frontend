import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './Card.module.css'

export const Card = props => {
  const { id, image, title, overview, type } = props

  return (
    <Link
      to={{ pathname: `/item/${id}`, state: { id, type } }}
      className={styles.cardLink}
    >
      <div className={cn(styles.cardWrapper)}>
        <div className={cn(styles.cardFront)}>
          <img src={image} alt='poster' className={styles.cardPoster} />
          <span className={styles.cardTitle}>{title}</span>
        </div>
        <div className={cn(styles.cardBack)}>
          <p className={cn(styles.cardOverwiev, 'card-text')}>{overview}</p>
        </div>
      </div>
    </Link>
  )
}
