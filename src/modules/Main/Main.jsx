import { useEffect, useState } from 'react'
import { SkeletonSection } from '../../skeletons'
import { getPopular } from '../../api/movies'
import { Section } from '../../components'
import { Card } from '../../components/Card/Card'
import { InternetError } from '../../components/InternetError'
import { checkData } from '../../utils/getGenres'
import { check } from 'prettier'

export function Main() {
  const [popular, setPopular] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  const fetchPopular = async () => {
    const PAGE = 1
    setLoading(true)
    const { data } = await getPopular(PAGE)
    setPopular(data.popularFilms)
    setError(checkData(data.popularFilms))
    console.log(data.popularFilms)
    setLoading(false)
  }

  useEffect(() => {
    fetchPopular()
    return () => setLoading(false)
  }, [])

  return (
    <>
      {!isError ? (
        <div className='container'>
          <Section title='Популярное'>
            {isLoading && (
              <SkeletonSection color={'#202020'} highlightColor={'#fffdfd'} />
            )}
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
          <Section title='Новые'>123</Section>
        </div>
      ) : (
        <InternetError />
      )}
    </>
  )
}
