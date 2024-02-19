import {Routes , Route} from "react-router-dom"
import './App.css'
import Chat from "./Pages/Chat"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import NavBar from "./Components/Navbar/NavBar"
import LogOut from "./Pages/LogOut"


function App() {

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/"element={<Chat/>} />
      <Route path="/signup"element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>   
      <Route path="/logout" element={<LogOut/>}/>   

    </Routes>
    </>
  )
}

export default App
