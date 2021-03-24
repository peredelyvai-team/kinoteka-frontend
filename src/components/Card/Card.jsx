import React from 'react'
import { Link } from 'react-router-dom'
import { BsEye, BsEyeFill } from 'react-icons/bs'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { Rating } from '../../components'
import cn from 'classnames'
import styles from './Card.module.css'

export const Card = props => {
  const { id, image, rating, type, title, isViewed, isFavorite } = props
  return (
    <Link
      to={{ pathname: `/item/${id}`, state: { id, type } }}
      className={styles.cardLink}
    >
      <div className={cn(styles.cardWrapper)}>
        <img src={image} alt='poster' className={styles.cardPoster} />
        <Rating rating={rating} size='xs' className={styles.cardRating} />
        {isViewed ? (
          <BsEyeFill className={styles.iconView} />
        ) : (
          <BsEye className={styles.iconView} />
        )}
        {isFavorite ? (
          <MdFavorite className={styles.iconFavorite} />
        ) : (
          <MdFavoriteBorder className={styles.iconFavorite} />
        )}
        <span className={styles.cardTitle}>{title}</span>
      </div>
    </Link>
  )
}
