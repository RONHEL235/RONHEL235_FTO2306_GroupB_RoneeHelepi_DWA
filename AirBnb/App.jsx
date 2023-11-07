import React from "react"
import Navbar from "../AirBnb/components/Navbar"
import Hero from "../AirBnb/components/Hero"
import Card from "../AirBnb/components/Card"
import data from "../AirBnb/data"

export default function App() {

  const bnbData = data.map((element) =>{
    const { title, price, coverImg, stats, location, openSpots, id } = element
    return (<Card 
    key={id}  
    element={element}
    />
    )
  })

  return (

    <div>
      <Navbar />
      <Hero />
      <div className="cards-list">{bnbData}</div>
    </div>
  )
}