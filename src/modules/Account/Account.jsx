import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getFavorites, getViewed } from '../../api/movies'
import { Card, Section, SectionError } from '../../components'
import { SkeletonSection } from '../../skeletons'
import { checkData } from '../../utils/getGenres'

export function Account() {
  const [login, setLogin] = useState('')
  const [viewed, setViewed] = useState([])
  const [isViewedError, setIsViewedError] = useState(false)
  const [isLoadingViewed, setIsLoadingViewed] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [isFavoritesError, setIsFavoritesError] = useState(false)
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true)

  async function fetchViewed() {
    const { data } = await getViewed()
    setViewed(data)
    setIsViewedError(checkData(data))
    setIsLoadingViewed(false)
  }

  async function fetchFavorites() {
    const { data } = await getFavorites()
    setFavorites(data)
    setIsFavoritesError(checkData(data))
    setIsLoadingFavorites(false)
  }

  useEffect(() => {
    fetchViewed()
  }, [])

  useEffect(() => {
    fetchFavorites()
  }, [])

  useEffect(() => {
    const { login } = jwt_decode(localStorage.getItem('access_token'))
    setLogin(login)
  }, [])

  return (
    <div className='container'>
      <h1>Добро пожаловать, {login}!</h1>
      <Section
        title='Просмотренные'
        action={<NavLink to='/watch'>Просмотреть все</NavLink>}
      >
        {isViewedError ? (
          <SectionError callback={fetchViewed} />
        ) : (
          <>
            {isLoadingViewed &&
              Array(5)
                .fill()
                .map(_ => (
                  <SkeletonSection color={'#fffdfd0'} highlightColor={'#555'} />
                ))}

            {!isLoadingViewed &&
              viewed.map(movie => (
                <Card
                  key={movie.id}
                  image={movie.poster_small}
                  rating={movie.rating}
                  title={movie.title}
                  isViewed={movie.viewed}
                  isFavorite={movie.to_watched}
                  id={movie.id}
                />
              ))}
          </>
        )}
      </Section>
      <Section
        title='Избранные'
        action={<NavLink to='/favorite'>Просмотреть все</NavLink>}
      >
        {isFavoritesError ? (
          <SectionError callback={fetchFavorites} />
        ) : (
          <>
            {isLoadingFavorites &&
              Array(5)
                .fill()
                .map(_ => (
                  <SkeletonSection color={'#fffdfd0'} highlightColor={'#555'} />
                ))}

            {!isLoadingFavorites &&
              favorites.map(movie => (
                <Card
                  key={movie.id}
                  image={movie.poster_small}
                  rating={movie.rating}
                  title={movie.title}
                  isViewed={movie.viewed}
                  isFavorite={movie.to_watched}
                  id={movie.id}
                />
              ))}
          </>
        )}
      </Section>
    </div>
  )
}
