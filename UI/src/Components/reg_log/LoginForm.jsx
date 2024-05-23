import axios from "axios";
import React, { useState } from "react";
import { AuthUser } from "../../AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  //make a login state hook
  const [luser, setLuser] = useState({
    email: "siji1234@gmail.com",
    password: "siji1234",
  });
  console.log(luser);
  const inputHandeler = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    // let name = e.target.name;
    // let value = e.target.value;
    setLuser({
      ...luser,
      [name]: value,
    });
  };
  const { storeToken ,setUserIdToLS} = AuthUser();
  const navigate = useNavigate();
  // make login form submiter and get the backend and insert or ue the login logic
  // to make any backend or fetch process alwwys user acyns or promise method
  const loginsubmit = async (e) => {
    e.preventDefault();
    //get the api for login
    try {
      const responces = await axios.post(
        "http://localhost:2000/login",
        luser,
        {
          headers: {
            "Content-Type": "application/json",
            // Additional headers if needed...
          },
        }
      );

      const userData =responces.data;
    
    console.log(userData);
      if(responces.status== 200) {
        storeToken(userData.token);
        setUserIdToLS(userData.userId)
        setLuser({
          email: "",
          password: "",
        });
        alert("login sucessful")
        console.log("login submiton working ", userData);
        navigate("/");
      }
     
      // const data = responces.data
    } catch (error) {
      alert(error.response.data.message)
      console.log("login submiton erroe :",error);
    
    
    }
  };
  return (
    <div className="formHolder">
      <div className="formContainer">
        <form onSubmit={loginsubmit}>
          <div className="inputField">
            <input
              type="email"
              autoComplete="off"
              name="email"
              placeholder="Enter your email id"
              id="email"
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
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
