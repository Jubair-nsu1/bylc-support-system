import './LoginUI.css'
import logo from './bylclogo.png'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../Components/Spinner';
import {SERVER_URL} from '../../Services/helper'

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    // const navigate = useNavigate();


    // async function loginSubmit(event) {
    async function loginSubmit(event) {
        event.preventDefault();
        
        const userData = {
            email,
            password,
        }
                  
        // Send login request to backend
        try{
            const response = await fetch(`${SERVER_URL}/api/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              });
            
              const data = await response.json()
              if (data.user) {
                  localStorage.setItem('token', data.user)
                
                    toast.success('Success Notification !', {
                        position: toast.POSITION.TOP_RIGHT
                    });

                  window.location = "/dashboard";
                  
              } 
              else {
                  alert('Please check your username and password')
              }  

        } catch (error) {
            console.log(error);
        }
    }

    // if (isLoading) {
    //     return <Spinner />
    // }


  return (
    <MDBContainer className="my-5">
    <MDBCard>
    <MDBRow className='g-0'>
        <MDBCol md='6'>
            <MDBCardImage src='https://images.unsplash.com/photo-1602837385569-08ac19ec83af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1852&q=80' alt="login form" className='rounded-start w-100'/>
        </MDBCol>

        <MDBCol md='6'>
        <MDBCardBody className='d-flex flex-column'>

            {/* LOGO */}
            <div class='d-flex justify-content-center mb-3'>
                <img src={logo} width="180px" height="45px" />
            </div>
            <h4 class="d-flex justify-content-center mb-5 bg-success text-white">IT SUPPORT SYSTEM</h4>

            <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

            <form id="form" onSubmit={loginSubmit}>
                <MDBInput wrapperClass='mb-4' 
                    label='Email address'
                    type='email' 
                    size="lg"
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
                <MDBInput wrapperClass='mb-4' 
                    label='Password' 
                    type='password' 
                    size="lg"
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
            </form>
            <MDBBtn type='submit' form="form" className="mb-4 px-5" color='dark' size='lg' >Login</MDBBtn>
           
            <a className="small text-muted" href="#!">Forgot password?</a>

            <div className='d-flex flex-row justify-content-center'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
            </div>

            <div className="text-center">
                <p>------------------</p>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>
            </div>

        </MDBCardBody>
        </MDBCol>
    </MDBRow>
    </MDBCard>

    </MDBContainer>
  )
}

export default Login