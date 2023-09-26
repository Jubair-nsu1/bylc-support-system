import {useEffect,useState} from 'react';


// import {useLocation, useNavigate} from 'react-router-dom';

//Dashboard Components

import Navbar from '../Components/Dashboard/Layout/Navbar'
import Sidebar from '../Components/Dashboard/Layout/Sidebar'
import Footer from '../Components/Dashboard/Layout/Footer'
import PendingTable from '../Components/Dashboard/DataTables/PendingTable';
import Cards from '../Components/Dashboard/Card/Cards';


const Dashboard = () => {
    
  return (
  <>
    
    <Navbar/>
    <Cards/>

    <PendingTable/>
    
    <Footer/>
  </>
  )
}

export default Dashboard