import React from 'react'
import { motion } from 'framer-motion'
import { styles } from './logoLoader.css'

export const LogoLoader = (): JSX.Element => {
  const letters = Array.from('JORIS POGGIOLI')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.04 * i,
      },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: 0.5,
        yoyo: Infinity,
        ease: 'easeInOut',
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: 0.5,
        yoyo: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className={styles.logoContainer}
      variants={container}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, yoyo: Infinity, ease: 'easeInOut' }}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}
