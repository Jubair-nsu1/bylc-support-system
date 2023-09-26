import {useEffect,useState} from 'react';
import defaultImage from './image/no_image.png' 
import {SERVER_URL} from '../../../Services/helper'

const SolvedTable = () => {
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
    })
   
    const getData = () =>
    {
        fetch(`${SERVER_URL}/view-data-solved/`)
         .then(resposne=> resposne.json())
         .then(res=>setRecord(res))
    }
   
     useEffect(() => {
        getData();
     },[])
     
     const showDetail = (id) =>
     {
       fetch(`${SERVER_URL}/view-data/${id}`)
       .then(resposne=> resposne.json())
       .then(res=>setModeldata(res))
     }

  return (
    <div class="container mt-4">
      <div class="container border shadow row mt-2 ">
        <div class="row mt-2 ">
            <div class="col-lg-1 col-md-6 col-sm-12">
            </div>  
            <div class="col-lg-11 col-md-6 col-sm-12">
              <h5 class="mt-3 mb-3 text-secondary" style={{fontWeight:'bold'}}>
               Supports Given
              </h5>
                <div class=" mt-5">
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
                              <td><button class="btn btn-success" onClick={(e)=>showDetail(item._id)} data-toggle="modal" data-target="#myModal">Get Details</button></td>
                            </tr>
                          )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>  
 
{/* 
 Model Box  */}
 
      <div class="modal" id="myModal">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" style={{fontWeight:'bold'}}>{modeldata.problem_type}</h4><h4 class="modal-title text-success" style={{fontWeight:'bold'}}>[RESOLVED]</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
             
            <div class="modal-body">

            <div class="container-sm border shadow mb-4">
                <center><h4 class="mt-3" style={{fontWeight:'bold'}}>Problem Information</h4></center>
               
                <div class="container-sm border rounded border-success shadow-sm mb-4 mt-3">
                  <p class="mt-3"><a style={{fontWeight:'bold'}}>Name: </a><a>{modeldata.fullname}</a></p>
                  <p><a style={{fontWeight:'bold'}}>Department: </a><a>{modeldata.department}</a></p>
                  <p><a style={{fontWeight:'bold'}}>Designation: </a><a>{modeldata.designation}</a></p>
                  <p><a style={{fontWeight:'bold'}}>Email: </a><a>{modeldata.email}</a></p>
                </div>

                <div class="container-sm border rounded border-success shadow-sm mb-4">
                  <a style={{fontWeight:'bold'}}>Subject </a><br/><p>{modeldata.subject}</p>
                  <a style={{fontWeight:'bold'}}>Description </a><br/><p>{modeldata.description}</p>
                </div>

                <div class="container-sm border rounded border-success shadow-sm  mb-4">
                  <p class="mt-3"><a style={{fontWeight:'bold'}}>Priority: </a><a>{modeldata.priority}</a></p>
                  <p><a style={{fontWeight:'bold'}}>Support Needed by: </a><a>{modeldata.support_needed_on}</a></p>
                </div>

                <div class="container-sm border rounded border-success shadow-sm  mb-4">
                  <p style={{fontWeight:'bold'}}>Image </p>
                    <div class='d-flex justify-content-center mb-3 '>
                      <img src={defaultImage} width="70%" height="220px" />
                    </div>
                </div>
              </div>

            </div>
                      
          </div>
        </div>
      </div>
 
    </div>
  )
}

export default SolvedTable