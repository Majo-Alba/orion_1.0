import './App.css'
import Projects from './components/Projects'
//NEW
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Notfound from './components/NotFound'
import NewProject from './components/NewProject'
// NEW FEB17
// import ProjectEdit from './components/ProjectEdit'
import ProjectUpdate from './components/ProjectUpdate'
// import ProjectModif from './components/ProjectModif'
// END FEB17

import MainProjects from './components/MainProjects'
import StarterIsland from './components/StarterIslands'

// NEW JUN04
import Accounting from './components/Accounting'
// END JUN04

import { UserContext } from './contexts/UserContext'
import { useState } from 'react'
import Private from './components/Private'
//END

// NEW JUN07
import Chart from "react-apexcharts"
import ApexCharts from 'apexcharts'
// END JUN08

function App() {

  const [loggedUser, setLoggedUser] = useState(localStorage.getItem("orion-user"))

  return (
    <>
      <UserContext.Provider value = {{loggedUser,setLoggedUser}}>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            {/* <Route path='/main' element={<Private Component={Projects}/>}/> */}
            <Route path='/main' element={<Private Component={MainProjects}/>}/>
            <Route path='/initial' element={<Private Component={StarterIsland}/>}/>
            <Route path='/project' element={<Private Component={NewProject}/>}/>
            <Route path='/updateProject' element={<ProjectUpdate/>}/>

            {/* NEW JUN04 */}
            <Route path='/accounting' element={<Private Component={Accounting}/>}/>
            {/* END JUN04 */}

            <Route path='*' element={<Notfound/>}/>
          </Routes>
        </BrowserRouter>
        
      </UserContext.Provider>
    </>
  )
  
}



export default App
