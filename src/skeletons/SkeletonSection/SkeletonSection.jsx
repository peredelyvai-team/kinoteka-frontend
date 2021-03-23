import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styles from './SkeletonSection.module.css'

export const SkeletonSection = ({ color, highlightColor }) => {
  return (
    <div className={styles.container}>
      <SkeletonTheme color={color} highlightColor={highlightColor}>
        <Skeleton
          width={'10rem'}
          height={'15rem'}
          className={styles.card}
          style={{ borderRadius: '5px 5px 5px 5px/25px 25px 25px 5px' }}
        />
      </SkeletonTheme>
    </div>
  )
}
