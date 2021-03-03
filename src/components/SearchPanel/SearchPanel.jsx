import React from 'react'
import cn from 'classnames'
import { BiSearchAlt } from 'react-icons/bi'
import styles from './SearchPanel.module.css'

export const SearchPanel = () => {
  return (
    <div className={cn(styles.searchPanel, 'rounded-sm')}>
      <label className={styles.checkWrapper} htmlFor={'search-panel'}>
        <BiSearchAlt className={cn(styles.searchIcon)} color={'var(--light)'} />
      </label>
      <input
        className={styles.searchInput}
        type={'search'}
        id={'search-panel'}
      ></input>
    </div>
  )
}
