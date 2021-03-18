import React from 'react'
import styles from './Card.module.css'
import cn from 'classnames'

export const Card = props => {
  const { id, image, title, overview } = props

  return (
    <div className={cn(styles.cardWrapper)}>
      <div className={cn(styles.cardFront)}>
        <img src={image} alt='poster' className={styles.cardPoster} />
        <span className={styles.cardTitle}>{title}</span>
      </div>
      <div className={cn(styles.cardBack)}>
        <p className={cn(styles.cardOverwiev, 'card-text')}>{overview}</p>
      </div>
    </div>
  )
}
