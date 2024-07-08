import { useState } from "react"
import { Link } from "react-router-dom"

import { faHouse, faFileInvoice, faUser, faCalculator, faGear, faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Footer from "./Footer"

export default function StarterIsland() {
    return (
        <section>
            <h1 className="welcomeSign">ORION</h1>
            <h2 className="welcomeSlogan">Trazando el rumbo <br></br>de tu negocio</h2>
            {/* <nav className="menu"> */}
            <nav>
                <input className="menu-toggler" type="checkbox"/>
                <label htmlFor="menu-toggler"></label>
                {/* <label className="welcomeSign">Bienvenido</label> */}
                <ul>
                    <li className="menu-item">
                        <a className="fas fa-cat" href="/main"><FontAwesomeIcon icon={faHouse}/></a>
                        {/* <label className="menuTags">Inicio</label> */}
                    </li>
                    <li className="menu-item">
                        <a className="fas fa-cat" href="/accounting"><FontAwesomeIcon icon={faMoneyBillTransfer}/></a>
                        {/* <label className="menuTags">Contable</label> */}
                    </li>
                    <li className="menu-item">
                        <a className="fas fa-cat" href="*"><FontAwesomeIcon icon={faUser}/></a>
                        {/* <label className="menuTags">Clientes</label> */}
                    </li>
                    <li className="menu-item">
                        <a className="fas fa-cat" href="*"><FontAwesomeIcon icon={faCalculator}/></a>
                        {/* <label className="menuTags">Cotizador</label> */}
                    </li>
                    <li className="menu-item">
                        <a className="fas fa-cat" href="*"><FontAwesomeIcon icon={faGear}/></a>
                        {/* <label className="menuTags">Ajustes</label> */}
                    </li>
                    <li className="menu-item">
                        <a className="fas fa-cat" href="/project"><FontAwesomeIcon icon={faFileInvoice}/></a>
                        {/* <label className="menuTags">Agregar Proyecto</label> */}
                    </li>
                </ul>
            </nav>
            <br></br>
            <Footer/>
        </section>  
    )
}