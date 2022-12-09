import React from 'react'
import { motion, Variants } from 'framer-motion'
import { styles } from './logoLoader.css'

export const LogoLoader = (): JSX.Element => {
  const letters = Array.from('LOADING...')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.04 * i,
      },
    }),
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      x: 0,
    },
    hidden: {
      opacity: 0,
      x: -20,
    },
  }

  return (
    <motion.div
      className={styles.logoContainer}
      variants={container}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          // transition={{
          //   type: 'spring',
          //   duration: 0.5,
          //   damping: 12,
          //   stiffness: 100,
          //   repeat: Infinity,
          //   repeatType: 'reverse',
          // }}
          key={index}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}
