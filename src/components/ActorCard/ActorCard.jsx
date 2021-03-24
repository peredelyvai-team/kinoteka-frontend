import React from 'react'
import PropTypes from 'prop-types'
import styles from './ActorCard.module.css'

export const ActorCard = ({ actorName, actorPhoto, actorRole }) => {
  return (
    <div className={styles.cardWrapper}>
      <img src={actorPhoto} alt='actor_photo' className={styles.cardPoster} />
      <span className={styles.title}>{actorName}</span>
      <span className={styles.subtitle}>{actorRole}</span>
    </div>
  )
}

ActorCard.propTypes = {
  actorName: PropTypes.string,
  actorPhoto: PropTypes.string,
  actorRole: PropTypes.string,
}
