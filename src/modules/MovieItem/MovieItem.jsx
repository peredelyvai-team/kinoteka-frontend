import React, { useState, useEffect } from 'react'
import { getItem } from '../../api/movies'
import cn from 'classnames'
import styles from './MovieItem.module.css'

export const MovieItem = props => {
  const { id, type } = props.location.state
  const [movie, setMovie] = useState({})
  const [isLoading, setLoading] = useState(false)

  const fetchItem = async (id, type) => {
    setLoading(true)
    const response = await getItem(id, type)
    console.log(response)
    setMovie(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchItem(id, type)
    return () => setLoading(false)
  }, [])
  return (
    <div className={cn(styles.itemWrapper, 'container')}>
      <img src={movie.backdrop_path} className={styles.itemBackdrop} />
      <div className={styles.descriptionSection}>
        <img
          src={movie.poster_path}
          alt='poster'
          className={styles.itemPoster}
        />
        <div className={styles.itemDescription}>
          <h1>{movie.title}</h1>
          <span>
            {movie.release_date}
            &#8226;
            {Math.trunc(movie.runtime / 60) + ':' + (movie.runtime % 60)}
          </span>
          <h3>{movie.tagline}</h3>
        </div>
      </div>
    </div>
  )
}
