import { useEffect, useState, useContext } from "react"
import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Header from "./Header"
import Footer from "./Footer"

import { faEnvelope, faLocationDot, faPhone, faTag, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// new jul18
import { faUser } from "@fortawesome/free-solid-svg-icons"
// end jul18

import { faChartPie } from "@fortawesome/free-solid-svg-icons"
import Caret from "./Icons/Caret";


function ClientsMain() {
    const headers =[
        {
            id: 1,
            KEY: "nombreEncargado",
            LABEL: "ENCARGADO"
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
            KEY: "estatusProyecto",
            LABEL: "ESTATUS"
        },
        {
            id: 5,
            KEY: "estatusContable",
            LABEL: "ESTATUS CONTABLE"
        },
        {
            id: 6,
            KEY: "total",
            LABEL: "MONTO TOTAL"
        },
    ]

    // NEW JUL26
    const recordHeaders = [
        {
            id: 1,
            KEY: "condicion",
            LABEL: "CONDICIÓN"
        },
        {
            id: 2,
            KEY: "nombreEncargado",
            LABEL: "ENCARGADO"
        },
        {
            id: 3,
            KEY: "idProyecto",
            LABEL: "PROYECTO"
        },
        {
            id: 4,
            KEY: "ultimaInteraccion",
            LABEL: "ÚLTIMA INTERACCIÓN"
        },
        {
            id: 5,
            KEY: "total",
            LABEL: "MONTO TOTAL"
        },
    ]

    // END JUL26

    const navigate = useNavigate()
    // NEW AUG08
    const location = useLocation()
    console.log(location)
    // END AUG08

    let [food, setFood] = useState()

    useEffect(() => {
        console.log(JSON.stringify(food))
        // MEW AUG08
        console.log(location)
        // END AUG08
    })

    const [selectedRow, setSelectedRow] = React.useState(-1);

    let [projects, setProjects] = useState([])

    console.log(projects)
    
    const [sort, setSort] = useState({ keyToSort: 'cliente', direction: 'asc'})

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

    // NEW AUG08

    const [empresa, setEmpresa] = useState("")
    // const location = useLocation()


    function handleClientClick() {
        console.log("Client clicked")
        console.log(location.state?.empresa)

        // useEffect(() => {
        //     console.log(location)
        //     // console.log(setEmpresa(location.state?.empresa))
        // })

        // const handleEmpresa = (event) => { 
        //     event.preventDefault()
        //     console.log(location.state?.empresa)
        //     setEmpresa(event.target?.value)
        //     console.log(empresa)
        // }
    }
    
     

    // END AUG08

    // const deleteProject = (id, cliente, idProyecto) => {
    //     if(window.confirm(`Estás seguro que quieres borrar ${cliente} - ${idProyecto}`)) {

    //         fetch("http://localhost:4000/deleteProject", {
    //             method: "POST",
    //             crossDomain: true,
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //                 "Access-Control-Allow-Origin": "*",
    //             },
    //             body: JSON.stringify({
    //                 userid: id,
    //             }),
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 getAllProjects()
    //                 alert(`Proyecto ${idProyecto} del cliente ${cliente} eliminado exitosamente`)

    //             })
    //     } else{

    //     }
    // }

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

    // NEW JUL26
    // END JUL26

    return (
        <div>
            <Header/>
            <div className="mainSubHeader">
                <h1 className="mainSubHeaderTitle">Panel de Clientes</h1> 
            </div>

            <div>
                {/* <table className="tableProjects"> */}
                <table className="clientTable">
                    <thead>
                        <tr>
                            <div className="clientHeader">
                                <th>DIRECTORIO</th>
                                <th>DETALLES</th>
                            </div>

                            {/* {headers.map((header, index) => (
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
                            ))} */}
                        </tr>
                    </thead>
                    {/* <tbody className="clientTable"> */}
                    <tbody className="clientBody">

                        <div className="client-card">
                        {projects.map((project, index) => {
                            // NEW AUG14
                            console.log(project.empresa)
                            // const doesAlreadyExist = projects.includes(project.empresa);
                            // console.log(doesAlreadyExist)


                            // if (doesAlreadyExist) {
                            // // if (projects.includes(project.empresa)) {
                            //     console.log("value exists")
                            //     return
                            // }

                            // NEW AUG26 - 5:02
                            const companyName = []        
                            companyName.push(project.empresa)
                            console.log(companyName)

                            // const uniqueCompany = (project.empresa).filter(
                            //     (value, index, array) => array.indexOf(value) === index
                            //  );

                            const uniqueCompany = [...new Set(companyName)]
                            console.log(uniqueCompany)
                            // END AUG26 - 5:02
                            // if(project.empresa === projects.includes(project.empresa) ) {
                            // if(projects.find(project.empresa) ) {
                            if(project.empresa === "Cat" ) {
                                console.log("print this")
                                return
                            }
                            else {
                            // END AUG14
                                return (
                                    <tr onClick={handleClientClick}>
                                    {/* <tr> */}
                                    {/* <tr key={index} onClick={() => setSelectedRow(project.cliente)} className={"clickable-row ".concat(selectedRow === project.cliente ? "selected" : "")}> */}
                                        <div>
                                            <div>
                                                <td className="companyName" onClick={(event) => {
                                                    setFood(project)
                                                    navigate("/clients", {state: project})}}>{project.empresa}</td>
                                                    {/* navigate("/updateProject", {state: project})}}>{project.empresa}</td> */}
                                            </div>

                                            <div className="client-secondRow">
                                                <div className="clientCard-client">
                                                    <FontAwesomeIcon icon={faUser}/>
                                                    <td className="clientText" onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/clients", {state: project})}}>{project.cliente}</td>
                                                </div>
                                                <div className="clientCard-location">
                                                    <FontAwesomeIcon icon={faLocationDot}/>
                                                    <td className="locationText"onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/clients", {state: project})}}>{project.ubicacion}</td>
                                                </div>
                                            </div>

                                            <div className="client-thirdRow">
                                                <div className="client-cardInfo">
                                                    <FontAwesomeIcon icon={faEnvelope}/>
                                                    <td className="thirdRowText"onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/clients", {state: project})}}>{project.correoPrincipal}</td>
                                                </div>
                                                <div className="client-cardInfo">
                                                    <FontAwesomeIcon icon={faPhone}/>
                                                    <td className="thirdRowText"onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/clients", {state: project})}}>{project.numeroTelefono}</td>
                                                </div>
                                                <div className="client-cardInfo">
                                                <FontAwesomeIcon icon={faTag}/>
                                                    <td className="thirdRowText"onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/clients", {state: project})}}>{project.giro}</td>
                                                </div>
                                           </div>
                                        </div>
                                    </tr>
                                )   
                            } 
                        })}
                        </div>
                        <div className="previewWindow">
                            <div className="previewHeader">
                                <label>{location.state?.empresa}</label>

                                {/* new aug26 */}
                                {projects.map((project, index) => {
                                    // new aug27
                                    // const newArray = [...new Set(project)]
                                    // console.log(newArray)
                                    console.log(projects)
                                    const fullProjectsArray = []
                                    fullProjectsArray.concat(project.total)
                                    console.log(fullProjectsArray)
                                    // end aug27
                                    if((project.empresa === location.state?.empresa && project.condicion === "Terminado" )) {
                                        // console.log(totalEarned.reduce((a, b) => a + b, 0))
                                        return (
                                            <label className="previewIncomes">Ingresos Generados: {project.total}</label>
                                        )
                                    }
                                    else if((project.empresa === location.state?.empresa && project.condicion === "Dormido" )){
                                        return (
                                            <label className="previewIncomes">Ingresos Dormidos: {project.total} </label>
                                        )
                                    }
                                    else if((project.empresa === location.state?.empresa && project.condicion === "Cancelado" )){
                                        return (
                                            <label className="previewIncomes">Ingresos Cancelados: {project.total} </label>
                                        )
                                    }
                                    else if((project.empresa === location.state?.empresa && project.condicion === "Activo" )){
                                        return (
                                            <label className="previewIncomes">Ingresos Activos: {project.total} </label>
                                        )
                                    }
                                }
                                )}
                                {/* end aug26 */}
                                {/* <label className="previewIncomes">Ingresos Generados: $538,934.71</label> */}
                            </div>
                            <div className="mainFiscalDivs">
                                {/* MAIN SPECS DIV */}
                                <div className="previewMainSpec">
                                    <div className="mainSpecElement">
                                        <label>No. de Cliente: </label>
                                        <label className="mainSpecAnswer">{location.state?.numeroCliente}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Contacto: </label>
                                        <label className="mainSpecAnswer">{location.state?.cliente}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Dirección: </label>
                                        <label className="mainSpecAnswer">{location.state?.direccion}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Sucursal:</label>
                                        <label className="mainSpecAnswer">{location.state?.sucursal}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Ubicación:</label>
                                        <label className="mainSpecAnswer">{location.state?.ubicacion}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Industria: </label>
                                        <label className="mainSpecAnswer">{location.state?.giro}</label>
                                    </div>
                                </div>
                                {/* FISCAL DIV */}
                                <div className="previewMainSpec">
                                    <div className="mainSpecElement">
                                        <label>Razón Social: </label>
                                        <label className="mainSpecAnswer">{location.state?.razonSocial}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Régimen Fiscal: </label>
                                        <label className="mainSpecAnswer">{location.state?.regimenFiscal}</label>
                                    </div>
                                </div>
                            </div>
                            {/* CONTACT INFO DIV */}
                            <div className="previewContactSpec">
                                <label className="contactTitle">Detalles de Contacto</label>
                                <div className="contactElement"> 
                                    <label>Teléfono:</label>
                                    <label className="mainSpecAnswer">{location.state?.numeroTelefono}</label>
                                </div>
                                <div className="contactElement">
                                    <label>Correo Principal:</label>
                                    <label className="mainSpecAnswer">{location.state?.correoPrincipal}</label>
                                </div>
                                <div className="contactElement">
                                    <label>Correo de Facturación: </label>
                                    <label className="mainSpecAnswer">{location.state?.correoFacturacion}</label>
                                </div>
                            </div>
                            {/* ACTIVE DIV */}
                            <div>
                                <label className="activeTitle">Proyectos Activos</label>
                                <div>

                                    <table className="activeTable">
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* new aug26 */}
                                            {getSortedArray(projects).map((project, index) => {
                                                if(project.empresa === location.state?.empresa && project.condicion === "Activo") {
                                                    return (
                                                        <tr key={index} onClick={() => setSelectedRow(project.cliente)} className={"clickable-row ".concat(selectedRow === project.cliente ? "selected" : "")}> 
                                                        {headers.map((header, index) => {
                                                                return (
                                                                    <>
                                                                        <td key={index} onClick={(event) => {
                                                                            setFood(project)
                                                                            navigate("/updateProject", {state: project})
                                                                        }}>
                                                                            {project[header.KEY]}
                                                                        </td>
                                                                    </>  
                                                                )
                                                        })}
                                                    </tr>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <>
                                                            <tr className="testTd">{null}</tr>
                                                            <td className="testTd">{null}</td>
                                                        </>
                                                    )
                                                }
                                            })}
                                            {/* end aug26 */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* RECORD DIV */}
                            <div>
                                <label className="activeTitle">Historial</label>
                                <div className="tableDivScroll">
                                    <table className="recordTable">
                                        <thead>
                                            <tr>
                                                    {recordHeaders.map((header, index) => (
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
                                                </tr>
                                        </thead>
                                        <tbody>
                                            {/* new aug26 */}
                                            {getSortedArray(projects).map((project, index) => {
                                                if(project.empresa === location.state?.empresa && (project.condicion === "Terminado" || project.condicion === "Dormido" || project.condicion === "Cancelado")) {
                                                    return (
                                                        <tr key={index} onClick={() => setSelectedRow(project.condicion)} className={"clickable-row ".concat(selectedRow === project.condicion ? "selected" : "")}>
                                                        {recordHeaders.map((header, index) => {
                                                            return (
                                                                <>
                                                                    <td key={index} onClick={(event) => {
                                                                        setFood(project)
                                                                        navigate("/updateProject", {state: project})
                                                                    }}>
                                                                        {project[header.KEY]}
                                                                    </td>
                                                                </>  
                                                            )
                                                        })}
                                                        </tr>
                                                    )
                                                }
                                                else {
                                                    return(
                                                        <>
                                                            <tr className="testTd">{null}</tr>
                                                            <td className="testTd">{null}</td>
                                                        </>
                                                    )
                                                }
                                            })}
                                            {/* end aug26 */}

                                            {/* asleep aug26 */}
                                            {/* {getSortedArray(projects).map((project, index) => (
                                                    <tr key={index} onClick={() => setSelectedRow(project.condicion)} className={"clickable-row ".concat(selectedRow === project.condicion ? "selected" : "")}>
                                                        {recordHeaders.map((header, index) => {
                                                            // new aug14
                                                            // if(project.empresa === location.state?.empresa && (project.condicion === "Terminado" || "Dormido" || "Cancelado") ) {
                                                            if(project.empresa === location.state?.empresa && (project.condicion === "Terminado" || project.condicion === "Dormido" || project.condicion === "Cancelado") ) {
                                                                return (
                                                                    <>
                                                                        <td key={index} onClick={(event) => {
                                                                            setFood(project)
                                                                            navigate("/updateProject", {state: project})
                                                                        }}>
                                                                            {project[header.KEY]}
                                                                        </td>
                                                                    </>  
                                                                )
                                                            }
                                                            
                                                            // end aug14
                                                            // return (
                                                            //     <>
                                                            //         <td key={index} onClick={(event) => {
                                                            //             setFood(project)
                                                            //             navigate("/updateProject", {state: project})
                                                            //         }}>
                                                            //             {project[header.KEY]}
                                                            //         </td>
                                                            //     </>  
                                                            // )
                                                        })}
                                                    </tr>
                                                ))} */}
                                            {/* asleep aug26 */}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* TRASH ZONE STARTS HERE! */}

                        {/* <div className="client-card">
                            <label className="companyName">Kangaroo Cacti</label>
                            <div className="client-secondRow">
                                <FontAwesomeIcon icon={faUser}/>
                                <label>Maria Jose Albanes</label>
                                <FontAwesomeIcon icon={faLocationDot}/>
                                <label>Guadalajara, Jal.</label>
                            </div>
                            <div className="client-thirdRow">
                                <FontAwesomeIcon icon={faEnvelope}/>
                                <label className="client-cardInfo">mj_albanes@yahoo.com</label>
                                <FontAwesomeIcon icon={faPhone}/>
                                <label className="client-cardInfo">331 080 5641</label>
                                <FontAwesomeIcon icon={faTag}/>
                                <label className="client-cardInfo">Software Dev</label>
                            </div>
                        </div> */}

                        {/* {getSortedArray(projects).map((project, index) => (
                            <tr key={index} onClick={() => setSelectedRow(project.cliente)} className={"clickable-row ".concat(selectedRow === project.cliente ? "selected" : "")}>
                                {headers.map((header, index) => {
                                    return (
                                        <>
                                            <td key={index} onClick={(event) => {
                                                setFood(project)
                                                navigate("/updateProject", {state: project})
                                            }}>
                                                {project[header.KEY]}
                                            </td>
                                        </>  
                                    )
                                })}
                                <td>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        
            <Footer/>
        </div>
    )
}

export default ClientsMain