import { useEffect, useState, useContext } from "react"
import React from "react";

import { useNavigate } from "react-router-dom";

import Header from "./Header"
import Footer from "./Footer"

import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faChartPie } from "@fortawesome/free-solid-svg-icons"
import Caret from "./Icons/Caret";


function Accounting() {

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
            KEY: "plazosDePago",
            LABEL: "PLAZOS"
        },
        {
            id: 4,
            KEY: "subtotal",
            LABEL: "SUBTOTAL"
        },
        {
            id: 5,
            KEY: "total",
            LABEL: "TOTAL"
        },
        {
            id: 6,
            KEY: "anticipo",
            LABEL: "ANTICIPO"
        },
        {
            id: 7,
            KEY: "pagado",
            LABEL: "PAGADO"
        },
        {
            id: 8,
            KEY: "porPagar",
            LABEL: "POR PAGAR"
        },
        {
            id: 9,
            KEY: "estatusContable",
            LABEL: "ESTATUS"
        }
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

            fetch("https://orion-backend-z5yv.onrender.com/deleteProject", {
            // fetch("http://localhost:4000/deleteProject", {
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

    return (
        <div>
            <Header/>
            <div className="mainSubHeader">
                <h1 className="accountingTitle">Panel Contable</h1> 
                {/* OFF ON APR20 */}
                {/* <select className="filterDropDown" value={catValue} onChange={(e) => setCatValue(e.target.value)}>{options}</select> */}
                {/* <a href="/project"><button className="btnProject">+</button></a> */}
                {/* <a href="/graph"><button className="btnGraph fa-sm"><FontAwesomeIcon icon={faChartPie} /></button></a> */}
            </div>
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
                            {/* <th className="header-erase">BORRAR</th> */}
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
                                    {/* <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
            <Footer/>
        </div>
    )
}

export default Accounting
