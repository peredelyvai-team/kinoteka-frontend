import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styles from './SkeletonSection.module.css'

export const SkeletonSection = ({ color, highlightColor }) => {
  return (
    <div className={styles.container}>
      <SkeletonTheme color={color} highlightColor={highlightColor}>
        <Skeleton />
      </SkeletonTheme>
    </div>
  )
}
