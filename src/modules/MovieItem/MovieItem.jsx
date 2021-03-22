import React, { useState, useEffect } from 'react'
import { getItem } from '../../api/movies'
import { getDuration } from '../../utils/getDuration'
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
    // fetchItem(id, type)
    setMovie({
      id: 464052,
      title: 'Чудо-женщина: 1984',
      overview:
        'Влиятельный бизнесмен Максвелл Лорд ищет магические артефакты, которые помогли бы ему обрести силу и могущество подобно богу. Однажды он встречает археолога Барбару Энн Минерву и просит у неё помощи в достижении его цели. Их отношения портятся, когда один из артефактов превращает Минерву в Гепарду, вне себя от ярости она желает ему отомстить за то, что с ней случилось. Лорд просит защиты у Дианы Принс, взамен он обещает, что воскресит Стива Тревора с помощью одного из артефактов.',
      poster_path:
        'https://www.themoviedb.org/t/p/w220_and_h330_face/1B2YJCYyRudISmfSWCRfc95gAtq.jpg',
      viewed: false,
      to_watched: false,
      tagline: 'Новая эра чудес начинается',
      backdrop_path:
        'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
      release_date: '2020-12-16',
      genres: ['фэнтези', 'боевик', 'приключения'],
      runtime: 151,
      trailer_path: 'https://www.youtube.com/watch?v=q0_M6L70yv8',
    })
    return () => setLoading(false)
  }, [])
  return (
    <>
      <div
        className={cn(styles.itemWrapper)}
        style={{ backgroundImage: `url("${movie.backdrop_path}")` }}
      >
        <div className={cn(styles.descriptionSection, 'container')}>
          <img
            src={movie.poster_path}
            alt='poster'
            className={styles.itemPoster}
          />
          <div className={styles.itemDescription}>
            <h2 className={styles.itemTitle}>{movie.title}</h2>
            <span className={styles.itemDuration}>
              {movie.release_date}
              &#8226;
              {getDuration(movie.runtime)}
            </span>
            <h3 className={styles.itemTagline}>{movie.tagline}</h3>
          </div>
        </div>
      </div>
    </>
  )
}
