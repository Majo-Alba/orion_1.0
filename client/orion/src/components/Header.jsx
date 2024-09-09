import { UserContext } from '../contexts/UserContext'
import { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import cdeLogo from '../assets/images/cde-logo.png'

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function Header() {

  const loggedData = useContext(UserContext)
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("orion-user")
    loggedData.setLoggedUser(null)
  }

  function goHome() {
    navigate("/main")
  }

    return (
      <nav className="nav-bar">
      <img className="headerLogo" onClick={goHome}style={{height:'85px', width:'85px'}}src={cdeLogo} alt="logo" />
      {/* <img onClick={goHome}style={{height:'70px', width:'70px'}}src={cdeLogo} alt="logo" /> */}
      <ul>
        <li><a href= "/main">Inicio</a></li>
        <li><a href= "/accounting">Contable</a></li>
        <li><a href= "/clients">Cliente</a></li>
        <li><a href= "/invoicer">Cotizador</a></li>        
        {/* <li onClick={logout}><a href="/login">Salir <FontAwesomeIcon icon={faArrowRightFromBracket} /></a></li> */}
        <li onClick={logout}><a href="/login"><FontAwesomeIcon icon={faArrowRightFromBracket} /></a></li>
      </ul>
    </nav>
    )
}