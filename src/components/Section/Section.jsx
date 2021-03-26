import PropTypes from 'prop-types'
import styles from './Section.module.css'

export function Section({ title, children, action }) {
  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        {action || null}
      </div>
      <div className={styles.list}>{children}</div>
    </>
  )
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  action: PropTypes.any,
}
