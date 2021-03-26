import React, { useState, useEffect } from 'react'
import Pagination from 'rc-pagination'
import cn from 'classnames'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import {
  FilmContainer,
  SearchPanel,
  SectionError,
  Preloader,
} from '../../../components'
import { fetchMoviesByWord, getTop } from '../../../api/movies'
import styles from '../Films.module.css'

export const Films = () => {
  const [pageCount, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')

  const getMovieByWord = async value => {
    setLoading(true)
    setSearchValue(value)
    const response = await fetchMoviesByWord(page, value)
    if (response.status === 200) {
      setMovies(response.data.films)
      setPages(response.data.pagesCount)
      setLoading(false)
    } else {
      setError(true)
      setLoading(false)
    }
  }

  const handlePageClick = async currentPage => {
    setPage(currentPage)
    setLoading(true)
    if (searchValue) {
      const response = await fetchMoviesByWord(currentPage, searchValue)
      setMovies(response.data.films)
      setPages(response.data.pagesCount)
      setLoading(false)
    } else {
      await getMovies(currentPage)
      setLoading(false)
    }
  }

  const getMovies = async page => {
    const TYPE = 'TOP_100_POPULAR_FILMS'
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

  const checkValue = value => {
    if (!value) {
      setSearchValue('')
      getMovies()
    } else {
      getMovieByWord(value)
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
              <SearchPanel
                callback={value => {
                  setPage(1)
                  checkValue(value)
                }}
              />
              <FilmContainer movies={movies} />
              <Pagination
                total={pageCount * 10}
                current={page}
                onChange={handlePageClick}
                prevIcon={<BiArrowToLeft className={styles.paginationLink} />}
                nextIcon={<BiArrowToRight className={styles.paginationLink} />}
                className={styles.pagination}
                jumpNextIcon={<span>...</span>}
                jumpPrevIcon={<span>...</span>}
                hideOnSinglePage={true}
              />
            </>
          )}
        </>
      )}
    </section>
  )
}
