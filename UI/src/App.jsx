import {Routes , Route} from "react-router-dom"
import './App.css'
import Chat from "./Pages/Chat"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"


function App() {

  return (
    <>
    <Routes>
      <Route path="/"element={<Chat/>} />
      <Route path="/signup"element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>   
    </Routes>
    </>
  )
}

export default App
