import React from 'react'
import { useLocation } from 'react-router'
import ReactPaginate from 'react-paginate'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import cn from 'classnames'
import styles from './FilmContainer.module.css'

export const FilmContainer = () => {
  const path = useLocation()
  console.log(path)
  return (
    <section className={(styles.wrapper, 'container-fluid')}>
      {path.pathname === '/films' && (
        <aside className={styles.controlWrapper}>asside</aside>
      )}

      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        // pageCount={this.state.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        // onPageChange={this.handlePageClick}
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
