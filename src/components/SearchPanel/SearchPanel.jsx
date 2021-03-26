import React, { useState } from 'react'
import cn from 'classnames'
import { BiSearchAlt } from 'react-icons/bi'
import styles from './SearchPanel.module.css'

export const SearchPanel = ({ callback }) => {
  const [value, setValue] = useState('')
  const [isDisable, setDisable] = useState(false)

  const clickHandler = async () => {
    setDisable(true)
    await callback(value)
    setDisable(false)
  }
  const keyDownHandler = async e => {
    if (e.key === 'Enter') {
      await clickHandler()
    }
  }

  return (
    <div className={cn(styles.searchPanel, 'rounded-sm')}>
      <input
        className={styles.searchInput}
        type={'search'}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => keyDownHandler(e)}
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
