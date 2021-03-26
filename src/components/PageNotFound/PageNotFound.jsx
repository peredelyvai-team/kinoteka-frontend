import React from 'react'
import cn from 'classnames'
import styles from './PageNotFound.module.css'
import img from '../../assets/404.png'

export const PageNotFound = () => {
  return (
    <section className={cn(styles.wrapper, '.container')}>
      <img src={img} alt='404' className={styles.image} />
      <span className={styles.title}>Страница не найдена!</span>
    </section>
  )
}
