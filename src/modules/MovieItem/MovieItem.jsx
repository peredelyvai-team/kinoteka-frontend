import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { BsEye, BsEyeFill } from 'react-icons/bs'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import { getItem } from '../../api/movies'
import { Preloader } from '../../components'
import { getGenres, getDuration, getDate } from '../../utils/getGenres'
import styles from './MovieItem.module.css'

export const MovieItem = props => {
  const { id, type } = props.location.state
  const [movie, setMovie] = useState({})
  const [isLoading, setLoading] = useState(false)

  const videoSrc = {
    type: 'video',
    title: movie.title,
    sources: [
      {
        src: movie.trailer_path,
      },
    ],
  }
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
            <img
              src={movie.poster_small}
              alt='poster'
              className={styles.itemPoster}
            />
            <div className={styles.itemDescription}>
              <h2 className={styles.itemTitle}>{movie.title}</h2>
              <div className={styles.itemTagline}>
                <span>{getDate(movie.release_date)}</span>
                &#8226;
                <span>{getGenres(movie.genres)}</span>
                &#8226;
                <span>{getDuration(movie.runtime)}</span>
              </div>
              <div className={styles.icons}></div>
              <p className={styles.itemOverwiew}>{movie.overview}</p>
              {/* <Plyr source={videoSrc} /> */}
              <iframe
                is='x-frame-bypass'
                src='https://widgets.kinopoisk.ru/discovery/trailer/173446?onlyPlayer=1&autoplay=1&cover=1'
                frameborder='0'
              ></iframe>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
