import React from 'react'

//Components
import Cards from '../Components/Dashboard/Card/Cards'
import HoldTable from '../Components/Dashboard/DataTables/HoldTable'

//Layouts
import Navbar from '../Components/Dashboard/Layout/Navbar'
import Footer from '../Components/Dashboard/Layout/Footer'

const HoldTickets = () => {
  return (
    <>
    <Navbar/>
    <Cards/>
    <HoldTable/>
    <Footer/>
    </>
  )
}

export default HoldTickets