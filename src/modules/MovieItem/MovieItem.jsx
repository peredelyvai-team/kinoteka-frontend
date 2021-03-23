import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { BsEye, BsEyeFill } from 'react-icons/bs'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { getItem } from '../../api/movies'
import { Preloader } from '../../components'
import { getGenres, getDuration, getDate } from '../../utils/getGenres'
import styles from './MovieItem.module.css'

export const MovieItem = props => {
  const { id, type } = props.location.state
  const [movie, setMovie] = useState({})
  const [isLoading, setLoading] = useState(true)

  const fetchItem = async (id, type) => {
    setLoading(true)
    const response = await getItem(id, type)
    setMovie(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchItem(id, type)

    return () => setLoading(false)
  }, [])
  return (
    <>
      {isLoading && <Preloader isShow={isLoading} />}
      {!isLoading && (
        <section className={styles.itemWrapper}>
          <div className={cn(styles.descriptionSection, 'container')}>
            <div className={styles.posterSection}>
              <img
                src={movie.poster_small}
                alt='poster'
                className={styles.itemPoster}
              />
              <div className={styles.itemTagline}>
                <span> Дата: {getDate(movie.release_date)}</span>
                <span>Жанр: {getGenres(movie.genres)}</span>
                <span>Длительность: {getDuration(movie.runtime)}</span>
              </div>
            </div>
            <div className={styles.itemDescription}>
              <h2 className={styles.itemTitle}>{movie.title}</h2>
              <div className={styles.icons}></div>
              <p className={styles.itemOverwiew}>{movie.overview}</p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
