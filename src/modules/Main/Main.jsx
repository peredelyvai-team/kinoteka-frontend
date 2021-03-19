import { useEffect, useState } from 'react'
import { SkeletonSection } from '../../skeletons'
import { getPopular } from '../../api/movies'
import { Section } from '../../components'
import { Card } from '../../components/Card/Card'

export function Main() {
  const [popular, setPopular] = useState([])
  const [isLoading, setLoading] = useState(false)

  const fetchPopular = async () => {
    const PAGE = 1
    setLoading(true)
    const { data } = await getPopular(PAGE)
    setLoading(false)
    setPopular(data.popularFilms)
  }

  useEffect(() => {
    fetchPopular()
    return () => setLoading(false)
  }, [])

  return (
    <div className='container'>
      <Section title='Популярное'>
        {isLoading && (
          <SkeletonSection color={'#202020'} highlightColor={'#fffdfd'} />
        )}
        {!isLoading &&
          popular.map(movie => (
            <Card
              key={movie.id}
              title={movie.title}
              image={movie.poster_path}
              overview={movie.overview}
              type={'films'}
              id={movie.id}
            />
          ))}
      </Section>
      <Section title='Новые'>123</Section>
    </div>
  )
}
