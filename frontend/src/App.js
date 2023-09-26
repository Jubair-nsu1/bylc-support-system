import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


//Pages
import Dashboard from './Pages/Dashboard';
import Form from './Pages/Form';
import SolvedTickets from './Pages/SolvedTickets';
import HoldTickets from './Pages/HoldTickets';
import Login from './Pages/Login/Login';

function App() {
  const user = localStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/login" element={<Login />} />
          
          {user? (<Route path="/dashboard" element={<Dashboard />} />) : (<Route path="/dashboard" element={<Navigate replace to="/login" />} />)  }
          {user? (<Route path="/solvedtickets" element={<SolvedTickets />} />) : (<Route path="/solvedtickets" element={<Navigate replace to="/login" />} />)  }
          {user? (<Route path="/holdtickets" element={<HoldTickets />} />) : (<Route path="/holdtickets" element={<Navigate replace to="/login" />} />)  }

          {/*          
          {user  && <Route path="/solvedtickets" element={<SolvedTickets />} /> }          
          {user  && <Route path="/holdtickets" element={<HoldTickets />} /> }
           */}
          
        </Routes>
      </BrowserRouter>
    </div>  
  );
}

export default App;
