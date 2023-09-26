import React from 'react'

//Components
import Cards from '../Components/Dashboard/Card/Cards'
import SolvedTable from '../Components/Dashboard/DataTables/SolvedTable'

//Layouts
import Navbar from '../Components/Dashboard/Layout/Navbar'
import Sidebar from '../Components/Dashboard/Layout/Sidebar'
import Footer from '../Components/Dashboard/Layout/Footer'

const SolvedTickets = () => {
  return (
    <>
    <Navbar/>
    <Cards/>
    <SolvedTable/>
    <Footer/>
    </>
  )
}

export default SolvedTickets