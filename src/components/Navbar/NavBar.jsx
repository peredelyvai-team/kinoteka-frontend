import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BiUserCircle, BiLogIn, BiLogOut } from 'react-icons/bi'
import { useAction } from '../../hooks'
import { resetTokens } from '../../utils/auth'
import cn from 'classnames'
import logo from '../../assets/Logo.png'
import styles from './NavBar.module.css'

export function NavBar() {
  const { isAuth } = useSelector(state => state.app)
  const { setAuth } = useAction()

  const logout = () => {
    resetTokens()
    setAuth()
  }

  return (
    <nav className={cn('navbar', 'navbar-expand-lg', styles.navBar)}>
      <div className={cn('container', styles.navBarContainer)}>
        <NavLink to='/' className={styles.navLink}>
          <img className={styles.navbarLogo} src={logo} alt='logo' />
        </NavLink>
        <div className={styles.navList}>
          <NavLink
            to='/films'
            className={styles.navLink}
            activeClassName={styles.navLinkActive}
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/top'
            className={styles.navLink}
            activeClassName={styles.navLinkActive}
          >
            Top-150
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
            <>
              <NavLink
                to='/account'
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                title='Личный кабинет'
              >
                <BiUserCircle size={'1.8rem'} />
              </NavLink>
              <BiLogOut
                style={{ cursor: 'pointer' }}
                onClick={logout}
                size={'1.8rem'}
                color='white'
              />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
