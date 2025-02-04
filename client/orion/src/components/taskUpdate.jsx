import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"
import React from "react";


import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";

// NEW APR26
import emailjs from '@emailjs/browser'
import { set } from "mongoose";
// END APR26


export default function TaskUpdate() {

    const location = useLocation()

    const [prioridadTarea, setPrioridadTarea] = useState("")
    const [nombreTarea, setNombreTarea] = useState("")
    const [descripcionTarea, setDescripcionTarea] = useState("")
    const [encargadoTarea, setEncargadoTarea] = useState("")
    const [fechaAsignacion, setFechaAsignacion] = useState("")
    const [clienteTarea, setClienteTarea] = useState("")
    const [estatusTarea, setEstatusTarea] = useState("")

    useEffect(() => {
        console.log(location)
        setPrioridadTarea(location.state?.prioridadTarea)
        setNombreTarea(location.state?.nombreTarea)
        setDescripcionTarea(location.state?.descripcionTarea)
        setEncargadoTarea(location.state?.encargadoTarea)
        setFechaAsignacion(location.state?.fechaAsignacion)
        setClienteTarea(location.state?.clienteTarea)
        setEstatusTarea(location.state?.estatusTarea)
    }, [])

    const handlePrioridad = (event) => { 
        event.preventDefault()
        console.log(location.state?.prioridadTarea)
        setPrioridadTarea(event.target?.value)
        console.log(prioridadTarea)
    }

    const handleNombreTarea = (event) => { 
        event.preventDefault()
        console.log(location.state?.nombreTarea)
        setNombreTarea(event.target?.value)
        console.log(nombreTarea)
    }
    const handleDescripcionTarea = (event) => { 
        event.preventDefault()
        console.log(location.state?.descripcionTarea)
        setDescripcionTarea(event.target?.value)
        console.log(descripcionTarea)
    }


    const handleEncargadoTarea = (event) => { 
        event.preventDefault()
        console.log(location.state?.encargadoTarea)
        setEncargadoTarea(event.target?.value)
        console.log(encargadoTarea)
    }

    const handleAsignacionTarea = (event) => { 
        event.preventDefault()
        console.log(location.state?.fechaAsignacion)
        setFechaAsignacion(event.target?.value)
        console.log(fechaAsignacion)
    }

    const handleClienteTarea = (event) => { 
        event.preventDefault()
        console.log(location.state?.clienteTarea)
        setClienteTarea(event.target?.value)
        console.log(clienteTarea)
    }

    const handleEstatusTarea = (event) => { 
        event.preventDefault()
        console.log(location.state?.estatusTarea)
        setEstatusTarea(event.target?.value)
        console.log(estatusTarea)
    }

    const updateData = (event) => {
        event.preventDefault()
        console.log("is this called?")

        // TURN BACK ON! EMAIL NOTIFICATION FOR NEW PROJECTS
        // var templateParams = {
        //     name:'Orion'
        // }    
        // emailjs.send('service_jmbkmfa', 'template_clwofcp', templateParams,'9iV9-lk3L2WSurnZn')
        // END APR26

        // modif may02
        console.log("Print" + prioridadTarea, nombreTarea, descripcionTarea, encargadoTarea, fechaAsignacion, clienteTarea, estatusTarea)

        fetch("http://localhost:4000/updateTask",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            
            body: JSON.stringify({
                id: location.state._id,
                prioridadTarea: prioridadTarea,
                nombreTarea: nombreTarea,
                descripcionTarea: descripcionTarea,
                encargadoTarea: encargadoTarea,
                fechaAsignacion: fechaAsignacion,
                clienteTarea: clienteTarea,
                estatusTarea: estatusTarea,
            }),
        })
            .then((res) => res.json())
            .then((data => {
                console.log(data)
                window.location.href="/tasks"
            }))
    }

    return(
        <div>
            <Header/>
            <h1 className="mainSubHeaderNewProject"> Editar Tarea {nombreTarea}</h1>
            {/* NEW TASK SIDE */}
            <div className="taskEdit-previewWindow">
                            <div>
                                <div className="taskEdit-descriptClientCard">
                                <label className="taskInfoLabel">Tarea</label>
                                    <input className="taskInfoInput" type="text"required onChange={handleNombreTarea} defaultValue={nombreTarea} name="nombreTarea"></input>
                                    {/* <input className="taskInfoInput" type="text" required onChange={handleInput} placeholder="Título de tarea o actividad" name="nombreTarea" value={taskDetails.nombreTarea} id="nombreTarea"></input> */}

                                    <label className="taskInfoLabel">Descripción</label>
                                    <textarea className="taskInfoInput" type="text"required onChange={handleDescripcionTarea} defaultValue={descripcionTarea} name="descripcionTarea"></textarea>
                                    {/* <textarea className="taskInfoInput" type="text" onChange={handleInput} placeholder="Breve descripción de tarea" name="descripcionTarea" value={taskDetails.descripcionTarea}></textarea> */}

                                    <label className="taskInfoLabel">Prioridad</label>
                                    <select className="taskInfoInput" select type="text"required onChange={handlePrioridad} defaultValue={prioridadTarea} name="prioridadTarea">
                                    {/* <select className="taskInfoInput" required onChange={handleInput} placeholder="Seleccionar prioridad..." name="prioridadTarea" value={taskDetails.prioridadTarea}> */}
                                        <option>{prioridadTarea}</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>

                                    <label className="taskInfoLabel">Encargado de tarea</label>
                                    <select className="taskInfoInput" select type="text"required onChange={handleEncargadoTarea} defaultValue={encargadoTarea} name="encargadoTarea">
                                    {/* <select className="taskInfoInput" required onChange={handleInput} placeholder="Seleccionar encargado..." name="encargadoTarea" value={taskDetails.encargadoTarea}> */}
                                        <option>{encargadoTarea}</option>
                                        <option>Gustavo Valdivia</option>
                                        <option>Gustavo Flores</option>
                                        <option>Pamela Flores</option>
                                        <option>César Flores</option>
                                    </select>

                                    <label className="taskInfoLabel">Fecha de asignación</label>
                                    <input className="taskInfoInput" type="date"required onChange={handleAsignacionTarea} defaultValue={fechaAsignacion} name="fechaAsignacion"></input>
                                    {/* <input className="taskInfoInput" type="date" required onChange={handleInput} placeholder="Fecha de asignación" name="fechaAsignacion" value={taskDetails.fechaAsignacion}></input> */}

                                    <label className="taskInfoLabel">Cliente</label>
                                    <input className="taskInfoInput" type="text"required onChange={handleClienteTarea} defaultValue={clienteTarea} name="clienteTarea"></input>
                                    {/* <input className="taskInfoInput" type="text" required onChange={handleInput} placeholder="Cliente involucrado" name="clienteTarea" value={taskDetails.clienteTarea}></input> */}

                                    <label className="taskInfoLabel">Estatus Inicial</label>
                                    <select className="taskInfoInput" select type="text"required onChange={handleEstatusTarea} defaultValue={estatusTarea} name="estatusTarea">
                                    {/* <select className="taskInfoInput" required onChange={handleInput} placeholder="Seleccionar estatus" name="estatusTarea" value={taskDetails.estatusTarea}> */}
                                        <option>{estatusTarea}</option>
                                        <option>Por Asignar</option>
                                        <option>En Progreso</option>
                                        <option>Terminados</option>
                                        <option>Cancelados</option>
                                    </select>

                                </div>
                                {/* <button onClick={viewOrdenCompra} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button> */}
                                <div className="taskSubmitBtnDiv">
                                    <button className="taskEdit-updateDataBtn" type="submit" onClick={updateData}>Guardar</button> 
                                    {/* <button className="btnMagGlass" type="submit" onClick={handleSubmit}>Agregar</button> */}
                                    {/* <button className="btnMagGlass fa-sm">Agregar</button> */}
                                </div>
                            </div>
                        </div>
                        {/* NEW TASK SIDE END */}
            <Footer/>
        </div>
    )
}
