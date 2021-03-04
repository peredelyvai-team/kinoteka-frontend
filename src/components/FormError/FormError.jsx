import React from 'react'
import styles from './FormError.module.css'
export const FormError = ({ formError }) => {
  return (
    <div className={styles.alertError}>
      <span className={styles.error}>{formError}</span>
    </div>
  )
}
