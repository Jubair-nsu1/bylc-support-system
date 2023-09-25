require("dotenv").config();

//Lib
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer");
const isempty = require('lodash.isempty');
const helmet = require('helmet');
const multer = require("multer");

//Files
const Ticket = require('./models/ticket.model')
const Admin = require('./models/admin.model')
const connectDB = require('./config/db')



//---------------------------------------------------------------------------
// middleware
// const corsOptions = {
//     origin: "https://helpdesk.bylc.org", // frontend URI (ReactJS)
// }

//Middleware
const app = express();
app.use(express.urlencoded({ extended : false }) );
app.use(express.json());
app.use(helmet());
app.use(cors());


//Connection to Database
connectDB();


//Routes
// app.use(router)
// app.use('/api/user', require('./routes/userRoutes'));


// -------------- Submitting a Ticket || Send data to database || Send Email 

//Save image uploaded image on disk 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../frontend/src/Uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log("Uploaded!");    
  //  const imageName = req.file.filename;

//   try {
//     await Images.create({ image: imageName });
//     res.json({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
});


app.post('/api/newTicket', async (req, res) => {
	console.log(req.body);
    const  email  = req.body.email;
	//Save Ticket Data to database
	try {
		await Ticket.create({
			department: req.body.department,
			email,
			fullname: req.body.fullname,
			designation: req.body.designation,
			problem_type: req.body.problem_type,
			subject: req.body.subject,
			description: req.body.description,
			priority: req.body.priority,
			support_needed_on: req.body.support_needed_on,
            state:"Pending",
            requestDate: new Date(),
		})
		res.json({ status: 'ok' })
	} 
	catch (err) {
		res.json({ status: 'error', error: 'Cant Process' })
	}

	//------------Email Notification-----------------------
	try {
		//Creating a Mail Transport System
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

		//Sending mail to user
        const mailtoUser = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "IT Support Request",
            html: '<p>Dear '+req.body.fullname+',</p> <p>Greetings!</p> <a>You have requested for a IT support.</a><br> <a>Please have patience until the support is provided.</a><br><br> <a style="font-weight:bold ; font-size:14px">Support Description:</a><br> <a style="color:darkblue ; font-weight:bold">Support Type: </a><a style="color:darkblue">'+req.body.problem_type+'</a><br> <a style="color:darkblue ; font-weight:bold">Priority: </a><a style="color:darkblue">'+req.body.priority+'</a><br> <a style="color:darkblue; font-weight:bold">Support Needed On: </a><a style="color:darkblue">'+req.body.support_needed_on+'</a> <br><br> <a style="font-style: italic ; color:blue">THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL.</a> <br> <p>Regards,</p> <a style="font-weight:bold">IT Department</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Bangladesh Youth Leadership Center</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Medona Tower (Level 12), 28 Mohakhali C/A, Dhaka 1213.</a>'
        };
		
		transporter.sendMail(mailtoUser, (error, info) => {
            if (error) {
                console.log("Error" + error)
				return;
            } else {
                console.log("Successfully Email sent:" + info.response);
       			transporter.close();
                res.status(201).json({status:201,info})
            }
        })

		//Sending mail to admin
		var maillist = [
			'roni@bylc.org',
			'a.k.m.serajus.salehin@bylc.org',
            'jubair421@gmail.com'
		];
		maillist.toString();

		const mailtoAdmin = {
            from: process.env.EMAIL,
            to: maillist,
            subject: "IT Support Request",
            html: '<p>Dear IT Support Team,</p> <p>Greetings!</p> <a>An user have made a IT support request.</a><br> <a>Please check your dashboard for more details.</a><br><br> <a style="font-weight:bold ; font-size:14px">Support Description:</a><br> <a style="color:darkblue ; font-weight:bold">Department: </a><a style="color:darkblue">'+req.body.department+'</a><br> <a style="color:darkblue ; font-weight:bold">Name: </a><a style="color:darkblue">'+req.body.fullname+'</a><br> <a style="color:darkblue ; font-weight:bold">Designation: </a><a style="color:darkblue">'+req.body.designation+'</a><br> <a style="color:darkblue ; font-weight:bold">Support Type: </a><a style="color:darkblue">'+req.body.problem_type+'</a><br> <a style="color:darkblue ; font-weight:bold">Priority: </a><a style="color:darkblue">'+req.body.priority+'</a><br> <a style="color:darkblue; font-weight:bold">Support Needed On: </a><a style="color:darkblue">'+req.body.support_needed_on+'</a> <br><br> <a style="font-style: italic ; color:blue">THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL.</a> <br> <p>Regards,</p> <a style="font-weight:bold">'+req.body.department+'</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Bangladesh Youth Leadership Center</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Medona Tower (Level 12), 28 Mohakhali C/A, Dhaka 1213.</a>'
        };

		transporter.sendMail(mailtoAdmin, (error, info) => {
            if (error) {
                console.log("Error" + error)
				return;
            } else {
                console.log("Successfully Email sent:" + info.response);
       			transporter.close();
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }

})



// -------------- Authentication ----------------------------------------------------------
app.post("/api/register", async (req, res) => {
    const { email, password } = req.body
  
    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
  
    // Check if user exists
    const userExists = await Admin.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await Admin.create({
      email,
      password: hashedPassword,
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Email: '+email+' ; Pass: '+password);
        // Check for user email
        const user = await Admin.findOne({ email })

        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        )

        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                },
                process.env.JWT_SECRET
            )    
            return res.json({ status: 'ok', user: token })
        } 
        else {
            return res.json({ status: 'error', user: false })
        }
    
        // if (user && (await bcrypt.compare(password, user.password)) ) {
        //     _id = user.id,
        //     email= user.email,
        //     token = jwt.sign({ email,_id }, 'abc123');
        //     res.status(200).json({ token })
        //     console.log('Login Success')
        //     console.log(token)
        // } else {
        //     res.status(401).json({ status: 'error', error: 'Cant Process' })
        //     console.log('Unsuccessful Login')
        // }

    } catch (err) {
        res.status(500).json(err);
    }
});




