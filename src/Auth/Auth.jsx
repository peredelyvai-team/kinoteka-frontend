import React from 'react'
import cn from 'classnames'
import styles from './Auth.module.css'
import { BiUserCircle, BiKey } from 'react-icons/bi'
export const Auth = () => {
  return (
    <main className={styles.signIn}>
      <form className={cn(styles.form, 'jumbotron', 'rounded')}>
        <h1 className={cn('h2', 'mb-3', 'text-center')}>Sign in</h1>
        <div className={cn(styles.conInput, 'rounded-sm')}>
          <input
            type='email'
            className={styles.input}
            placeholder={'Username'}
          ></input>
          <BiUserCircle className={styles.icons} />
          <div className={styles.bg}></div>
        </div>
        <div className={cn(styles.conInput, 'rounded-sm')}>
          <input
            type='password'
            className={styles.input}
            placeholder={'Password'}
          ></input>
          <BiKey className={styles.icons} />
          <div className={styles.bg}></div>
        </div>
        <div className='btn-group' role='group'>
          <button className='btn btn-lg btn-primary' type='submit'>
            Sign in
          </button>
          <button className='btn btn-lg btn-outline-primary' type='submit'>
            Sign Up
          </button>
        </div>
      </form>
    </main>
  )
}
