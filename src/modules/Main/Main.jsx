import { useEffect, useState } from 'react'
import { SkeletonSection } from '../../skeletons'
import { getPopular } from '../../api/movies'
import { Section } from '../../components'
import { Card } from '../../components/Card/Card'
import { InternetError } from '../../components/InternetError'

export function Main() {
  const [popular, setPopular] = useState([])
  const [isLoading, setLoading] = useState(false)

  const fetchPopular = async () => {
    const PAGE = 1
    setLoading(true)
    const { data } = await getPopular(PAGE)
    setLoading(false)
    setPopular(data.popularFilms)
    console.log(data)
  }

  useEffect(() => {
    fetchPopular()
    // setPopular([
    //   {
    //     id: 337401,
    //     overview:
    //       'When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.',
    //     title: 'Mulan',
    //     poster_path:
    //       'https://www.themoviedb.org/t/p/w220_and_h330_face/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
    //     viewed: false,
    //     to_watched: false,
    //   },
    // ])
    return () => setLoading(false)
  }, [])

  return (
    <>
      {!!popular ? (
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
