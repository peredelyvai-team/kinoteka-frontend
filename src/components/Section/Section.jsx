import PropTypes from 'prop-types'
import styles from './Section.module.css'

export function Section({ title, children }) {
  return (
    <>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.list}>{children}</div>
    </>
  )
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
