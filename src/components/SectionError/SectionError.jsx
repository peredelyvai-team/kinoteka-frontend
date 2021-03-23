import React, { useState } from 'react'
import { BiRefresh } from 'react-icons/bi'
import cn from 'classnames'
import styles from './SectionError.module.css'

export const SectionError = ({ callback }) => {
  const [isClicked, setClicked] = useState(false)
  return (
    <div className={styles.wrraper}>
      <span className={styles.title}>Упс, что-то пошло не так...</span>
      <BiRefresh
        onClick={() => {
          setClicked(true)
          callback()
        }}
        className={cn(styles.refresh, { [styles.spin]: isClicked })}
      />
    </div>
  )
}
