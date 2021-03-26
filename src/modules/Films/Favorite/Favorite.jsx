import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import Pagination from 'rc-pagination'
import { Card, SectionError, Preloader } from '../../../components'
import { getFavorites } from '../../../api/movies'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import styles from '../Films.module.css'

export const Favorite = () => {
  const [pageCount, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const handlePageClick = async currentPage => {
    setPage(currentPage)
    setLoading(true)
    await getMovies(currentPage)
    setLoading(false)
  }

  const getMovies = async page => {
    let currentPage = page || 1
    setLoading(true)
    const response = await getFavorites()
    if (response.status === 200) {
      setMovies(response.data)
      setPages(1)
      setLoading(false)
      setError(false)
    } else {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <section className={cn(styles.wrapper, 'container')}>
      <h1>Избранные:</h1>
      {isError ? (
        <SectionError callback={getMovies} />
      ) : (
        <>
          {isLoading ? (
            <Preloader isShow={true} />
          ) : (
            <>
              <div className={styles.moviesWrapper}>
                {movies.map(movie => (
                  <div className={styles.cardWrapper} key={movie.id}>
                    <Card
                      image={movie.poster_small}
                      rating={movie.rating}
                      title={movie.title}
                      isViewed={movie.viewed}
                      isFavorite={movie.to_watched}
                      id={movie.id}
                    />
                  </div>
                ))}
              </div>
              <Pagination
                total={pageCount * 10}
                current={page}
                onChange={handlePageClick}
                prevIcon={<BiArrowToLeft className={styles.paginationLink} />}
                nextIcon={<BiArrowToRight className={styles.paginationLink} />}
                jumpNextIcon={<span>...</span>}
                jumpPrevIcon={<span>...</span>}
                className={styles.pagination}
                hideOnSinglePage={true}
              />
            </>
          )}
        </>
      )}
    </section>
  )
}
