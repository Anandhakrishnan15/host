import {Routes , Route} from "react-router-dom"
import './App.css'
import Chat from "./Pages/Chat"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import NavBar from "./Components/Navbar/NavBar"


function App() {

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/"element={<Chat/>} />
      <Route path="/signup"element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>   
    </Routes>
    </>
  )
}

export default App
