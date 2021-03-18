import React from  'react'
import styles from './Card.module.css'
import cn from 'classnames'

export const Card = (props)=>{
  const {id,image,title,overwiew} = props
  
  return(
    <div className={cn(styles.cardWrapper)}>
        <div className={cn(styles.cardFront,'card')}>
            <img src={image} alt='poster' className={styles.cardPoster}/>
            <span className={styles.cardTitle}>{title}</span>
        </div>
        <div className={cn(styles.cardBack,'card')}>
            <p className={cn(styles.cardOverwiev,'card-text')}>{overwiew}</p>
        </div>
    </div>
  )

}