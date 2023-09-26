import React, { useState } from "react";
import {Login} from '../Components/Login';
import {Register} from '../Components/Register';

const Auth = () => {
    const [currentForm, setCurrentForm] = useState('login');

    // const toggleForm = (formName) => {
    //   setCurrentForm(formName);
    // }

    return (
        <div class="text-center"> 
            {/* {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />} */}
        </div>
    )
}

export default Auth