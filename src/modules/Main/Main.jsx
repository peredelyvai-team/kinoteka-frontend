import { useEffect, useState } from 'react'
import { getPopular } from '../../api/movies'
import { Section } from '../../components'
import { Card } from '../../components/Card/Card'

export function Main() {
  const [popular, setPopular] = useState([])

  useEffect(() => {
    const fetchPopular = async () => {
      const PAGE = 1
      const { data } = await getPopular(PAGE)
      console.log(popular)
      setPopular(data.popularFilms)
    }
    fetchPopular()
  }, [])

  return (
    <div className='container'>
      <Section title='Популярное'>
        {popular.map(movie => (
          <Card
            key={movie.id}
            title={movie.title}
            image={movie.poster_path}
            overview={movie.overview}
            id={movie.id}
          ></Card>
        ))}
      </Section>
      <Section title='Новые'>123</Section>
    </div>
  )
}
