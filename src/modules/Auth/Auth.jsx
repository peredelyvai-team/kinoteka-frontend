import React, { useState } from 'react'
import cn from 'classnames'
import debounce from 'lodash.debounce'
import { BiUserCircle, BiKey } from 'react-icons/bi'
import { FormError } from '../../components/index'
import styles from './Auth.module.css'

export const Auth = () => {
  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState({
    loginError: '',
    passwordError: '',
  })

  const [formValid, setFormValid] = useState(false)

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    console.log(event.target.value)
  }

  const debounceCalculate = debounce(changeHandler, 1500)

  const validateFields = () => {
    const loginError =
      form.login.length > 0 ? '' : 'Логин не должен быть пустым'
    const passwordError =
      form.password.length > 6 ? '' : 'Пароль не может быть меньше 6 символов'
    setFormErrors({ loginError, passwordError })
    setFormValid(!loginError && passwordError)
  }

  const submitHandler = e => {
    e.preventDefault()
    validateFields()
    if (formValid) {
    }
  }

  return (
    <main className={styles.signIn}>
      <form
        className={cn(styles.form, 'jumbotron', 'rounded')}
        onSubmit={submitHandler}
      >
        <h1
          className={cn('h2', 'mb-3', 'text-center', {
            [styles.alert]: !formValid,
          })}
        >
          Вход
        </h1>
        <div className={cn(styles.conInput, 'rounded-sm')}>
          <input
            type='email'
            className={styles.input}
            placeholder='Логин'
            name='login'
            onChange={e => debounceCalculate(e)}
          />
          <BiUserCircle className={styles.icons} />
          <div
            className={cn(styles.bg, {
              [styles.error]: formErrors.loginError.length,
            })}
          ></div>
        </div>
        <FormError formError={formErrors.loginError} />
        <div className={cn(styles.conInput, 'rounded-sm')}>
          <input
            type='password'
            className={styles.input}
            placeholder='Пароль'
            name='password'
            onChange={e => debounceCalculate(e)}
          />
          <BiKey className={styles.icons} />
          <div
            className={cn(styles.bg, {
              [styles.error]: formErrors.loginError.length,
            })}
          ></div>
        </div>
        <FormError formError={formErrors.passwordError} />
        <div className='btn-group' role='group'>
          <button className='btn btn-lg btn-primary' type='submit'>
            Войти
          </button>
          <button
            className={cn('btn btn-lg', 'btn-outline-primary')}
            type='submit'
          >
            Регистрация
          </button>
        </div>
      </form>
    </main>
  )
}
