import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { Rating } from '../../components'
import { getItem } from '../../api/movies'
import { Preloader } from '../../components'
import { BsEye, BsEyeFill, BsLockFill } from 'react-icons/bs'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import {
  getGenres,
  getDuration,
  getDate,
  getTrailerPath,
} from '../../utils/getGenres'
import styles from './MovieItem.module.css'
import { useSelector } from 'react-redux'

export const MovieItem = props => {
  const { id, type } = props.location.state
  const [movie, setMovie] = useState({})
  const [isLoading, setLoading] = useState(true)

  const { isAuth } = useSelector(state => state.app)
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
        <>
          <section
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.5)) , url(${movie.backdrop})`,
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
            }}
            className={cn(styles.itemWrapper, 'container')}
          >
            <div className={cn(styles.descriptionSection)}>
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
                <div className={styles.toggleBar}>
                  <Rating rating={movie.rating} size='xl' />
                  {isAuth && (
                    <>
                      {movie.viewed ? (
                        <BsEyeFill className={styles.icon} />
                      ) : (
                        <BsEye className={styles.icon} />
                      )}
                      {movie.to_watched ? (
                        <MdFavorite className={styles.icon} />
                      ) : (
                        <MdFavoriteBorder className={styles.icon} />
                      )}
                    </>
                  )}
                </div>
                <h3 className={styles.subTitle}>Обзор:</h3>
                <p className={styles.itemOverwiew}>{movie.overview}</p>
              </div>
            </div>
          </section>
          <section className={cn(styles.trailerWrapper, 'container')}>
            <iframe
              is='x-frame-bypass'
              src={getTrailerPath(movie.trailer_path)}
              width='100%'
              height='500'
              frameBorder='0'
              allow=''
            ></iframe>
          </section>
        </>
      )}
    </>
  )
}
