import React, { useState } from 'react'
import cn from 'classnames'
import { BiSearchAlt } from 'react-icons/bi'
import styles from './SearchPanel.module.css'

export const SearchPanel = ({ callback }) => {
  const [value, setValue] = useState('')
  const [isDisable, setDisable] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const clickHandler = async () => {
    if (value) {
      setIsEmpty(false)
      setDisable(true)
      await callback(value)
      setDisable(false)
    } else {
      setIsEmpty(true)
      setTimeout(() => setIsEmpty(false), 1000)
    }
  }

  return (
    <div
      className={cn(styles.searchPanel, 'rounded-sm', {
        [styles.error]: isEmpty,
      })}
    >
      <input
        className={styles.searchInput}
        type={'search'}
        onChange={e => setValue(e.target.value)}
      ></input>
      <button
        className={styles.checkWrapper}
        onClick={clickHandler}
        disabled={isDisable}
      >
        <BiSearchAlt className={cn(styles.searchIcon)} color={'var(--light)'} />
      </button>
    </div>
  )
}
