import React from 'react'
import Hero from './Home/Hero'
import Service from './Home/Service'
import AboutUs from './Home/AboutUs'
import ContactUs from './Home/ContactUs'
import Ourhospitals from './Home/Ourhospitals'

function Home() {
  return (
    <div>
      <Hero/>
      <Service/>
      <AboutUs/>
      <Ourhospitals/>
      <ContactUs/>
    </div>
  )
}

export default Home
