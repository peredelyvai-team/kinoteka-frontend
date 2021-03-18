import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BiUserCircle, BiLogIn } from 'react-icons/bi'
import cn from 'classnames'
import logo from '../../assets/Logo.svg'
import styles from './NavBar.module.css'

export const NavBar = () => {
  const { isAuth } = useSelector(state => state.app)
  return (
    <>
      <nav
        className={cn('navbar', 'navbar-expand-lg', 'bg-dark', styles.navBar)}
      >
        <div className={cn('container', styles.navBarContainer)}>
          <img className={styles.navbarLogo} src={logo} alt='logo' />
          <div className={styles.navList}>
            <NavLink
              to='/films'
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
            >
              Фильмы
            </NavLink>
            <NavLink
              to='/serials'
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
            >
              Сериалы
            </NavLink>
            {!isAuth && (
              <NavLink
                to='/auth'
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                title='Вход'
              >
                <BiLogIn size={'1.8rem'} />
              </NavLink>
            )}
            {isAuth && (
              <NavLink
                to='/account'
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                title='Личный кабинет'
              >
                <BiUserCircle size={'1.8rem'} />
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
