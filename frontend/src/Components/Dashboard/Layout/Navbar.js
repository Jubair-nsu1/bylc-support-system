import React from 'react'
import {Link, useNavigate} from 'react-router-dom';

const navbar = () => {
    // const auth = localStorage.getItem('user');
    // const navigate = useNavigate();
    

    async function handleLogout(e) {
        localStorage.removeItem("token");
        // navigate('/login');
        window.location = "/login";
    }


  return (
    <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-5">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">BYLC IT SUPPORT</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <Link class="nav-link" to="/dashboard">Home</Link>
                    <Link class="nav-link" to="/solvedtickets">Tickets Solved</Link>
                    <Link class="nav-link" to="/holdtickets">Tickets Hold</Link>
                    <li class="nav-item">
                    <a class="nav-link" href="" onClick={handleLogout}>Logout</a>
                    </li>
                </div>
            </div>

        </div>
    </nav>
  )
}

export default navbar