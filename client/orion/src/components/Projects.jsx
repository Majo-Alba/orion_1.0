import { useEffect, useState, useContext } from "react"
import React from "react";

import { useNavigate } from "react-router-dom";

import Header from "./Header"
import Footer from "./Footer"

import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faChartPie } from "@fortawesome/free-solid-svg-icons"

import Background from "./Background";


function Projects() {
    const navigate = useNavigate()

    let [food, setFood] = useState()

    useEffect(() => {
        console.log(JSON.stringify(food))
    })

    const [selectedRow, setSelectedRow] = React.useState(-1);

    let [projects, setProjects] = useState([])

    console.log(projects)

    useEffect(() => {
        getAllProjects()
    },[])

    const getAllProjects =()=> {
        fetch('http://localhost:4000/project')
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

    const deleteProject = (id, cliente, idProyecto) => {
        if(window.confirm(`Estás seguro que quieres borrar ${cliente} - ${idProyecto}`)) {

            fetch("http://localhost:4000/deleteProject", {
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
                    alert(`Proyecto ${idProyecto} del cliente ${cliente} eliminado exitosamente`)

                })
        } else{

        }
    }

    //NEW APR02
    const categories = [
        {value: "0", text: "Seleccionar filtro"},
        {value: "1", text: "Cliente"},
        {value: "2", text: "Inicio Proceso"},
        {value: "3", text: "Inicio Tecnico"},
        {value: "4", text: "Encargado"},
        {value: "5", text: "Estatus"}
    ]

    const options = categories.map((option) => {
        return <option value={option.value}>{option.text}</option>
    })

    const [catValue, setCatValue] = useState()
    //END APR02

    return (
        <div>
            <Header/>
            <div className="mainSubHeader">
                <h1 className="mainSubHeaderTitle">Panel de proyectos</h1> 
                <select className="filterDropDown" value={catValue} onChange={(e) => setCatValue(e.target.value)}>{options}</select>
                {/* <select className="filterDropDown">
                    <option>Seleccionar tipo de filtro</option>
                    <option>Cliente</option>
                    <option>Inicio Proceso</option>
                    <option>Inicio Técnico</option>
                    <option>Encargado</option>
                    <option>Estatus</option>
                </select> */}
                <a href="/project"><button className="btnProject">+</button></a>
                <a href="/graph"><button className="btnGraph fa-sm"><FontAwesomeIcon icon={faChartPie} /></button></a>
            </div>
            
            {/* NEW APR02 */}
            {/* <div>
                <button onClick={() => setCatValue("1")}>Cliente</button>
            </div> */}
            {/* END APR02 */}

            <div>
                <table className="tableProjects">
                    <thead>
                        <tr>
                            {/* MODIF MAY02 */}
                            <th>CLIENTE</th>
                            <th>ID PROYECTO</th>
                            <th>INICIO PROCESO</th>
                            <th>INICIO TÉCNICO</th>
                            <th>ENCARGADO</th>
                            <th>FOLIO</th>
                            {/* <th>ARCHIVOS</th> */}
                            <th>ESTATUS</th>
                            <th>SUBTOTAL</th>
                            <th>TOTAL</th>
                            {/* <th>COMENTARIOS</th> */}
                            <th>BORRAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => {
                            return (
                                <tr key={index} onClick={() => setSelectedRow(project.cliente)} className={"clickable-row ".concat(selectedRow === project.cliente ? "selected" : "")}>
                                    {/* <td onClick={() => {setFood(project)}}>{project.cliente}</td> */}
                                    {/* <td onClick={(event) => {
                                        setFood(project)
                                        toggleModal()}}>{project.cliente}</td> */}
                                    
                                    <td onClick={(event) => {
                                        setFood(project)
                                        navigate("/updateProject", {state: project})}}>{project.cliente}</td>
                                    <td onClick={(event) => {
                                        setFood(project)
                                        navigate("/updateProject", {state: project})}}>{project.idProyecto}</td>
                                    <td onClick={(event) => {
                                        setFood(project)
                                        navigate("/updateProject", {state: project})}}>{project.inicioProceso}</td>
                                    <td onClick={(event) => {
                                        setFood(project)
                                        navigate("/updateProject", {state: project})}}>{project.inicioTecnico}</td>
                                    <td onClick={(event) => {
                                        setFood(project)
                                        navigate("/updateProject", {state: project})}}>{project.nombreEncargado}</td>
                                    <td onClick={(event) => {
                                        setFood(project)
                                        navigate("/updateProject", {state: project})}}>{project.folioAceptado}</td>
                                    <td onClick={(event) => {
                                        setFood(project)
                                        navigate("/updateProject", {state: project})}}>{project.file}</td>
                                    <td onClick={(event) => {
                                        setFood(project)
                                        navigate("/updateProject", {state: project})}}>{project.estatusProyecto}</td>
                                    <td onClick={(event) => {
                                        setFood(project)
                                        navigate("/updateProject", {state: project})}}>{project.comentarios}</td>


                                    {/* <td onClick={() => {setFood(project)}}>{project.idProyecto}</td> */}
                                    {/* <td onClick={() => {setFood(project)}}>{project.inicioProceso}</td> */}
                                    {/* <td onClick={() => {setFood(project)}}>{project.inicioTecnico}</td> */}
                                    {/* <td onClick={() => {setFood(project)}}>{project.nombreEncargado}</td> */}
                                    {/* <td onClick={() => {setFood(project)}}>{project.folioAceptado}</td> */}
                                    {/* <td onClick={() => {setFood(project)}}>{project.folioPDF}</td> */}
                                    {/* <td onClick={() => {setFood(project)}}>{project.estatusProyecto}</td> */}
                                    {/* <td onClick={() => {setFood(project)}}>{project.comentarios}</td> */}
                                    {/* NEW FEB27 */}
                                    <td>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
                                    </td>
                                    {/* END FEB27 */}

                                    {/* <td onClick={() => {setFood(project)}}key={project.comentarios}>{project.comentarios}</td> */}

                                    {/* <td onClick={() => console.log(project)}>{project.cliente}</td> */}
                                    {/* <td onClick={() => console.log(project)}>{project.idProyecto}</td> */}
                                    {/* <td onClick={() => console.log(project)}>{project.inicioProceso}</td> */}
                                    {/* <td onClick={() => console.log(project)}>{project.inicioTecnico}</td> */}
                                    {/* <td onClick={() => console.log(project)}>{project.nombreEncargado}</td> */}
                                    {/* <td onClick={() => console.log(project)}>{project.folioAceptado}</td>  */}
                                    {/* <td onClick={() => console.log(project)}>{project.folioPDF}</td>  */}
                                    {/* <td onClick={() => console.log(project)}>{project.estatusProyecto}</td> */}
                                    {/* <td onClick={() => console.log(project)}>{project.comentarios}</td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <Background/> */}
            </div>
            {/* <Background/> */}
            {/* NEW FEB17 */}
            {/* {
                food!== null ? (
                    <ProjectModif food = {food}/>
                ): null
            } */}
            {/* END FEB17 */}
            
            <Footer/>
        </div>
    )
}

export default Projects