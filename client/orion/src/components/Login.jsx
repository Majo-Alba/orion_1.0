import { useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link, useNavigate } from "react-router-dom"

import Footer from "./Footer"


export default function Login() {

    const loggedData = useContext(UserContext)

    const navigate = useNavigate()

    const [userCreds, setUserCreds] = useState({
        email:"",
        contraseña:""
    })

    const [message, setMessage] = useState({
        type:"invisible-msg",
        test:"Exit"
    })

    function handleInput(event) {
        setUserCreds((prevState) => {
            return{...prevState, [event.target.name]:event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(userCreds)
        
        fetch('https://orion-backend-z5yv.onrender.com/login', {
        // fetch('http://localhost:4000/login', {
            method:"POST",
            body: JSON.stringify(userCreds),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then((response) => {
            if(response.status === 404) {
                setMessage({type: "error", text:"El usuario no se encontró"})
            }
            else if (response.status === 403) {
                setMessage({type: "error", text:"Contraseña incorrecta!"})
            }

            setTimeout(() => {
                setMessage({type:"invisible-msg", text:"Exit"})
            },5000)

            return response.json()

        })
        .then((data) => {
            if(data.token !== undefined) {
                localStorage.setItem("orion-user", JSON.stringify(data))

                loggedData.setLoggedUser(data)

                navigate("/main")
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <section className="container-initial">
            <form className="container-login" onSubmit={handleSubmit}>
                <h1 className="loginWelcome">¡Bienvenido!</h1>
                <h3 className="loginText">Inicia tu sesión de Orion</h3>

                <input className="inp" required type="email" onChange={handleInput} placeholder="Correo Electrónico..." name="email" value={userCreds.email}></input>
                <input className="inp" minLength={8} type="password" onChange={handleInput} placeholder="Contraseña..." name="contraseña" value={userCreds.contraseña}></input>

                <button className="btn">Entrar</button>
                <p className="introSubNotes">¿Aún no te registras?  <Link to="/register" className="introLink">Crea una cuenta</Link></p>

                <p className={message.type}>{message.text}</p>
            </form>
            <br></br>
            <Footer/>
        </section>

        // <section className="container">
        // <form className="form" onSubmit={handleSubmit}>
        //     <h1>¡Bienvenido!</h1>
        //     {/* <h3>Entra a tu portal</h3> */}

        //     <input className="inp" required type="email" onChange={handleInput} placeholder="Correo Electrónico..." name="email" value={userCreds.email}></input>
        //     <input className="inp" minLength={8} type="password" onChange={handleInput} placeholder="Contraseña..." name="contraseña" value={userCreds.contraseña}></input>

        //     <button className="btn">Entrar</button>
        //     <p>¿Aún no te registras? ? <Link to="/register">Crea una cuenta</Link></p>

        //     <p className={message.type}>{message.text}</p>
        // </form>
        // </section>
    )
    
}
