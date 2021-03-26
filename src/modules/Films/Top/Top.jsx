import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import Pagination from 'rc-pagination'
import { FilmContainer, SectionError, Preloader } from '../../../components'
import { getTop } from '../../../api/movies'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import styles from '../Films.module.css'

export const Top = () => {
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
    const TYPE = 'TOP_250_BEST_FILMS'
    let currentPage = page || 1
    setLoading(true)
    const response = await getTop(currentPage, TYPE)
    if (response.status === 200) {
      setMovies(response.data.films)
      setPages(response.data.pagesCount)
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
      {isError ? (
        <SectionError callback={getMovies} />
      ) : (
        <>
          {isLoading ? (
            <Preloader isShow={true} />
          ) : (
            <>
              <FilmContainer movies={movies} />
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
