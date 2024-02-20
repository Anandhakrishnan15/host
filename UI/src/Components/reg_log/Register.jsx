import React, { useState } from "react";
import axios from "axios";
import { AuthUser } from "../../AuthContext/AuthProvider";
const Register = () => {
  // make a state hook to collect the valised from the input
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  // make ainput handeler
  const inputHandeler = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
   
    const { storeToken} = AuthUser()

  //make a registeration submit funtion to submit all the inputs
  const registerationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2000/register", user);
      // Handle the response from the server (e.g., show a success message)
      console.log("subtion working");
      const data = response.data;
      console.log("Registration successful:", data);
      if (response.status == 200){

        storeToken(data.token)

        setUser({
          username: "",
          email: "",
          password: "",
          phone: "",
        });
      }
    } catch (error) {
      const er = error.response.data
      alert(er.message)
      console.log("submition register failed", error.response.data);
    }
  };
  return (
    <div className="formHolder">
      <div className="formContainer">
        <form onSubmit={registerationSubmit}>
          <div className="inputField">
            <input
              type="text"
              autoComplete="off"
              name="username"
              placeholder="Enter your username"
              id="username"
              required
              onChange={inputHandeler}
              value={user.username}
            />
          </div>
          <div className="inputField">
            <input
              type="email"
              autoComplete="off"
              name="email"
              placeholder="Enter your email id"
              id="email"
              required
              onChange={inputHandeler}
              value={user.email}
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
              value={user.password}
            />
          </div>
          <div className="inputField">
            <input
              type="phone"
              autoComplete="off"
              name="phone"
              placeholder="Enter your Password"
              id="phone"
              required
              onChange={inputHandeler}
              value={user.phone}
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
  );
};

export default Register;
