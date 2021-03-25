import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import ReactPaginate from 'react-paginate'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import cn from 'classnames'
import { SearchPanel, Card } from '../index'
import { fetchMoviesByWord } from '../../api/movies'
import styles from './FilmContainer.module.css'

export const FilmContainer = () => {
  const [pageCount, setPages] = useState(1)
  const [offset, setOffset] = useState(0)
  const [movies, setMovies] = useState([])
  const [isError, setError] = useState(false)
  // const [isSeacrch]

  const path = useLocation()

  const getMovieByWord = async value => {
    const response = await fetchMoviesByWord(offset, value)
    if (response.status === 200) {
      setMovies(response.data.films)
      setPages(response.data.pagesCount)
    } else {
      setError(true)
    }
    console.log(response)
  }

  const handlePageClick = e => {
    console.log(e)
  }
  return (
    <section className={cn(styles.wrapper, 'container')}>
      {path.pathname === '/films' && <SearchPanel callback={getMovieByWord} />}
      <div className={styles.moviesWrapper}>
        {movies.map(movie => (
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
      </div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        previousLabel={<BiArrowToLeft />}
        nextLabel={<BiArrowToRight />}
        containerClassName={styles.pagination}
        previousClassName={styles.paginationItem}
        previousLinkClassName={styles.paginationLink}
        nextClassName={styles.paginationItem}
        nextLinkClassName={styles.paginationLink}
        breakClassName={styles.breakItem}
        breakLinkClassName={styles.breakItemLink}
        pageClassName={styles.paginationItem}
        pageLinkClassName={styles.paginationLink}
        activeLinkClassName={styles.activeLink}
      />
    </section>
  )
}
