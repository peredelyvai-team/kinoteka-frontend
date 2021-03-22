import React from 'react'
import cn from 'classnames'
import error from '../../assets/error.png'
import styles from './InternetError.module.css'

export const InternetError = () => {
  return (
    <div className={cn('container', styles.errorWrapper)}>
      <img src={error} alt='error-logo' className={styles.errorLogo} />
      <span className={styles.errorTitle}>
        Что-то пошло не так, но мы скоро все починим
      </span>
    </div>
  )
}
