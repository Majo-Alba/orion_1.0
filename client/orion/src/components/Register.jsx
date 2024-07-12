import { useState } from "react"
import { Link } from "react-router-dom"

import Footer from "./Footer"

export default function Register() {

    const[userDetails, setUserDetails] = useState({
        nombre:"",
        apellido:"",
        email:"",
        contraseña:""
    })

    const [message, setMessage] = useState({
        type:"invisible-msg",
        text:""
    })

    function handleInput(event) {
        setUserDetails((prevState) => {
            return {...prevState, [event.target.name]:event.target.value}
        })
    }

    function handleSubmit() {
        event.preventDefault();
        // console.log(userDetails)

        fetch('https://orion-backend-z5yv.onrender.com/register', {
        // fetch('http://localhost:4000/register', {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setMessage({type:"success", text:data.message})

            setUserDetails({
                nombre:"",
                apellido:"",
                email:"",
                contraseña:"",
            })

            setTimeout(() => {
                setMessage({type:"invisible-msg", text:"Exit"})
            }, 5000)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <section className="container-register">
            <form className="container-login" onSubmit={handleSubmit}>
                <h1 className="loginWelcome">¡Bienvenido!</h1>
                <h3 className="loginText">Si eres nuevo usuario, regístrate aquí</h3>

                <input className="inp" type="text" required onChange={handleInput} placeholder="Nombre..." name="nombre" value={userDetails.nombre}></input>
                <input className="inp" type="text" required onChange={handleInput} placeholder="Apellido..." name="apellido" value={userDetails.apellido}></input>
                <input className="inp" type="email" required onChange={handleInput} placeholder="Correo Electrónico..." name="email" value={userDetails.email}></input>
                <input className="inp" type="password" required minLength={8} onChange={handleInput} placeholder="Contraseña..." name="contraseña" value={userDetails.contraseña}></input>

                <button className="btn">Registrar</button>
                <p className="introSubNotes">¿Ya estás registrado?  <Link to="/login" className="introLink">Ingresa</Link></p>

                <p className={message.type}>{message.text}</p>
            </form>
            <br></br>
            <Footer/>
        </section>
    )
}
