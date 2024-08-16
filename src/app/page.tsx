'use client'

import { useRef } from 'react'
import {
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
} from './_components/sections'

function Home() {
  const section2Ref = useRef<HTMLElement>(null)

  const scrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      <Section1 scrollToSection2={scrollToSection2} />
      <Section2 ref={section2Ref} />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  )
}

export default Home
