import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SignIn from './Pages/LoginPage';
import { BrowserRouter as Router, Route,Routes,Link } from "react-router-dom";
import AcceuilPage from './Pages/AcceuilPage';
import { useNavigate } from "react-router-dom";
import StickyHeadTable from './Components/StickyHeadTable';
import FormDialog from './Pages/AddUser';
function App() {
  /*<Route path='/' element={<FormDialog />}/>*/

  return (
    <div className="App">
      
      <Routes>
      
      <Route path='/' element={<SignIn />}/>
  <Route path='/dispaly' element={<StickyHeadTable/>}/>
  <Route path='/add' element={<FormDialog/>}/>
    </Routes>
      
    </div>
  )
}

export default App
//http://localhost:5173/