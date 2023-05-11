import React from 'react'

import { motion } from 'framer-motion'

import HomeLogo from '../../assets/logo-home.svg'
import CategoryCarousel from '../../components/CategoryCarousel'
import OffersCarousel from '../../components/OffersCarousel'
import { Container, HomeImg } from './style'

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.4 }
      }}
      exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.4 } }}
    >
      <Container>
        <HomeImg src={HomeLogo} alt="Logo-home" />
        <CategoryCarousel />
        <OffersCarousel />
      </Container>
    </motion.div>
  )
}

export default Home
