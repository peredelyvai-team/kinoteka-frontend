import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { Rating, Section, ActorCard } from '../../components'
import {
  getItem,
  addViewed,
  removeViewed,
  addFavorite,
  removeFavorite,
} from '../../api/movies'
import { Preloader, InternetError } from '../../components'
import { BsEye, BsEyeFill, BsPlayFill } from 'react-icons/bs'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import {
  getGenres,
  getDuration,
  getDate,
  getTrailerPath,
  checkData,
} from '../../utils/getGenres'
import styles from './MovieItem.module.css'
import { useSelector } from 'react-redux'

export const MovieItem = props => {
  const { id, type } = props.location.state
  const [movie, setMovie] = useState({})
  const [isViewed, setViewed] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const [isError, setError] = useState(false)
  const [trailerShow, setTrailerShow] = useState(false)

  const [isLoading, setLoading] = useState(true)

  const { isAuth } = useSelector(state => state.app)
  const fetchItem = async (id, type) => {
    setLoading(true)
    const response = await getItem(id, type)
    setMovie(response.data)
    setViewed(response.data.viewed)
    setFavorite(response.data.to_watch)
    setLoading(false)
    setError(checkData(response.data))
  }
  const setAddViewHandler = async () => {
    const response = await addViewed(movie.id)
    if (response.status === 200 && response.data === 'OK') {
      setViewed(true)
    }
  }

  const removeViewHandler = async () => {
    const response = await removeViewed(movie.id)
    if (response.status === 200 && response.data === 'OK') {
      setViewed(false)
    }
  }

  const setAddFavoriteHandler = async () => {
    const response = await addFavorite(movie.id)
    if (response.status === 200 && response.data === 'OK') {
      setFavorite(true)
    }
  }

  const removeFavoriteHandler = async () => {
    const response = await removeFavorite(movie.id)
    if (response.status === 200 && response.data === 'OK') {
      setViewed(false)
    }
  }

  const scrollToTrailer = () => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' })
  }

  const ref = React.createRef()
  useEffect(() => {
    fetchItem(id, type)
    return () => {
      setLoading(true)
      setError(false)
      setTrailerShow(false)
    }
  }, [id, type])
  return (
    <>
      {isError ? (
        <InternetError />
      ) : isLoading ? (
        <Preloader isShow={isLoading} />
      ) : (
        <>
          <section
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.5)) , url(${movie.backdrop})`,
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
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
                <h3 className={styles.itemSlogan}> {movie.slogan} </h3>
                <div className={styles.toggleBar}>
                  <Rating rating={movie.rating} size='xl' />
                  {isAuth && (
                    <>
                      {isViewed ? (
                        <BsEyeFill
                          className={styles.icon}
                          onClick={removeViewHandler}
                        />
                      ) : (
                        <BsEye
                          className={styles.icon}
                          onClick={setAddViewHandler}
                        />
                      )}
                      {isFavorite ? (
                        <MdFavorite
                          className={styles.icon}
                          onClick={removeFavoriteHandler}
                        />
                      ) : (
                        <MdFavoriteBorder
                          className={styles.icon}
                          onClick={setAddFavoriteHandler}
                        />
                      )}
                    </>
                  )}
                  <span
                    className={styles.trailerLink}
                    onClick={() => {
                      setTrailerShow(true)
                      scrollToTrailer(ref)
                    }}
                  >
                    <BsPlayFill className={styles.playIcon} />
                    Смотреть трейлер
                  </span>
                </div>
                <h3 className={styles.subTitle}>Обзор:</h3>
                <p className={styles.itemOverwiew}>{movie.overview}</p>
              </div>
            </div>
          </section>
          <section className={cn(styles.staffSection, 'container')}>
            <Section title='Актерский состав'>
              {movie.staff.map((el, index) => (
                <ActorCard
                  key={index}
                  actorPhoto={el.posterUrl}
                  actorName={el.name}
                  actorRole={el.description}
                />
              ))}
            </Section>
          </section>
          <section className={cn(styles.trailerWrapper, 'container')} ref={ref}>
            {trailerShow ? (
              <iframe
                is='x-frame-bypass'
                src={getTrailerPath(movie.trailer_path)}
                width='100%'
                height='100%'
                title={movie.title}
                frameBorder='0'
                allow=''
              ></iframe>
            ) : (
              <span
                className={styles.trailerLink}
                onClick={() => setTrailerShow(true)}
              >
                <BsPlayFill className={styles.playIcon} />
                Смотреть трейлер
              </span>
            )}
          </section>
        </>
      )}
    </>
  )
}
