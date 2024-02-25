import { useState , useEffect , useRef  } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import RingLoader from "react-spinners/RingLoader";
import { Editor } from "@tinymce/tinymce-react";


//Images
import logo from '../Images/logo.png';
import form_bg3 from '../Images/form_bg3.jpg';
import laptop from '../Images/laptop.jpg'
//CSS
import '../form.css'
//Components
import Footer from "../Components/Dashboard/Layout/Footer";
import {SERVER_URL} from '../Services/helper'


const Form = (props) => 
{
  //Values & Set Values
  const [department,setDepartment] = useState('');
  const [email,setEmail] = useState('');
  const [fullname,setFullname] = useState('');
  const [designation,setDesignation] = useState('');
  const [problem_type,setProblem_type] = useState('');
  const [subject,setSubject] = useState('');
  const [description,setDescription] = useState('');
  const [priority,setPriority] = useState('');
  const [support_needed_on,setSupport_needed_on] = useState('');
  const [image,setImage] = useState('');
  //End of Testing

  // const [values, setValues] = useState({
  //   department:"",
  //   email: "",
  //   fullname:"",
  //   designation: "",
  //   subject:"",
  //   description:"",
  //   priority:"",
  //   support_needed_on:"",
  // });

  // const handleInputChange = (event) => {
  //   event.preventDefault();

  //   const { name, value } = event.target;
  //   setValues((values) => ({
  //     ...values,
  //     [name]: value
  //   }));
  
  // };

  //Textarea with Editor
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid]     = useState(false);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  //Email Validator
  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@bylc.org$/i;
    if (!emailRegex.test(email)) {
        setError('Please enter your valid BYLC email');
    } else {
        setError('');
    }
  };

  useEffect(() => {
      validateEmail();
  }, [email]);

  // Send table data to DB || Email notification || Submitted Page
  async function TicketSubmit(e) {
    e.preventDefault();
    
    // if (values.department && values.email && values.fullname && values.designation && values.subject && values.description  && values.support_needed_on) {
    if (department && email && fullname && designation && problem_type && subject && description  && support_needed_on) {  
      setValid(true);
      setLoading(true);

      // Uploading image 
      // const formData = new FormData();
      // formData.append("image", image);

      // let TicketData = {
      //   department,
      //   email,
      //   fullname,
      //   designation,
      //   problem_type,
      //   subject,
      //   description,
      //   priority,
      //   support_needed_on,
      // }

      const response  = await fetch(`${SERVER_URL}/api/newTicket`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          department,
          email,
          fullname,
          designation,
          problem_type,
          subject,
          description,
          priority,
          support_needed_on,
          image,
        }),
      })
      const data = await response.json()
      console.log(data);
    

      // const result = await axios.post("http://localhost:1337/upload-image",formData);
      // const result = await axios.post("http://localhost:1337/api/newTicket",formData, TicketData);
    }

    //Set Form submitted true
    setSubmitted(true);
    setLoading(false);
  };



  return (
    <>
    <div class="container shadow-lg p-3 mt-5 mb-5 bg-white rounded" style={{ backgroundImage: `url(${form_bg3})` }}>
        <form onSubmit={TicketSubmit}>
          
          {/* LOGO */}
          <div class='d-flex justify-content-center mb-3'>
            <img src={logo} width="180px" height="45px" />
          </div>
          <h4 class="d-flex justify-content-center mb-5 bg-success text-white">IT Support Request</h4>

          {/* Clicking Submit button shows a Welcome Message */}
          {!loading && 
            submitted && valid && (
              <div className="success-message mb-3">   
                <h1 style={{fontWeight:'bold' }}>
                  {" "}
                  Thank You {fullname} ! {" "}
                </h1>
                <div class='d-flex justify-content-center mb-3 circle '>
                  <img src={laptop} width="80%" height="400px" />
                </div>
                <div> Your query has been submitted. </div>
                <div> Please wait for the support. </div>
                <div> Check your email for support details and follow-up. </div>
              </div>
            )
          }
          {loading && 
            // <div class="d-flex justify-content-center">Please Wait.....</div>
            <div class="d-flex justify-content-center">
              <RingLoader
                color="#36d7b7"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={1}
              />
            </div>
          }

          {/* Form Starts */}
          <div class="row">
              <div class="col-md-6">
                  {!valid && (
                  <div>
                    <label class="form-label"><i class="fa-solid fa-users"></i> Department</label>
                    <div class="input-group mb-3">
                      <select class="form-select" name="department" value={department} onChange={e => setDepartment(e.target.value)}>
                        <option selected>Select Department</option>
                          <option value="HRMD" >HRMD</option>
                          <option value="Finance" >Finance and Accounts</option>
                          <option value="Administration" >Administration</option>		 
                          <option value="Procurement" >Procurement</option>
                          <option value="Marcom" >Marketing & Communication</option>
                          <option value="Ventures" >Ventures</option>
                          <option value="Grants" >Grants</option>
                          <option value="BYLCx" >BYLCx</option>
                          <option value="OPD" >OPD</option>
                          <option value="LDT" >LDT</option>
                          <option value="PDT" >PDT</option>
                          <option value="BIJOYEE PROJECT" >USAID BIJOYEE PROJECT</option>
                      </select>
                    </div>
                  </div>
                  )}

                  {submitted && !department && (
                    <span id="department-error">Please select your department</span>
                  )}
									
              </div>

              <div class="col-md-6">
                
                {!valid && (
                <div>
                  <label for="exampleInputEmail1" class="form-label"><i class="fa-solid fa-envelope"></i> Email</label>
                  <input type="email" class="form-control" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                )}
                {submitted && !email && (
                  <span id="email-error">Please enter your email</span>
                )}
                {submitted && email && error && (
                  <span id="email-error">{error}</span>
                )}

              </div>
          </div>

          <div class="row mb-4">
              <div class="col-md-6">
                {!valid && (
                  <div>
                    <label class="form-label"><i class="fa-solid fa-user"></i> Name</label>
                    <input type="text" class="form-control" name="fullname" value={fullname} onChange={e => setFullname(e.target.value)} />
                  </div>
                )}
                {submitted && !fullname && (
                  <span id="name-error">Please enter your name</span>
                )}
              </div>

              <div class="col-md-6">
              {!valid && (
                <div>
                  <label class="form-label"><i class="fa-solid fa-user-tie"></i> Designation</label>
									<div class="input-group mb-3">
										<select class="form-select"  name="designation" value={designation} onChange={e => setDesignation(e.target.value)}>
										  <option selected>Select Designation</option>
										    <option value="ED" >Executive Director</option>
                        <option value="Senior Manager" >Senior Manager</option>
                        <option value="Manager" >Manager</option>		 
                        <option value="Deputy Manager" >Deputy Manager</option>
                        <option value="Assistant Manager" >Assistant Manager</option>
                        <option value="Senior Executive" >Senior Executive</option>
                        <option value="Executive" >Executive</option>
                        <option value="Junior Executive" >Junior Executive</option>
                        <option value="Intern" >Intern</option>
										</select>
									</div>
                </div>
                )}
                {submitted && !designation && (
                  <span id="designation-error">Please select your designation</span>
                )}
              </div>
          </div>

          <div class="row">
              <div class="col-md-6">
                {!valid && (
                  <div>
                    <label class="form-label"><i class="fa-solid fa-server"></i> Type of Support</label>
                    <div class="input-group mb-3">
                      <select class="form-select" name="problem_type" value={problem_type} onChange={e => setProblem_type(e.target.value)}>
                        <option selected>Select Support Type</option>
                          <option value="Product Requisition" >Product Requisition</option>
                          <option value="Employee Onboarding" >Employee Onboarding</option>
                          <option value="Hardware Repair" >Hardware Repair</option>
                          <option value="Software Issue" >Software Issue</option>
                          <option value="Internet" >Internet</option>
                          <option value="Printer" >Printer</option>
                          <option value="Others" >Others</option>
                      </select>
                    </div>
                  </div>
                )}
                {submitted && !problem_type && (
                  <span id="problem_type-error">Please select your problem type</span>
                )}
									
              </div>
          </div>

          <div class="mb-3">
            {!valid && (
              <div>
                <label class="form-check-label"><i class="fa-solid fa-pen-clip"></i> Subject</label>
                <input type="text" class="form-control" name="subject" value={subject} onChange={e => setSubject(e.target.value)} />
              </div>
            )}
            {submitted && !subject && (
              <span id="subject-error">Please enter the subject</span>
            )}
          </div> 

          {/* <div class="form-group mb-3">
            {!valid && (
            <div>
              <label class="form-check-label"><i class="fa-solid fa-newspaper"></i> Description</label>
              <textarea class="form-control" rows="4" name="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            )}
            {submitted && !description && (
              <span id="description-error">Please enter the description</span>
            )}
          </div>  */}

          <div class="form-group mb-3">
            {!valid && (
            <div>
              <label class="form-check-label"><i class="fa-solid fa-newspaper"></i> Description</label>
              <Editor
                apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                // class="form-control"
                onInit={(evt, editor) => (editorRef.current = editor)}
                name="description"
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}

                value={description} 
                // onChange={e => setDescription(e.target.value)}
                onEditorChange={(value, editor) => {setDescription(value)}}
              />
            </div>
            )}
            {submitted && !description && (
              <span id="description-error">Please enter the description</span>
            )}
          </div>

          <div class="row mb-4 mb-2">
              <div class="col-md-6">
                {!valid && (
                <div>
                  <label class="form-label"><i class="fa-solid fa-meteor"></i> Priority </label>
                  <div class="form-row">
                    <div id="radio" value={priority} onChange={e => setPriority(e.target.value)}>
                      <div class="row">
                        <div class="col-md-4">
                          <input type="radio" name="priority" value="High" /> <a>High</a>
                        </div>
                        <div class="col-md-4">
                          <input type="radio" name="priority" value="Medium" /> <a>Medium</a>
                        </div>
                        <div class="col-md-4">
                          <input type="radio" name="priority" value="Low" /> <a>Low</a>
                        </div>
                      </div>
                    </div>
                  </div>	
                </div>
                )}
                {submitted && !priority && (
                  <span id="description-error">Please select your priority</span>
                )}
              </div>

              <div class="col-md-6">
                {!valid && (
                  <div>
                    <label class="form-label"><i class="fa-solid fa-calendar-days"></i> Support Needed By</label>
                    <div class="input-group date" id="datepicker">
                      <input type="date" class="form-control" name="support_needed_on" value={support_needed_on} onChange={e => setSupport_needed_on(e.target.value)}/>	
                    </div>
                  </div>
                )}
                {submitted && !support_needed_on && (
                  <span id="support_needed-error">Please select the Support Needed On date</span>
                )}
              </div>
          </div>  

          <div class="mb-5">
            {!valid && (
              <div>
                <label class="form-label"><i class="fa-solid fa-image"></i> Upload Pictures (If any) </label>
                <input class="form-control" type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}/>
              </div>
            )}
          </div>

          <div class="d-grid gap-2 col-6 mx-auto mb-3">
            {!valid && (
              <button style={{fontWeight:'bold'}} class="btn btn-success btn-lg" type="submit"><i class="fa-solid fa-paper-plane fa-beat fa-lg"></i>&nbsp;&nbsp; Submit</button>
            )}
          </div>

        </form> 
    </div>

    <div>
        <Footer/>
        </div>
    </>
  )
}

export default Form