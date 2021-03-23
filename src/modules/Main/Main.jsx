import { useEffect, useState } from 'react'
import { SkeletonSection } from '../../skeletons'
import { getTop } from '../../api/movies'
import { Section } from '../../components'
import { Card } from '../../components/Card/Card'
import { SectionError } from '../../components/SectionError'
import { checkData } from '../../utils/getGenres'

export function Main() {
  const [popular, setPopular] = useState([])
  const [awaitFilms, setAwaitFilms] = useState([])
  const [isLoadingPopular, setLoadingPopular] = useState(true)
  const [isLoadingAwait, setLoadingAwait] = useState(true)
  const [isErrorPopular, setErrorPopular] = useState(false)
  const [isErrorAwait, setErrorAwait] = useState(false)

  const fetchPopular = async () => {
    const PAGE = 1
    const TYPE = 'TOP_100_POPULAR_FILMS'
    setLoadingPopular(true)
    const { data } = await getTop(PAGE, TYPE)
    setPopular(data.films)
    setErrorPopular(checkData(data.films))
    setLoadingPopular(false)
  }

  const fetchAwait = async () => {
    const PAGE = 1
    const TYPE = 'TOP_AWAIT_FILMS'
    setLoadingAwait(true)
    const { data } = await getTop(PAGE, TYPE)
    console.log(data)
    setAwaitFilms(data.films)
    setErrorAwait(checkData(data.films))
    setLoadingAwait(false)
  }

  useEffect(() => {
    fetchPopular()
    fetchAwait()
    return () => setLoadingPopular(false)
  }, [])

  return (
    <>
      <div className='container'>
        <Section title='Популярное'>
          {isErrorPopular ? (
            <SectionError callback={fetchPopular} />
          ) : (
            <>
              {isLoadingPopular &&
                Array(5)
                  .fill()
                  .map(el => (
                    <SkeletonSection
                      color={'#fffdfd0'}
                      highlightColor={'#555'}
                    />
                  ))}

              {!isLoadingPopular &&
                popular.map(movie => (
                  <Card
                    key={movie.id}
                    image={movie.poster_small}
                    rating={movie.rating}
                    type={'films'}
                    title={movie.title}
                    id={movie.id}
                  />
                ))}
            </>
          )}
        </Section>
        <Section title='Ожидаемые'>
          {isErrorAwait ? (
            <SectionError callback={fetchAwait} />
          ) : (
            <>
              {isLoadingAwait &&
                Array(5)
                  .fill()
                  .map(el => (
                    <SkeletonSection
                      color={'#fffdfd0'}
                      highlightColor={'#555'}
                    />
                  ))}

              {!isLoadingAwait &&
                awaitFilms.map(movie => (
                  <Card
                    key={movie.id}
                    image={movie.poster_small}
                    rating={movie.rating}
                    type={'films'}
                    title={movie.title}
                    id={movie.id}
                  />
                ))}
            </>
          )}
        </Section>
      </div>
    </>
  )
}
