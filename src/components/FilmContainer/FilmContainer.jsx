import React from 'react'
import { Card } from '../index'
import styles from './FilmContainer.module.css'

export const FilmContainer = ({ movies }) => {
  return (
    <div className={styles.moviesWrapper}>
      {movies.map(movie => (
        <div className={styles.cardWrapper} key={movie.id}>
          <Card
            image={movie.poster_small}
            rating={movie.rating}
            title={movie.title}
            isViewed={movie.viewed}
            isFavorite={movie.to_watched}
            id={movie.id}
          />
        </div>
      ))}
    </div>
  )
}
