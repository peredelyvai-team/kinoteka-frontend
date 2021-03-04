import React from 'react'
import cn from 'classnames'
import { BiPaint } from 'react-icons/bi'
import styles from './Preloader.module.css'

export const Preloader = ({isShow}) => {

  const preloader = isShow?<div className={cn(styles.preloaderWrapper)}>
  <BiPaint className={styles.preloaderPen} />
  <span className={styles.preloaderLine}></span>
  <span className={styles.preloaderLine}></span>
  <span className={styles.preloaderLine}></span>
</div>:null
  return (
    <>
      {preloader}
    </>
  )
}
