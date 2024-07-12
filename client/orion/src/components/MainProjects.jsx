import { useEffect, useState, useContext } from "react"
import React from "react";

import { useNavigate } from "react-router-dom";

import Header from "./Header"
import Footer from "./Footer"

import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faChartPie } from "@fortawesome/free-solid-svg-icons"
import Caret from "./Icons/Caret";

// new jun20
import ApexChart from "./chartTest";
import ActiveChart from "./Charts/activeChart";
import FinishedChart from "./Charts/finishedChart";
import SleepingChart from "./Charts/sleepingChart";
import CanceledChart from "./Charts/canceledChart";
// import TestChart from "./chartTest";
// end jun20


function MainProjects() {
    // NEW APR19
    const headers =[
        {
            id: 1,
            KEY: "cliente",
            LABEL: "CLIENTE"
        },
        {
            id: 2,
            KEY: "idProyecto",
            LABEL: "PROYECTO"
        }, 
        {
            id: 3,
            KEY: "inicioProceso",
            LABEL: "INICIO PROCESO"
        },
        {
            id: 4,
            KEY: "inicioTecnico",
            LABEL: "INICIO TÉCNICO"
        },
        {
            id: 5,
            KEY: "nombreEncargado",
            LABEL: "ENCARGADO"
        },
        {
            id: 6,
            KEY: "folioAceptado",
            LABEL: "FOLIO"
        },
        // {
        //     id: 7,
        //     KEY: "file",
        //     LABEL: "ARCHIVOS"
        // },
        {
            id: 7,
            KEY: "estatusProyecto",
            LABEL: "ESTATUS"
        },
        // new may02
        {
            id: 8,
            KEY: "subtotal",
            LABEL: "SUBTOTAL"
        },
        {
            id: 9,
            KEY: "total",
            LABEL: "TOTAL"
        },
        // end may02
        // {
        //     id: 11,
        //     KEY: "comentarios",
        //     LABEL: "COMENTARIOS"
        // },
        // OFF APR23
        // {
        //     id: 10,
        //     KEY: "borrar",
        //     LABEL: "BORRAR"
        // }
        // OFF APR23
    ]
    // END APR19
    const navigate = useNavigate()

    let [food, setFood] = useState()

    useEffect(() => {
        console.log(JSON.stringify(food))
    })

    const [selectedRow, setSelectedRow] = React.useState(-1);

    let [projects, setProjects] = useState([])

    console.log(projects)

    // NEW APR21
    const [sort, setSort] = useState({ keyToSort: 'cliente', direction: 'asc'})
    // END APR21

    useEffect(() => {
        getAllProjects()
    },[])

    const getAllProjects =()=> {
        fetch('https://orion-backend-z5yv.onrender.com/project')
        // fetch('http://localhost:4000/project')
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

    // NEW JUL02
    // const infoTest = project_forms.aggregate([
    //     {
    //         $match:{nombreEncargado: "Cesar Flores"}
    //     }
    // ])

    // console.log("this getting printed?" + infoTest)
    // END JUL02

    // NEW APR21
    function handleHeaderClick(header) {
        setSort({
            keyToSort: header.KEY,
            direction: header.KEY === sort.keyToSort ? sort.direction === 'asc' ? 'desc' : 'asc' : 'desc'
        })
    }

    function getSortedArray(arrayToSort) {
        if(sort.direction === 'asc') {
            return arrayToSort.sort((a,b) => (a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1))
        }
        return arrayToSort.sort((a,b) => (a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1))
    }
    // END APR21

    //NEW APR02 --> OFF APR20
    // const categories = [
    //     {value: "0", text: "Seleccionar filtro"},
    //     {value: "1", text: "Cliente"},
    //     {value: "2", text: "Inicio Proceso"},
    //     {value: "3", text: "Inicio Tecnico"},
    //     {value: "4", text: "Encargado"},
    //     {value: "5", text: "Estatus"}
    // ]

    // const options = categories.map((option) => {
    //     return <option value={option.value}>{option.text}</option>
    // })

    // const [catValue, setCatValue] = useState()
    //END APR02

    return (
        <div>
            <Header/>
            <div className="mainSubHeader">
                <h1 className="mainSubHeaderTitle">Panel de proyectos</h1> 
                {/* OFF ON APR20 */}
                {/* <select className="filterDropDown" value={catValue} onChange={(e) => setCatValue(e.target.value)}>{options}</select> */}
                <a href="/project"><button className="btnProject">+</button></a>
                {/* <a href="/graph"><button className="btnGraph fa-sm"><FontAwesomeIcon icon={faChartPie} /></button></a> */}
            </div>

            {/* new jun20 */}
            {/* <div> */}
            <div className="mainPageGraph">

                <div className="individualGraph">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Activos</h1>
                        <h1 className="graphAmountTitle">6/14</h1>
                        <h1 className="graphMoneyAmount">$3,123,819.98</h1>
                    </div>
                    <ActiveChart></ActiveChart>
                </div>

                {/* <div className="individualGraphTwo"> */}
                <div className="individualGraph">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Terminados</h1>
                        <h1 className="graphAmountTitle">4/14</h1>
                        <h1 className="graphMoneyAmount">$3,123,819.98</h1>
                    </div>
                    <FinishedChart></FinishedChart>
                </div>

                {/* <div className="individualGraphTwo"> */}
                <div className="individualGraph">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Dormidos</h1>
                        <h1 className="graphAmountTitle">3/14</h1>
                        <h1 className="graphMoneyAmount">$3,123,819.98</h1>
                    </div>
                    <SleepingChart></SleepingChart>
                </div>

                {/* <div className="individualGraphFour"> */}
                <div className="individualGraphLast">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Cancelados</h1>
                        <h1 className="graphAmountTitle">1/14</h1>
                        <h1 className="graphMoneyAmount">$3,123,819.98</h1>
                    </div>
                    <CanceledChart></CanceledChart>
                </div>
            </div>
            {/* end jun20 */}

            <div>
                <table className="tableProjects">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <>
                                <th key={index} onClick={() => handleHeaderClick(header)}>
                                    <div className="header-container">
                                        <span>{header.LABEL}</span>

                                        {header.KEY === sort.keyToSort && (
                                            <Caret direction={sort.keyToSort === header.KEY ? sort.direction : 'asc'}/>
                                        )}
                                    </div>  
                                </th>
                                </>
                            ))}
                            <th className="header-erase">BORRAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* change row for projecy */}
                        {/* change projects.map to getSortedArray */}
                        {getSortedArray(projects).map((project, index) => (
                            <tr key={index} onClick={() => setSelectedRow(project.cliente)} className={"clickable-row ".concat(selectedRow === project.cliente ? "selected" : "")}>
                                {headers.map((header, index) => {
                                    return (
                                        <>
                                            <td key={index} onClick={(event) => {
                                                setFood(project)
                                                navigate("/updateProject", {state: project})
                                            }}>
                                                {/* change row for project */}
                                                {project[header.KEY]}
                                            </td>
                                        </>  
                                    )
                                })}
                                <td>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
                                </td>
                            </tr>
                        ))}


                        {/* {projects.map((project, index) => {
                            return (
                                <tr key={index} onClick={() => setSelectedRow(project.cliente)} className={"clickable-row ".concat(selectedRow === project.cliente ? "selected" : "")}>
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
                                    <td>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
                                    </td>
                                </tr>
                            )
                        })} */}
                    </tbody>
                </table>
            </div>
        
            <Footer/>
        </div>
    )
}

export default MainProjects
