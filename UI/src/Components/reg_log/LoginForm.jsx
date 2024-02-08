import axios from 'axios';
import React, { useState } from 'react'

const LoginForm = () => {
    //make a login state hook
const [luser,setLuser] = useState({
    email:"",
    password:""
})
const inputHandeler = (e)=>{
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setLuser({
        ...luser,
        [name]:value
    })
}

// make login form submiter and get the backend and insert or ue the login logic
// to make any backend or fetch process alwwys user acyns or promise method
const loginsubmit= async(e)=>{
    e.preventDefault()
    //get the api for login
    try {
        const responces = await axios.post("http://localhost:2000/login",luser)
        const userData = responces.data 
        if(responces.status == 200)
        {
            console.log("login submiton working ",userData);
        }
        else{
        console.log(userData);
        }
        // const data = responces.data
    } catch (error) {
        console.log('login submiton erroe :',error);
    }
}
  return (
    <div className="formHolder">
      <div className="formContainer">
       <form on onSubmit={loginsubmit}>
          
          <div className="inputField">
            <input
              type="email"
              autoComplete="off"
              name="email"
              placeholder="Enter your email id"
              id="email"
              required
              onChange={inputHandeler}
              value={luser.email}
            />
          </div>
          <div className="inputField">
            <input
              type="password"
              autoComplete="off"
              name="password"
              placeholder="Enter your Password"
              id="password"
              required
              onChange={inputHandeler}
              value={luser.password}
            />
          </div>
          <div className="regButton">
            <button type="submit" id="reg_submit">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm