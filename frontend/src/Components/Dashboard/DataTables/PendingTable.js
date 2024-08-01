  import {useEffect,useState} from 'react';
import Swal from "sweetalert2";
import axios from 'axios';
import defaultImage from './image/no_image.png' 
import {SERVER_URL} from '../../../Services/helper'

const Table = () => {

    const[record,setRecord] = useState([])

    const [modeldata,setModeldata] = useState({
        ticketId:"",
        department:"",
        email: "",
        fullname:"",
        designation: "",
        problem_type:"",
        subject:"",
        description:"",
        priority:"",
        support_needed_on:"",
        message:"",
        holdReason:"",
    })


    const handleInputChange = (e) => {
      e.preventDefault();
      setModeldata({ ...modeldata, [e.target.name]: e.target.value });
    };
   
    // Put this in package.json
    // "proxy": "http://backend-container:1337"

    //Get All Pending Ticket data 
    const getData = async () =>
    {
      await fetch(`${SERVER_URL}/view-data-pending/`)
        .then(resposne=> resposne.json())
        .then(res=>setRecord(res))
    }

    useEffect(() => {
      getData();
    },[])
     
    //Get Pending Ticket data by ID
    const showDetail = async (id) =>
    {
      await fetch(`${SERVER_URL}/view-data/${id}`)
        .then(resposne=> resposne.json())
        .then(res=>setModeldata(res))
    }

    //Update Ticket state by ID and send notify the user with email
    const solveTicket = async (id) =>
    {

      Swal.fire({
        title: 'Is the ticket solved for '+modeldata.fullname+'?',
        text: "You won't be able to revert this once you confirm!",
        type: 'warning',
        showCancelButton: true, 
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result['isConfirmed']){

          axios.put(`${SERVER_URL}/ticketSolved/`+id, modeldata)
          .then((res) => {
            console.log(res.data)
            window.location = "/dashboard";
          }).catch((error) => {
            console.log(error)
          })
        }
        
      })
        
    }

    
    const holdTicket = (id) =>
    {
      Swal.fire({
        title: 'Holding ticket for '+modeldata.fullname+'?',
        text: "You won't be able to revert this once you confirm!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result['isConfirmed']){

          axios.put(`${SERVER_URL}/ticketHold/`+id, modeldata)
          .then((res) => {
            console.log(res.data)
            window.location = "/dashboard";
          }).catch((error) => {
            console.log(error)
          })
        }
        
      })
    }
   

  return (
    <div class="container mt-4">
        <div class="container border shadow row mt-2 ">
            <div class="col-lg-1 col-md-6 col-sm-12"></div>  
            <div class="col-lg-11 col-md-6 col-sm-12">
              <h5 class="mt-3 mb-3 text-secondary" style={{fontWeight:'bold'}}>
               New Support Requests 
              </h5>
                <div class="mt-5">
                    <table class="table table-striped table-sm">
                        <thead class="thead-light">
                          <tr>
                            <th style={{fontWeight:'bold'}}>ID</th>
                            <th style={{fontWeight:'bold'}}>Department</th>
                            <th style={{fontWeight:'bold'}}>Name</th>
                            <th style={{fontWeight:'bold'}}>Issue Type</th>
                            <th style={{fontWeight:'bold'}}>Priority</th>
                            <th style={{fontWeight:'bold'}}>View Details</th>
                          </tr>
                        </thead>
                        <tbody>
                        
                          {record.map((item,index)=>
                            <tr key={index}> 
                              <td>{index + 1}</td>
                              <td>{item.department}</td>
                              <td>{item.fullname}</td>
                              <td>{item.problem_type}</td>
                              <td>{item.priority}</td>
                              <td><button class="btn btn-success" onClick={(e)=>showDetail(item._id)} data-toggle="modal" data-target="#myModal"><i class="fa-regular fa-clipboard fa-xl"></i>&nbsp;&nbsp; Details</button></td>
                            </tr>
                          )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
 
 

      {/* First Model */} 
      <div class="modal fade" aria-hidden="true" id="myModal" >
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-success" style={{fontWeight:'bold'}}>Issue Type : {modeldata.problem_type}</h4>
              <button type="submit" class="btn btn-lg btn-success" onClick={(e)=>solveTicket(modeldata._id)} data-dismiss="modal"><i class="fa-sharp fa-solid fa-check fa-beat fa-lg"></i>&nbsp; Solve Ticket</button>
            </div>
             
            <div class="modal-body">

              <div class="container-sm border shadow mb-4">
                <center><h4 class="mt-3" style={{fontWeight:'bold'}}>Problem Information</h4></center>
               
                <div class="container-sm border rounded border-success shadow-sm mb-4 mt-3">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style={{fontWeight:'bold'}}>Name:</td>
                        <td>{modeldata.fullname}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight:'bold'}}>Department:</td>
                        <td>{modeldata.department}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight:'bold'}}>Designation:</td>
                        <td>{modeldata.designation}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight:'bold'}}>Email:</td>
                        <td>{modeldata.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="container-sm border rounded border-success shadow-sm  mb-4">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style={{fontWeight:'bold'}}>Priority:</td>
                        <td style={{color:'red'}}>{modeldata.priority}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight:'bold'}}>Support Needed by:</td>
                        <td>{modeldata.support_needed_on}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="container-sm border rounded border-success shadow-sm mb-4">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style={{fontWeight:'bold'}}>Subject</td>
                        <td>{modeldata.subject}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight:'bold'}}>Description</td>
                        <td>{modeldata.description}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>



                <div class="container-sm border rounded border-success shadow-sm  mb-4">
                  <p style={{fontWeight:'bold'}}>Image </p>
                    <div class='d-flex justify-content-center mb-3 '>
                      <img src={defaultImage} width="70%" height="220px" />
                    </div>
                </div>
              </div>


              <div class="container-sm border shadow mb-4">
                <center><h4 class="mt-3" style={{fontWeight:'bold'}}>Send Customized Email</h4></center>
                <div class="container-sm mb-4 mt-3">
                  {/* <form> */}
                    <div class="form-group">
                      <a style={{fontWeight:'bold'}}>Recipient's Email</a><br/>
                      <input type="text" class="form-control" name="recipient" value={modeldata.email} onChange={handleInputChange} /><br/>
                    </div>
                    <div class="form-group">
                      <a style={{fontWeight:'bold'}}>Message</a><br/>
                      <textarea class="form-control" rows="3" name="message" value={modeldata.message} onChange={handleInputChange} />
                    </div>
                  {/* </form> */}
                </div>
              </div>

            </div>
                         
            <div class="modal-footer">
              <button type="submit" class="btn btn-warning" data-bs-target="#holdModal" data-bs-toggle="modal" data-bs-dismiss="modal" >Hold</button>
              <button type="submit" class="btn btn-danger" data-dismiss="modal">Cancel</button>
            </div>
             
          </div>
        </div>
      </div>

      {/* Second Modal */}
      <div class="modal fade" id="holdModal" aria-hidden="true" aria-labelledby="holdModal" >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-warning" style={{fontWeight:'bold'}}>Hold Ticket</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="container-sm border shadow mb-4">
                <center><h4 class="mt-3" style={{fontWeight:'bold'}}>Reasons for holding Ticket</h4></center>
                <div class="container-sm mb-4 mt-3">
                  {/* <form> */}
                    <div class="form-group">
                      <a style={{fontWeight:'bold'}}>Recipient's Email</a><br/>
                      <input type="text" class="form-control" name="recipient" value={modeldata.email} onChange={handleInputChange} /><br/>
                    </div>
                    <div class="form-group">
                      <a style={{fontWeight:'bold'}}>Message</a><br/>
                      <textarea class="form-control" rows="3" name="holdReason" value={modeldata.holdReason} onChange={handleInputChange} />
                    </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" data-bs-target="#myModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
              <button class="btn btn-warning"  data-bs-dismiss="modal" onClick={(e)=>holdTicket(modeldata._id)} >Send & Hold Ticket</button>
            </div>
          </div>
        </div>
      </div>
 
 
    </div>
  )
}

export default Table