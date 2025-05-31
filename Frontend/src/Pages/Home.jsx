import React from 'react'
import { Hero } from '../Components/Layout/Hero'
import GenderCollectionSection from '../Components/Products/GenderCollectionSection'
import NewArrival from '../Components/Products/NewArrival'

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrival/>
    </div>
  )
}

export default Home
