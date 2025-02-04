import { useEffect, useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import React from "react";
import axios from "axios"


import Header from "./Header"
import Footer from "./Footer"

import { faBuilding, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function TaskManager() {
    const[taskDetails, setTaskDetails] = useState({
        prioridadTarea:"",
        nombreTarea:"",
        descripcionTarea:"",
        encargadoTarea:"",
        fechaAsignacion:"",
        clienteTarea:"",
        estatusTarea:"",

        inChargeDetails:"",
        gustavoShort:"GV",
        gusSort:"GF",
        pamelaShort:"PF",
        cesarShort:"CF"
    })

    function handleInput(event) {
        setTaskDetails((prevState) => {
            return {...prevState, [event.target.name]:event.target.value}
        })
    }

    const [message, setMessage] = useState({
        type:"invisible-msg",
        text:""
    })

    function handleSubmit() {
        event.preventDefault();

        console.log(taskDetails)

        const formData = new FormData()
     
        formData.append("prioridadTarea", taskDetails.prioridadTarea)
        formData.append("nombreTarea", taskDetails.nombreTarea)
        formData.append("descripcionTarea", taskDetails.descripcionTarea)
        formData.append("encargadoTarea", taskDetails.encargadoTarea)
        formData.append("fechaAsignacion", taskDetails.fechaAsignacion)
        formData.append("clienteTarea", taskDetails.clienteTarea)
        formData.append("estatusTarea", taskDetails.estatusTarea)

        axios.post('http://localhost:4000/tasker', formData, {
            headers: {
                'Content-Type': 'application/json',
              },
              prioridadTarea: taskDetails.prioridadTarea,
              nombreTarea: taskDetails.nombreTarea,
              descripcionTarea: taskDetails.descripcionTarea,
              encargadoTarea: taskDetails.encargadoTarea,
              fechaAsignacion: taskDetails.fechaAsignacion,
              clienteTarea: taskDetails.clienteTarea,
              estatusTarea: taskDetails.estatusTarea
        })
        .then((data) => {
            setMessage({type:"success", text:data.message})

            console.log(data)
            setTimeout(() => {
                        setMessage({type:"invisible-msg", text:"Exit"})
                    }, 1300)
                    setTimeout(() => {
                        window.location.href="/tasks"
                    }, )
        })
        .catch(err => console.log(err))
    }

    // FETCHING BACK INFO
    let [food, setFood] = useState()

    useEffect(() => {
        console.log(JSON.stringify(food))
    })

    let [projects, setProjects] = useState([])

    console.log(projects)

    useEffect(() => {
        getAllProjects()
    },[])

    const getAllProjects =()=> {
        fetch("https://orion-backend-z5yv.onrender.com/tasker")
        // fetch('http://localhost:4000/tasker')
        .then((response) => response.json())
        .then((data) => {
            setProjects(data)
            console.log(data)
            if(data.message === undefined) {
                setFood()
            }
            else {
                setFood(data)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // FETCHING BACK INFO END

    // MAPPING OVER INFO
    let totalCount = 0;
    let toBeAssignedCount = 0; 
    let inProgressCount = 0; 
    let finishedCount = 0; 
    let cancelledCount = 0; 

    projects.forEach(project => {
        totalCount++
        if(project.estatusTarea === "Por Asignar") {
            toBeAssignedCount++
            console.log(toBeAssignedCount)   
        }
        else if(project.estatusTarea === "En Progreso") {
            inProgressCount++
            console.log(inProgressCount)   
        }
        else if(project.estatusTarea === "Terminados") {
            finishedCount++
            console.log(finishedCount)   
        }
        else if(project.estatusTarea === "Cancelados") {
            cancelledCount++
            console.log(cancelledCount)   
        }
    })
    // MAPPING OVER INFO END

    // DELETE A TASK
    const deleteTask = (id, nombreTarea, encargadoTarea) => {
        if(window.confirm(`Estás seguro que quieres borrar la tarea ${nombreTarea} de ${encargadoTarea}`)) {
            
            fetch("https://orion-backend-z5yv.onrender.com/deleteTask", {
            fetch("http://localhost:4000/deleteTask", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userid: id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    getAllProjects()
                    alert(`Tarea ${nombreTarea} de ${encargadoTarea} eliminada exitosamente`)

                })
        } else{

        }
    }
    // DELETE A TASK END

    // EDITING DATA 
    const navigate = useNavigate()

    function editPencil() {
        console.log("Pencil is clicked")

    const location = useLocation()
    console.log(location)

    }
    // EDITING DATA END


    // MAPPING OVER IN-CHARGE INFO
    // let gustavoInfo;
    // let gusInfo; 
    // let pamelaInfo; 
    // let cesarInfo; 
    
    // projects.forEach(project => {
    //     if(project.encargadoTarea === "Gustavo Valdivia") {
    //         gustavoInfo = "GV"
    //         console.log(gustavoInfo)   
    //     }
    //     else if(project.encargadoTarea === "Gustavo Flores") {
    //         gusInfo = "GF"
    //         console.log(gusInfo)   
    //     }
    //     else if(project.encargadoTarea === "Pamela Flores") {
    //         pamelaInfo = "PF"
    //         console.log(pamelaInfo)   
    //     }
    //     else if(project.encargadoTarea === "César Flores") {
    //         cesarInfo = "CF"
    //         console.log(cesarInfo)   
    //     }
    // })
    // MAPPING OVER IN-CHARGE INFO END

    // IN-CHARGE CASE CHANGE
    // var creator = (taskDetails.encargadoTarea)
    // var creatorInfo = (taskDetails.inChargeDetails);
    // switch(creator) {
    //     case "Pamela Flores": {
    //         console.log(taskDetails.pamelaData)
    //         console.log("pamela registrada")
    //         creatorInfo = (taskDetails.pamelaShort);
    //     break;
    //     }
    //     case "César Flores": {
    //         // console.log("cesar registrado")
    //         creatorInfo = (taskDetails.cesarShort);
    //     break;
    //     }
    //     case "Gustavo Flores": {
    //         // console.log(quoterDetails.pamelaData)
    //         creatorInfo = (taskDetails.gusSort);
    //     break;
    //     }
    //     case "Gustavo Valdivia": {
    //         // console.log("cesar registrado")
    //         creatorInfo = (taskDetails.gustavoShort);
    //     break;
    //     }
    // }
    // IN-CHARGE CASE CHANGE END

    return (
        <div>
            <Header/>
            <div className="mainSubHeader">
                <h1 className="mainSubHeaderTitle">Tablero de Tareas</h1> 
            </div>

            <div>
                <table className="clientTable">
                    <thead>
                        <tr>
                            <div className="clientHeader">
                                <th>NUEVA ACTIVIDAD</th>
                                <th>TAREAS</th>
                            </div>
                        </tr>
                    </thead>
                    <tbody className="taskerBody">
                        {/* NEW TASK SIDE */}
                        <div className="previewWindow">
                            <div>
                                <div className="descript-clientCard">
                                <label className="taskInfoLabel">Tarea</label>
                                    <input className="taskInfoInput" type="text" required onChange={handleInput} placeholder="Título de tarea o actividad" name="nombreTarea" value={taskDetails.nombreTarea} id="nombreTarea"></input>
                                    {/* <input className="taskInfoInput" placeholder="Título de tarea o actividad"></input> */}

                                    <label className="taskInfoLabel">Descripción</label>
                                    <textarea className="taskInfoInput" type="text" onChange={handleInput} placeholder="Breve descripción de tarea" name="descripcionTarea" value={taskDetails.descripcionTarea}></textarea>
                                    {/* <textarea className="taskInfoInput" placeholder="Breve descripción de tarea"></textarea> */}

                                    <label className="taskInfoLabel">Prioridad</label>
                                    <select className="taskInfoInput" required onChange={handleInput} placeholder="Seleccionar prioridad..." name="prioridadTarea" value={taskDetails.prioridadTarea}>
                                    {/* <select className="taskInfoInput"> */}
                                        <option>Seleccionar Prioridad</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>

                                    <label className="taskInfoLabel">Encargado de tarea</label>
                                    <select className="taskInfoInput" required onChange={handleInput} placeholder="Seleccionar encargado..." name="encargadoTarea" value={taskDetails.encargadoTarea}>
                                    {/* <select className="taskInfoInput"> */}
                                        <option>Seleccionar encargado</option>
                                        <option>Gustavo Valdivia</option>
                                        <option>Gustavo Flores</option>
                                        <option>Pamela Flores</option>
                                        <option>César Flores</option>
                                    </select>

                                    <label className="taskInfoLabel">Fecha de asignación</label>
                                    <input className="taskInfoInput" type="date" required onChange={handleInput} placeholder="Fecha de asignación" name="fechaAsignacion" value={taskDetails.fechaAsignacion}></input>
                                    {/* <input type="date" className="taskInfoInput"></input> */}

                                    <label className="taskInfoLabel">Cliente</label>
                                    <input className="taskInfoInput" type="text" required onChange={handleInput} placeholder="Cliente involucrado" name="clienteTarea" value={taskDetails.clienteTarea}></input>
                                    {/* <input className="taskInfoInput" placeholder="Cliente involucrado"></input> */}

                                    <label className="taskInfoLabel">Estatus Inicial</label>
                                    <select className="taskInfoInput" required onChange={handleInput} placeholder="Seleccionar estatus" name="estatusTarea" value={taskDetails.estatusTarea}>
                                        <option>Seleccionar estatus</option>
                                        <option>Por Asignar</option>
                                        <option>En Progreso</option>
                                        <option>Terminados</option>
                                        <option>Cancelados</option>
                                    </select>

                                </div>
                                {/* <button onClick={viewOrdenCompra} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button> */}
                                <div className="taskSubmitBtnDiv">
                                    <button className="btnMagGlass" type="submit" onClick={handleSubmit}>Agregar</button>
                                    {/* <button className="btnMagGlass fa-sm">Agregar</button> */}
                                </div>
                            </div>
                        </div>
                        {/* NEW TASK SIDE END */}

                        {/* EXISTING TASK SIDE */}
                        <div className="taskManagerBodyDiv">
                            {/* TO BE ASSIGNED AREA */}
                            <div className="toBeAssignedStageDiv">
                                <label className="stageTitleLabel">Por Asignar</label>
                                {projects.map((project, index) => {
                                    if ((project.estatusTarea === "Por Asignar")) {
                                        return (
                                            <div>
                                                <div className="assignmentDiv">
                                                    <div className="taskPriority-Universal">
                                                        <label className="taskPriorityText">Prioridad: {project.prioridadTarea}</label>
                                                    </div>
                                                    <label className="taskName">{project.nombreTarea}</label> 
                                                    <label className="taskDescription">{project.descripcionTarea}</label>
                                                    <div className="taskLeader-DateEnteredDiv">
                                                        <div className="taskLeaderDiv">
                                                            <label className="taskLeader">{project.encargadoTarea}</label>
                                                        </div>
                                                        <label className="taskDateEntered">{project.fechaAsignacion}</label>
                                                    </div>

                                                    <div className="taskRecipient-TrashDiv">
                                                        <div className="taskRecipientDiv">
                                                            <FontAwesomeIcon icon={faBuilding} className="taskRecipientCompany"/>
                                                            <label className="taskRecipientName">{project.clienteTarea}</label>
                                                        </div>
                                                        <FontAwesomeIcon icon={faPencil} onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/updateTask", {state: project})}}
                                                        />
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(project._id, project.nombreTarea, project.encargadoTarea)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            {/* TO BE ASSIGNED AREA END*/}

                            {/* IN PROGRESS AREA */}
                            <div className="inProgressStageDiv">
                                <label className="stageTitleLabel">En Progreso</label>
                                {projects.map((project, index) => {
                                    if ((project.estatusTarea === "En Progreso")) {
                                        return (
                                            <div>
                                                <div className="assignmentDiv">
                                                    <div className="taskPriority-Universal">
                                                        <label className="taskPriorityText">Prioridad: {project.prioridadTarea}</label>
                                                    </div>
                                                    <label className="taskName">{project.nombreTarea}</label> 
                                                    <label className="taskDescription">{project.descripcionTarea}</label>
                                                    <div className="taskLeader-DateEnteredDiv">
                                                        <div className="taskLeaderDiv">
                                                            <label className="taskLeader">{project.encargadoTarea}</label>
                                                        </div>
                                                        <label className="taskDateEntered">{project.fechaAsignacion}</label>
                                                    </div>

                                                    <div className="taskRecipient-TrashDiv">
                                                        <div className="taskRecipientDiv">
                                                            <FontAwesomeIcon icon={faBuilding} className="taskRecipientCompany"/>
                                                            <label className="taskRecipientName">{project.clienteTarea}</label>
                                                        </div>
                                                        <FontAwesomeIcon icon={faPencil} onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/updateTask", {state: project})}}
                                                        />
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(project._id, project.nombreTarea, project.encargadoTarea)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            {/* IN PROGRESS AREA END */}

                            {/* FINISHED AREA */}
                            <div className="finishedStageDiv">
                                <label className="stageTitleLabel">Terminados</label>
                                {projects.map((project, index) => {
                                    if ((project.estatusTarea === "Terminados")) {
                                        return (
                                            <div>
                                                <div className="assignmentDiv">
                                                    <div className="taskPriority-Universal">
                                                        <label className="taskPriorityText">Prioridad: {project.prioridadTarea}</label>
                                                    </div>
                                                    <label className="taskName">{project.nombreTarea}</label> 
                                                    <label className="taskDescription">{project.descripcionTarea}</label>
                                                    <div className="taskLeader-DateEnteredDiv">
                                                        <div className="taskLeaderDiv">
                                                            <label className="taskLeader">{project.encargadoTarea}</label>
                                                        </div>
                                                        <label className="taskDateEntered">{project.fechaAsignacion}</label>
                                                    </div>

                                                    <div className="taskRecipient-TrashDiv">
                                                        <div className="taskRecipientDiv">
                                                            <FontAwesomeIcon icon={faBuilding} className="taskRecipientCompany"/>
                                                            <label className="taskRecipientName">{project.clienteTarea}</label>
                                                        </div>
                                                        <FontAwesomeIcon icon={faPencil} onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/updateTask", {state: project})}}
                                                        />
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(project._id, project.nombreTarea, project.encargadoTarea)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            {/* FINISHED AREA END */}

                            {/* CANCELLED AREA */}
                            <div className="cancelledStageDiv">
                                <label className="stageTitleLabel">Cancelados</label>
                                {projects.map((project, index) => {
                                    if ((project.estatusTarea === "Cancelados")) {
                                        return (
                                            <div>
                                                <div className="assignmentDiv">
                                                    <div className="taskPriority-Universal">
                                                        <label className="taskPriorityText">Prioridad: {project.prioridadTarea}</label>
                                                    </div>
                                                    <label className="taskName">{project.nombreTarea}</label> 
                                                    <label className="taskDescription">{project.descripcionTarea}</label>
                                                    <div className="taskLeader-DateEnteredDiv">
                                                        <div className="taskLeaderDiv">
                                                            <label className="taskLeader">{project.encargadoTarea}</label>
                                                        </div>
                                                        <label className="taskDateEntered">{project.fechaAsignacion}</label>
                                                    </div>

                                                    <div className="taskRecipient-TrashDiv">
                                                        <div className="taskRecipientDiv">
                                                            <FontAwesomeIcon icon={faBuilding} className="taskRecipientCompany"/>
                                                            <label className="taskRecipientName">{project.clienteTarea}</label>
                                                        </div>
                                                        <FontAwesomeIcon icon={faPencil} onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/updateTask", {state: project})}}
                                                        />
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(project._id, project.nombreTarea, project.encargadoTarea)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            {/* CANCELLED AREA END */}
                        </div>
                    </tbody>
                </table>
            </div>
        
            <Footer/>
        </div>
    )
}

export default TaskManager