// -------------- DASHBOARD --------------------------------------------------------------- 

// Get all the Pending tickets from DB
app.get("/view-data-pending", async (req, res) => {
    try {
        const query = { state: "Pending" };
        const result = await Ticket.find(query);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all the Solved Tickets tickets from DB
app.get("/view-data-solved", async (req, res) => {
    try {
        const query = { state: "Solved" };
        const result = await Ticket.find(query);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all the Solved Tickets tickets from DB
app.get("/view-data-hold", async (req, res) => {
    try {
        const query = { state: "Hold" };
        const result = await Ticket.find(query);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a pending ticket by ID
app.get("/view-data/:id", async (req, res) => {
    try {
      const result = await Ticket.findById(req.params.id);
      res.status(200).json(result);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});    

//------------------------------- When Ticket is solved -------------------------

app.put("/ticketSolved/:id" , async (req, res) => {
    //Update State
    try{
        const id = req.params.id;
        const updateDoc = {
            $set: {
              state: "Solved"
            },
        };
        const task = await Ticket.updateOne({_id: id}, updateDoc);
        res.status(200).json(task)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

    //Send customized Email
    try{
        const name = req.body.fullname;
        const email = req.body.email;
        const subject = req.body.subject;
        let message = req.body.message;
        
        //Creating a Mail Transport System
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });


        if(isempty(message)) {
            message ="Your Support Ticket has been resolved.";
        }
        
        console.log("Message = "+message);

        //Sending mail to user
        const mailtoUser = {
            from: process.env.EMAIL,
            to: email,
            subject: "IT Support: Your issue has been solved!",
            html: '<p>Dear '+req.body.fullname+',</p> <a>'+message+'</a><br> <a>Thanks for your patience.</a><br><br> <a style="font-weight:bold ; font-size:14px">Support Description:</a><br> <a style="color:darkblue ; font-weight:bold">Support Type: </a><a style="color:darkblue">'+req.body.problem_type+'</a><br> <a style="color:darkblue ; font-weight:bold">Priority: </a><a style="color:darkblue">'+req.body.priority+'</a><br> <a style="color:darkblue; font-weight:bold">Support Needed On: </a><a style="color:darkblue">'+req.body.support_needed_on+'</a> <br><br> <a style="font-style: italic ; color:blue">THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL.</a> <br> <p>Regards,</p> <a style="font-weight:bold">IT Department</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Bangladesh Youth Leadership Center</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Medona Tower (Level 12), 28 Mohakhali C/A, Dhaka 1213.</a>'
        };

        transporter.sendMail(mailtoUser, (error, info) => {
            if (error) {
                console.log("Error" + error)
                return;
            } 
            else {
                console.log("Successfully Email sent:" + info.response);
                transporter.close();
                res.status(201).json({status:201,info})
            }
        })

        //Sending mail to admin
        var maillist = [
            'roni@bylc.org',
            'a.k.m.serajus.salehin@bylc.org',
        ];
        maillist.toString();

        const mailtoAdmin = {
            from: process.env.EMAIL,
            to: maillist,
            subject: "IT Support Request: RESOLVED",
            html: '<p>Dear IT Support Team,</p> <p>Greetings!</p> <a>Your have solved an issue.</a><br><br> <a style="font-weight:bold ; font-size:14px">Support Provided Description:</a><br> <a style="color:darkblue ; font-weight:bold">Department: </a><a style="color:darkblue">'+req.body.department+'</a><br> <a style="color:darkblue ; font-weight:bold">Name: </a><a style="color:darkblue">'+req.body.fullname+'</a><br> <a style="color:darkblue ; font-weight:bold">Designation: </a><a style="color:darkblue">'+req.body.designation+'</a><br> <a style="color:darkblue ; font-weight:bold">Support Type: </a><a style="color:darkblue">'+req.body.problem_type+'</a><br> <a style="color:darkblue ; font-weight:bold">Priority: </a><a style="color:darkblue">'+req.body.priority+'</a><br> <a style="color:darkblue; font-weight:bold">Support Needed On: </a><a style="color:darkblue">'+req.body.support_needed_on+'</a> <br><br> <a style="font-style: italic ; color:blue">THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL.</a> <br> <p>Regards,</p> <a style="font-weight:bold">'+req.body.department+'</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Bangladesh Youth Leadership Center</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Medona Tower (Level 12), 28 Mohakhali C/A, Dhaka 1213.</a>'
        };

        transporter.sendMail(mailtoAdmin, (error, info) => {
            if (error) {
                console.log("Error" + error)
                return;
            } else {
                console.log("Successfully Email sent:" + info.response);
                transporter.close();
                res.status(201).json({status:201,info})
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})

//------------------------------- When Ticket is Hold -------------------------
app.put("/ticketHold/:id" , async (req, res) => {
    //Update State
    try{
        const id = req.params.id;
        const updateDoc = {
            $set: {
              state: "Hold"
            },
        };
        const task = await Ticket.updateOne({_id: id}, updateDoc);
        res.status(200).json(task)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

    //Send customized Email
    try{
        const email = req.body.email;
        const reason = req.body.holdReason;
        
        //Creating a Mail Transport System
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        //Sending mail to user
        const mailtoUser = {
            from: process.env.EMAIL,
            to: email,
            subject: "IT Support: Your issue needs some time to solve",
            html: '<p>Dear '+req.body.fullname+',</p> <a>'+reason+'</a><br> <a>Please wait until you get the solution.</a><br><br> <a style="font-weight:bold ; font-size:14px">Support Description:</a><br> <a style="color:darkblue ; font-weight:bold">Support Type: </a><a style="color:darkblue">'+req.body.problem_type+'</a><br> <a style="color:darkblue ; font-weight:bold">Priority: </a><a style="color:darkblue">'+req.body.priority+'</a><br> <a style="color:darkblue; font-weight:bold">Support Needed On: </a><a style="color:darkblue">'+req.body.support_needed_on+'</a> <br><br> <a style="font-style: italic ; color:blue">THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL.</a> <br> <p>Regards,</p> <a style="font-weight:bold">IT Department</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Bangladesh Youth Leadership Center</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Medona Tower (Level 12), 28 Mohakhali C/A, Dhaka 1213.</a>'
        };

        transporter.sendMail(mailtoUser, (error, info) => {
            if (error) {
                console.log("Error" + error)
                return;
            } 
            else {
                console.log("Successfully Email sent:" + info.response);
                transporter.close();
                res.status(201).json({status:201,info})
            }
        })

        //Sending mail to admin
        var maillist = [
            'roni@bylc.org',
            'a.k.m.serajus.salehin@bylc.org',
        ];
        maillist.toString();

        const mailtoAdmin = {
            from: process.env.EMAIL,
            to: maillist,
            subject: "IT Support Request: Ticket Hold",
            html: '<p>Dear IT Support Team,</p> <p>Greetings!</p> <a>Your have held an issue.</a><br><br> <a style="font-weight:bold ; font-size:14px">Support Provided Description:</a><br> <a style="color:darkblue ; font-weight:bold">Department: </a><a style="color:darkblue">'+req.body.department+'</a><br> <a style="color:darkblue ; font-weight:bold">Name: </a><a style="color:darkblue">'+req.body.fullname+'</a><br> <a style="color:darkblue ; font-weight:bold">Designation: </a><a style="color:darkblue">'+req.body.designation+'</a><br> <a style="color:darkblue ; font-weight:bold">Support Type: </a><a style="color:darkblue">'+req.body.problem_type+'</a><br> <a style="color:darkblue ; font-weight:bold">Priority: </a><a style="color:darkblue">'+req.body.priority+'</a><br> <a style="color:darkblue; font-weight:bold">Support Needed On: </a><a style="color:darkblue">'+req.body.support_needed_on+'</a> <br><br> <a style="font-style: italic ; color:blue">THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL.</a> <br> <p>Regards,</p> <a style="font-weight:bold">'+req.body.department+'</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Bangladesh Youth Leadership Center</a><br><a style="font-style: italic ; font-size:12px ; font-color:lightgrey">Medona Tower (Level 12), 28 Mohakhali C/A, Dhaka 1213.</a>'
        };

        transporter.sendMail(mailtoAdmin, (error, info) => {
            if (error) {
                console.log("Error" + error)
                return;
            } else {
                console.log("Successfully Email sent:" + info.response);
                transporter.close();
                res.status(201).json({status:201,info})
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})

//------------------------------------- Tickets Count -------------------------
// Count total tickets
app.get("/totalTickets", async (req, res) => {
    try {
      const ticketCount = await Ticket.countDocuments();
      res.status(200).json(ticketCount);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}); 

// Count pending tickets
app.get("/pendingTickets", async (req, res) => {
    try {
        const query = { state: "Pending" };
        const pendingTicketCount = await Ticket.countDocuments(query);
        res.status(200).json(pendingTicketCount);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}); 

// Count solved tickets
app.get("/solvedTickets", async (req, res) => {
    try {
        const query = { state: "Solved" };
        const completedTicketCount = await Ticket.countDocuments(query);
        res.status(200).json(completedTicketCount);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}); 

// Count hold tickets
app.get("/holdTickets", async (req, res) => {
    try {
        const query = { state: "Hold" };
        const completedTicketCount = await Ticket.countDocuments(query);
        res.status(200).json(completedTicketCount);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}); 



app.listen(1337,() =>{
    console.log('Server started at 1337')
}) 