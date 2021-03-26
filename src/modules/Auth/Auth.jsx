import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { BiUserCircle, BiKey } from 'react-icons/bi'
import { FormError } from '../../components/index'
import { useAction } from '../../hooks'
import { Preloader } from '../../components/Preloader'
import { useSelector } from 'react-redux'
import wave from '../../assets/wave.png'
import avatar from '../../assets/profile-pic.svg'
import styles from './Auth.module.css'

export const Auth = () => {
  const { setLogin, setRegistration, setAuthError } = useAction()

  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  const [isLoading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({
    loginError: '',
    passwordError: '',
  })

  const [disabled, setDisabled] = useState(false)

  const { authError } = useSelector(state => state.app)

  useEffect(() => {
    return () => {
      setAuthError('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const validateFields = () => {
    const loginError =
      form.login.length > 0 ? '' : 'Логин не должен быть пустым'
    const passwordError =
      form.password.length >= 6 ? '' : 'Пароль не может быть меньше 6 символов'
    setFormErrors({ loginError, passwordError })
    return !loginError && !passwordError
  }

  const submitHandler = async (e, action) => {
    e.preventDefault()
    if (validateFields()) {
      setLoading(true)
      setDisabled(true)
      try {
        action({ ...form })
        setDisabled(false)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
  }

  return (
    <section className={styles.signIn}>
      <img src={wave} className={styles.wave} alt='wave' />
      {isLoading && <Preloader isShow={isLoading} />}
      {!isLoading && (
        <form className={cn(styles.form, 'jumbotron')}>
          <img src={avatar} className={styles.avatar} alt='avatar' />
          <FormError formError={authError} />
          <div className={cn(styles.conInput, 'rounded-sm')}>
            <input
              type='email'
              className={styles.input}
              placeholder='Логин'
              name='login'
              onChange={e => changeHandler(e)}
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
              onChange={e => changeHandler(e)}
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
            <button
              className={cn('btn', 'btn-lg', 'btn-primary')}
              disabled={disabled}
              onClick={e => submitHandler(e, setLogin)}
            >
              Войти
            </button>
            <button
              className={cn('btn btn-lg', 'btn-outline-primary')}
              disabled={disabled}
              onClick={e => submitHandler(e, setRegistration)}
            >
              Регистрация
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
