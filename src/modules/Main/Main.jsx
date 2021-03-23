import { useEffect, useState } from 'react'
import { SkeletonSection } from '../../skeletons'
import { getPopular } from '../../api/movies'
import { Section } from '../../components'
import { Card } from '../../components/Card/Card'
import { InternetError } from '../../components/InternetError'
import { checkData } from '../../utils/getGenres'

export function Main() {
  const [popular, setPopular] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  const fetchPopular = async (page, type) => {
    setLoading(true)
    const { data } = await getPopular(page, type)
    setPopular(data.popularFilms)
    setError(checkData(data.popularFilms))
    console.log(data.popularFilms)
    setLoading(false)
  }

  useEffect(() => {
    fetchPopular(1, 'TOP_100_POPULAR_FILMS')
    // fetchPopular(1, 'TOP_100_POPULAR_FILMS')
    return () => setLoading(false)
  }, [])

  return (
    <>
      {!isError ? (
        <div className='container'>
          <Section title='Популярное'>
            {isLoading &&
              Array(20)
                .fill()
                .map(el => (
                  <SkeletonSection color={'#fffdfd0'} highlightColor={'#555'} />
                ))}
            {!isLoading &&
              popular.map(movie => (
                <Card
                  key={movie.id}
                  image={movie.poster_small}
                  rating={movie.rating}
                  type={'films'}
                  id={movie.id}
                />
              ))}
          </Section>
          <Section title='Ожидаемые'>123</Section>
        </div>
      ) : (
        <InternetError />
      )}
    </>
  )
}
