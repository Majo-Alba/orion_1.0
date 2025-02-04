// NEW COMMIT

import { useEffect, useState, useContext } from "react"
import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Header from "./Header"
import Footer from "./Footer"

import { faEnvelope, faLocationDot, faPhone, faTag, faPencil, faSquareCheck, faFlagCheckered, faScrewdriverWrench, faDollarSign, faChevronRight, faClock, faEquals, faWrench, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"

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
import ProjectUpdate from "./ProjectUpdate";
// import PieChart from "react-native-pie-chart";
// import TestChart from "./chartTest";
// end jun20

import ReactApexChart from "react-apexcharts";

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

     // NEW SEP 18
     const location = useLocation()
     console.log(location)
     // END SEP18

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

    const viewPDF = (e) => {
        event.preventDefault()
        console.log(location.state?.file)
        window.open(`http://localhost:4000/files/${location.state?.file}`, "_blank", "noreferrer")
    }

    // NEW OCT22
    const viewCIF = (e) => {
        event.preventDefault()
        console.log(fileCIFExtractor)
        window.open(`http://localhost:4000/files/${fileCIFExtractor}`, "_blank", "noreferrer")
    }

    const viewCSF = (e) => {
        event.preventDefault()
        console.log(fileCSFExtractor)
        window.open(`http://localhost:4000/files/${fileCSFExtractor}`, "_blank", "noreferrer")
    }

    const viewCartaConformidad = (e) => {
        event.preventDefault()
        console.log(fileCartaConformidadExtractor)
        window.open(`http://localhost:4000/files/${fileCartaConformidadExtractor}`, "_blank", "noreferrer")
    }

    const viewCotizacion = (e) => {
        event.preventDefault()
        console.log(fileCotizacionExtractor)
        window.open(`http://localhost:4000/files/${fileCotizacionExtractor}`, "_blank", "noreferrer")
    }

    const viewFactura = (e) => {
        event.preventDefault()
        console.log(fileFacturaExtractor)
        window.open(`http://localhost:4000/files/${fileFacturaExtractor}`, "_blank", "noreferrer")
    }

    const viewOrdenCompra = (e) => {
        event.preventDefault()
        console.log(fileOrdenCompraExtractor)
        window.open(`http://localhost:4000/files/${fileOrdenCompraExtractor}`, "_blank", "noreferrer")
    }

    const viewOtro = (e) => {
        event.preventDefault()
        console.log(fileOtroExtractor)
        window.open(`http://localhost:4000/files/${fileOtroExtractor}`, "_blank", "noreferrer")
    }
    // END OCT22

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

    //NEW OCT21
    // CIF START
    let fileCIFExtractor = 0

    if(location.state?.files[0].hasOwnProperty("fileCIF") === false) {
        console.log("fileCIF doesnt exist")
        fileCIFExtractor = "N/A"
    }
    else {
        console.log("CIF exists")
        fileCIFExtractor = location.state?.files[0].fileCIF[0].filename
        console.log((fileCIFExtractor))
    }
    console.log((fileCIFExtractor))
    // CIF END

    // CSF START
    let fileCSFExtractor = 0

    if(location.state?.files[0].hasOwnProperty("fileCSF") === false) {
        console.log("fileCSF doesnt exist")
        fileCSFExtractor = "N/A"
    }
    else {
        console.log("fileCSF exists")
        fileCSFExtractor = location.state?.files[0].fileCSF[0].filename
        console.log((fileCSFExtractor))
    }
    console.log((fileCSFExtractor))
    // CSF END

    // CARTA CONFORMIDAD START
    let fileCartaConformidadExtractor = 0
    console.log(location.state?.files[0].hasOwnProperty("fileCartaConformidad"))

    if(location.state?.files[0].hasOwnProperty("fileCartaConformidad") === false) {
        console.log("fileCartaConformidad doesnt exist")
        fileCartaConformidadExtractor = "N/A"
    }
    else {
        console.log("fileCartaConformidad exists")
        fileCartaConformidadExtractor = location.state?.files[0].fileCartaConformidad[0].filename
        console.log((fileCartaConformidadExtractor))
    }
    console.log((fileCartaConformidadExtractor))
    // CARTA CONFORMIDAD END

    // COTIZACION START
    let fileCotizacionExtractor = 0
    console.log(location.state?.files[0].hasOwnProperty("fileCotizacion"))

    if(location.state?.files[0].hasOwnProperty("fileCotizacion") === false) {
        console.log("fileCotizacion doesnt exist")
        fileCotizacionExtractor = "N/A"
    }
    else {
        console.log("fileCotizacion exists")
        fileCotizacionExtractor = location.state?.files[0].fileCotizacion[0].filename
        console.log((fileCotizacionExtractor))
    }
    console.log((fileCotizacionExtractor))
    // COTIZACION END

    // FACTURA START
    let fileFacturaExtractor = 0
    console.log(location.state?.files[0].hasOwnProperty("fileFactura"))

    if(location.state?.files[0].hasOwnProperty("fileFactura") === false) {
        console.log("fileFactura doesnt exist")
        fileFacturaExtractor = "N/A"
    }
    else {
        console.log("fileFactura exists")
        fileFacturaExtractor = location.state?.files[0].fileFactura[0].filename
        console.log((fileFacturaExtractor))
    }
    console.log((fileFacturaExtractor))
    // FACTURA END

    // ORDEN COMPRA START
    let fileOrdenCompraExtractor = 0
    console.log(location.state?.files[0].hasOwnProperty("fileOrdenCompra"))

    if(location.state?.files[0].hasOwnProperty("fileOrdenCompra") === false) {
        console.log("fileOrdenCompra doesnt exist")
        fileOrdenCompraExtractor = "N/A"
    }
    else {
        console.log("fileOrdenCompra exists")
        fileOrdenCompraExtractor = location.state?.files[0].fileOrdenCompra[0].filename
        console.log((fileOrdenCompraExtractor))
    }
    console.log((fileOrdenCompraExtractor))
    // ORDEN COMPRA END

    // OTRO START
    let fileOtroExtractor = 0
    console.log(location.state?.files[0].hasOwnProperty("fileOtro"))

    if(location.state?.files[0].hasOwnProperty("fileOtro") === false) {
        console.log("fileOtro doesnt exist")
        fileOtroExtractor = "N/A"
    }
    else {
        console.log("fileOtro exists")
        fileOtroExtractor = location.state?.files[0].fileOtro[0].filename
        console.log((fileOtroExtractor))
    }
    console.log((fileOtroExtractor))
    // OTRO END
    // END OCT21 

    let totalCount = 0;
    let activeCount = 0; 
    let finishedCount = 0;
    let sleepingCount = 0;
    let cancelledCount = 0;

    let activeTotalRev = 0

    const activeArr = []
    const activeTot = []
    const activeParsed = []
    let sumActive = 0
    let activeElement = 0
    const activeArrLength = activeArr.length

    const finishedArr = []
    const finishedTot = []
    const finishedParsed = []
    let sumFinished = 0
    let finishedElement = 0

    const sleepingArr = []
    const sleepingTot = []
    const sleepingParsed = []
    let sumSleeping = 0
    let sleepingElement = 0

    const cancelledArr = []
    const cancelledTot = []
    const cancelledParsed = []
    let sumCancelled = 0
    let cancelledElement = 0

    // Iterate over the array using forEach
    projects.forEach(project => {
        totalCount++
        if(project.condicion === "Activo") {
            activeCount++
            activeArr.push(activeCount)
            console.log(project.total)

            activeTot.push(project.total)
            console.log(JSON.stringify(activeTot))
            console.log((activeTot))

            activeTot.map((element) => {
                activeElement = (element.replace(/[^\w\s]/gi, '', "")*0.01);
                console.log(activeElement)
            })
            activeParsed.push(activeElement)
            console.log(activeParsed)

            sumActive = activeParsed.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            console.log(sumActive);
        }
        else if(project.condicion === "Terminado") {
            finishedCount++
            finishedArr.push(finishedCount)
            console.log(project.total)

            finishedTot.push(project.total)
            console.log(JSON.stringify(finishedTot))

            finishedTot.map((element) => {
                finishedElement = (element.replace(/[^\w\s]/gi, '', "")*0.01);
                console.log(finishedElement)
            })
            finishedParsed.push(finishedElement)
            console.log(finishedParsed)

            sumFinished = finishedParsed.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            console.log(sumFinished);
        }
        else if(project.condicion === "Dormido") {
            sleepingCount++
            sleepingArr.push(sleepingCount)
            console.log(project.total)

            sleepingTot.push(project.total)
            console.log(JSON.stringify(sleepingTot))

            sleepingTot.map((element) => {
                sleepingElement = (element.replace(/[^\w\s]/gi, '', "")*0.01);
                console.log(sleepingElement)
            })
            sleepingParsed.push(sleepingElement)
            console.log(sleepingParsed)

            sumSleeping = sleepingParsed.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            console.log(sumSleeping);
        }
        else if(project.condicion === "Cancelado") {
            cancelledCount++
            cancelledArr.push(cancelledCount)
            console.log(project.total)

            cancelledTot.push(project.total)
            console.log(JSON.stringify(cancelledTot))

            cancelledTot.map((element) => {
                cancelledElement = (element.replace(/[^\w\s]/gi, '', "")*0.01);
                console.log(cancelledElement)
            })
            cancelledParsed.push(cancelledElement)
            console.log(cancelledParsed)

            sumCancelled = cancelledParsed.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            console.log(sumCancelled);
        }
        else {
            return
        }
        console.log(activeCount);
        console.log(activeArr);
    });
    console.log(totalCount);
    console.log(activeArr);
    console.log(finishedArr);
    console.log(sleepingArr);
    console.log(cancelledArr);

    // ACTIVE PIE CHART
    class ActivePie extends React.Component {
        constructor(props) {
          super(props);
    
          this.state = {
            fill: {
                colors: ["#f44336", "#ff9800", "#4caf50"]
              },
            series: [(activeArr.length),totalCount],
            options: {
              chart: {
                type: 'donut',
              },
              legend: {
                show: false
              },
              dataLabels: {
                enabled: false
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    show: false,
                  },
                  labels: {
                    show: false,
                  }
                }
              }],
              tooltip: {
                enabled: true,
              },
              colors: ["#14b014","#c5c5c7"]
            }
          };
        }
        render() {
          return (
            <div>
              <div id="chart" className="graphDivSize"> 
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
              </div>
              <div id="html-dist"></div>
            </div>
          );
        }
      }
    // ACTIVE PIE CHART END

    // FINISHED PIE CHART
    class FinishedPie extends React.Component {
        constructor(props) {
        super(props);

        this.state = {
            series: [(finishedArr.length),totalCount],
            options: {
            chart: {
                type: 'donut',
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            responsive: [{
                breakpoint: 480,
                options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false,
                },
                labels: {
                    show: false,
                }
                }
            }],
            tooltip: {
                enabled: true,
            },
            colors: ["#1b1be9","#c5c5c7"]
            }
        };
        }
        render() {
        return (
            <div>
            <div id="chart" className="graphDivSize"> 
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
            </div>
            <div id="html-dist"></div>
            </div>
        );
        }
    }
    // FINISHED PIE CHART END

    // SLEEPING PIE CHART
    class SleepingPie extends React.Component {
        constructor(props) {
        super(props);

        this.state = {
            series: [(sleepingArr.length),totalCount],
            options: {
            chart: {
                type: 'donut',
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            responsive: [{
                breakpoint: 480,
                options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false,
                },
                labels: {
                    show: false,
                }
                }
            }],
            tooltip: {
                enabled: true,
            },
            colors: ["#ffa600","#c5c5c7"]
            }
        };
        }
        render() {
        return (
            <div>
            <div id="chart" className="graphDivSize"> 
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
            </div>
            <div id="html-dist"></div>
            </div>
        );
        }
    }
    // SLEEPING PIE CHART END

    // CANCELLED PIE CHART
    class CancelledPie extends React.Component {
        constructor(props) {
        super(props);

        this.state = {
            series: [(cancelledArr.length),totalCount],
            options: {
            chart: {
                type: 'donut',
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            responsive: [{
                breakpoint: 480,
                options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false,
                },
                labels: {
                    show: false,
                }
                }
            }],
            tooltip: {
                enabled: true,
            },
            colors: ["#ff0000","#c5c5c7"]
            }
        };
        }
        render() {
        return (
            <div>
            <div id="chart" className="graphDivSize"> 
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
            </div>
            <div id="html-dist"></div>
            </div>
        );
        }
    }
    // CANCELLED PIE CHART END


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

            {/* ASLEEP SEP12 */}
            <div className="mainPageGraph">

                <div className="individualGraph">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Activos</h1>
                        <h1 className="graphAmountTitle">{activeArr.length}/{totalCount}</h1>
                        <h1 className="graphMoneyAmount">${sumActive.toLocaleString()}</h1>

                        {/* <h1 className="graphMoneyAmount">${sumActive.toFixed(2)}</h1> */}
                    </div>
                    {/* <ActiveChart></ActiveChart> */}
                    <ActivePie></ActivePie>
                </div>

                {/* <div className="THISGOESOFF!individualGraphTwo"> */}
                <div className="individualGraph">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Terminados</h1>
                        <h1 className="graphAmountTitle">{finishedArr.length}/{totalCount}</h1>
                        <h1 className="graphMoneyAmount">${sumFinished.toLocaleString()}</h1>
                    </div>
                    {/* <FinishedChart></FinishedChart> */}
                    <FinishedPie></FinishedPie>
                </div>

                {/* <div className="THISGOESOFF!individualGraphTwo"> */}
                <div className="individualGraph">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Dormidos</h1>
                        <h1 className="graphAmountTitle">{sleepingArr.length}/{totalCount}</h1>
                        <h1 className="graphMoneyAmount">${sumSleeping.toLocaleString()}</h1>
                    </div>
                    {/* <SleepingChart></SleepingChart> */}
                    <SleepingPie></SleepingPie>
                </div>

                <div className="individualGraphLast">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Cancelados</h1>
                        <h1 className="graphAmountTitle">{cancelledArr.length}/{totalCount}</h1>
                        <h1 className="graphMoneyAmount">${sumCancelled.toLocaleString()}</h1>
                    </div>
                    {/* <CanceledChart></CanceledChart> */}
                    <CancelledPie></CancelledPie>
                </div>

                {/* off oct03 */}
                {/* {projects.map((project, index) => {
                    let newCancelled = 0
                    if ((project.condicion === "Terminado")) {

                        oldValue.push(project.condicion)
                        console.log(oldValue)

                        newCancelled++
                        console.log(newCancelled)
          

                        oldValue.push(newCancelled)
                        console.log(oldValue)

                        let data = [...oldValue]
                        console.log(data)

                        const newArray=[]
                        for(let i=0;i<oldValue.length;i++)
                        {
                        newArray.push(oldValue[i])
                        }
                        newArray.push(project.condicion)
                        newArray.push(data)
                        console.log(newArray)


                        cancelledEmptyArr.push(project.condicion)
                        console.log(cancelledEmptyArr.push(project.condicion))
                        const fullArr = [...cancelledEmptyArr]
                        console.log(fullArr)

                        const filledArr = [project.condicion]
                        console.log(filledArr)
                        const newArr = [...filledArr]
                        newArr.push(project.condicion)
                        console.log(newArr)

                        return (
                            <div className="individualGraphLast">
                                <div className="graphInfo">
                                    <h1 className="graphTitle">Cancelados</h1>
                                    <h1 className="graphAmountTitle">0/0</h1>
                                    <h1 className="graphMoneyAmount">$0</h1>
                                </div>
                                <CanceledChart></CanceledChart>
                            </div>
                        )}
                })} */}
                {/* off oct03 */}
                
            </div>
            {/* ASLEEP SEP12 */}

            {/* NEW SEP17 */}
            <div>
                <table className="clientTable">
                    <thead>
                        <tr>
                            <div className="clientHeader">
                                <th>PROYECTO</th>
                                <th>DETALLES</th>
                            </div>
                        </tr>
                    </thead>
                    <tbody className="clientBody">
                        {/* PROJECT SIDE */}
                        <div className="client-card">
                            {projects.map((project, index) => {
                                if ((project.condicion === "Activo")) {
                                    return (
                                        <tr>
                                            <div className="projectCardDiv">
                                                <div className="activeProject">
                                                    <div className="activeProjectLabel">ACTIVO</div>
                                                </div>
                                                <div>
                                                    {/* ID & EDIT DIV */}
                                                    <div className="companyAndEditDiv">
                                                        {/* PROYECT ID */}
                                                        <td className="companyName" onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/main", {state: project})}}>{project.idProyecto}</td>
                                                        {/* EDIT PENCIL */}
                                                        <FontAwesomeIcon className="editPencil" icon={faPencil} onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/updateProject", {state: project})}}
                                                        />
                                                    </div>

                                                    {/* CLIENT DIV */}
                                                    <div className="main-clientRow">
                                                        <div className="clientCard-client">
                                                            {/* CLIENT */}
                                                            <FontAwesomeIcon icon={faUser}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.cliente}</td>
                                                        </div>
                                                        <div></div>
                                                    </div>

                                                    {/* LEADER & LOCATION DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* PROJECT LEADER */}
                                                            <FontAwesomeIcon icon={faSquareCheck}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.nombreEncargado}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* LOCATION */}
                                                            <FontAwesomeIcon icon={faLocationDot}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.ubicacion}</td>
                                                        </div>
                                                    </div>

                                                    {/* DATES DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* PROCESS START */}
                                                            <FontAwesomeIcon icon={faFlagCheckered}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.inicioProceso}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* TECH START */}
                                                            <FontAwesomeIcon icon={faWrench}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.inicioTecnico}</td>
                                                        </div>
                                                    </div>

                                                    {/* MONEY DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* SUBTOTAL */}
                                                            <FontAwesomeIcon icon={faChevronRight}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.subtotal}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* TOTAL */}
                                                            <FontAwesomeIcon icon={faEquals}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.total}</td>
                                                        </div>
                                                    </div>

                                                    {/* STATUS DIV */}
                                                    <div className="client-lastRow">
                                                        <div></div>
                                                        <div className="clientCard-status">
                                                            {/* STATUS */}
                                                            <FontAwesomeIcon icon={faClock}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.estatusProyecto}</td>
                                                        </div>
                                                    </div>

                                                    {/* new sep18 */}
                                                    <div className="cardTrashcan">
                                                        <div></div>
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
                                                    </div>
                                                    {/* end sep18 */}
                                                </div>
                                            </div>
                                        </tr>
                                    )   
                                }
                                else if ((project.condicion === "Terminado")) {
                                    return (
                                        <tr>
                                            <div className="projectCardDiv">
                                                <div className="finishedProject">
                                                    <div className="activeProjectLabel">TERMINADO</div>
                                                </div>
                                                <div>
                                                    {/* ID & EDIT DIV */}
                                                    <div className="companyAndEditDiv">
                                                        {/* PROYECT ID */}
                                                        <td className="companyName" onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/main", {state: project})}}>{project.idProyecto}</td>
                                                        {/* EDIT PENCIL */}
                                                        <FontAwesomeIcon className="editPencil" icon={faPencil} onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/updateProject", {state: project})}}
                                                        />
                                                    </div>

                                                    {/* CLIENT DIV */}
                                                    <div className="main-clientRow">
                                                        <div className="clientCard-client">
                                                            {/* CLIENT */}
                                                            <FontAwesomeIcon icon={faUser}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.cliente}</td>
                                                        </div>
                                                    </div>

                                                    {/* LEADER & LOCATION DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* PROJECT LEADER */}
                                                            <FontAwesomeIcon icon={faSquareCheck}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.nombreEncargado}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* LOCATION */}
                                                            <FontAwesomeIcon icon={faLocationDot}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.ubicacion}</td>
                                                        </div>
                                                    </div>

                                                    {/* DATES DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* PROCESS START */}
                                                            <FontAwesomeIcon icon={faFlagCheckered}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.inicioProceso}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* TECH START */}
                                                            <FontAwesomeIcon icon={faWrench}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.inicioTecnico}</td>
                                                        </div>
                                                    </div>

                                                    {/* MONEY DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* SUBTOTAL */}
                                                            <FontAwesomeIcon icon={faChevronRight}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.subtotal}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* TOTAL */}
                                                            <FontAwesomeIcon icon={faEquals}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.total}</td>
                                                        </div>
                                                    </div>

                                                    {/* STATUS DIV */}
                                                    <div className="client-lastRow">
                                                        <div></div>
                                                        <div className="clientCard-status">
                                                            {/* STATUS */}
                                                            <FontAwesomeIcon icon={faClock}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.estatusProyecto}</td>
                                                        </div>
                                                    </div>

                                                    {/* new sep18 */}
                                                    <div className="cardTrashcan">
                                                        <div></div>
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
                                                    </div>
                                                    {/* end sep18 */}
                                                </div>
                                            </div>
                                        </tr>
                                    )   
                                }
                                else if ((project.condicion === "Cancelado")) {
                                    return (
                                        <tr>
                                            <div className="projectCardDiv">
                                                <div className="cancelledProject">
                                                    <div className="activeProjectLabel">CANCELADO</div>
                                                </div>
                                                <div>
                                                    {/* ID & EDIT DIV */}
                                                    <div className="companyAndEditDiv">
                                                        {/* PROYECT ID */}
                                                        <td className="companyName" onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/main", {state: project})}}>{project.idProyecto}</td>
                                                        {/* EDIT PENCIL */}
                                                        <FontAwesomeIcon className="editPencil" icon={faPencil} onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/updateProject", {state: project})}}
                                                        />
                                                    </div>

                                                    {/* CLIENT DIV */}
                                                    <div className="main-clientRow">
                                                        <div className="clientCard-client">
                                                            {/* CLIENT */}
                                                            <FontAwesomeIcon icon={faUser}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.cliente}</td>
                                                        </div>
                                                    </div>

                                                    {/* LEADER & LOCATION DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* PROJECT LEADER */}
                                                            <FontAwesomeIcon icon={faSquareCheck}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.nombreEncargado}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* LOCATION */}
                                                            <FontAwesomeIcon icon={faLocationDot}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.ubicacion}</td>
                                                        </div>
                                                    </div>

                                                    {/* DATES DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* PROCESS START */}
                                                            <FontAwesomeIcon icon={faFlagCheckered}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.inicioProceso}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* TECH START */}
                                                            <FontAwesomeIcon icon={faWrench}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.inicioTecnico}</td>
                                                        </div>
                                                    </div>

                                                    {/* MONEY DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* SUBTOTAL */}
                                                            <FontAwesomeIcon icon={faChevronRight}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.subtotal}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* TOTAL */}
                                                            <FontAwesomeIcon icon={faEquals}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.total}</td>
                                                        </div>
                                                    </div>

                                                    {/* STATUS DIV */}
                                                    <div className="client-lastRow">
                                                        <div></div>
                                                        <div className="clientCard-status">
                                                            {/* STATUS */}
                                                            <FontAwesomeIcon icon={faClock}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.estatusProyecto}</td>
                                                        </div>
                                                    </div>

                                                    {/* new sep18 */}
                                                    <div className="cardTrashcan">
                                                        <div></div>
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
                                                    </div>
                                                    {/* end sep18 */}
                                                </div>
                                            </div>
                                        </tr>
                                    )   
                                }
                                else if ((project.condicion === "Dormido")) {
                                    return (
                                        <tr>
                                            <div className="projectCardDiv">
                                                <div className="hibernatingProject">
                                                    <div className="activeProjectLabel">DORMIDO</div>
                                                </div>
                                                <div>
                                                    {/* ID & EDIT DIV */}
                                                    <div className="companyAndEditDiv">
                                                        {/* PROYECT ID */}
                                                        <td className="companyName" onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/main", {state: project})}}>{project.idProyecto}</td>
                                                        {/* EDIT PENCIL */}
                                                        <FontAwesomeIcon className="editPencil" icon={faPencil} onClick={(event) => {
                                                            setFood(project)
                                                            navigate("/updateProject", {state: project})}}
                                                        />
                                                    </div>

                                                    {/* CLIENT DIV */}
                                                    <div className="main-clientRow">
                                                        <div className="clientCard-client">
                                                            {/* CLIENT */}
                                                            <FontAwesomeIcon icon={faUser}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.cliente}</td>
                                                        </div>
                                                    </div>

                                                    {/* LEADER & LOCATION DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* PROJECT LEADER */}
                                                            <FontAwesomeIcon icon={faSquareCheck}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.nombreEncargado}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* LOCATION */}
                                                            <FontAwesomeIcon icon={faLocationDot}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.ubicacion}</td>
                                                        </div>
                                                    </div>

                                                    {/* DATES DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* PROCESS START */}
                                                            <FontAwesomeIcon icon={faFlagCheckered}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.inicioProceso}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* TECH START */}
                                                            <FontAwesomeIcon icon={faWrench}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.inicioTecnico}</td>
                                                        </div>
                                                    </div>

                                                    {/* MONEY DIV */}
                                                    <div className="main-secondRow">
                                                        <div className="clientCard-client">
                                                            {/* SUBTOTAL */}
                                                            <FontAwesomeIcon icon={faChevronRight}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.subtotal}</td>
                                                        </div>
                                                        <div className="clientCard-location">
                                                            {/* TOTAL */}
                                                            <FontAwesomeIcon icon={faEquals}/>
                                                            <td className="locationText"onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.total}</td>
                                                        </div>
                                                    </div>

                                                    {/* STATUS DIV */}
                                                    <div className="client-lastRow">
                                                        <div></div>
                                                        <div className="clientCard-status">
                                                            {/* STATUS */}
                                                            <FontAwesomeIcon icon={faClock}/>
                                                            <td className="clientText" onClick={(event) => {
                                                                setFood(project)
                                                                navigate("/main", {state: project})}}>{project.estatusProyecto}</td>
                                                        </div>
                                                    </div>

                                                    {/* new sep18 */}
                                                    <div className="cardTrashcan">
                                                        <div></div>
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
                                                    </div>
                                                    {/* end sep18 */}
                                                </div>
                                            </div>
                                        </tr>
                                    )   
                                }
                                  
                                })} 
                            </div>
                        {/* PROJECT SIDE END */}

                        {/* DETAILS SIDE */}
                        <div className="previewWindow">

                            {/* HEADER DIV */}
                            <div className="mainPreviewHeader">
                                <label>{location.state?.idProyecto}</label>
                                <div>
                                    {/* INSERT PROGRESS BAR HERE */}
                                </div>
                            </div>

                            {/* PROGRESS BAR DIV */}
                            <div className="progressBarDiv">
                                <label>{location.state?.estatusProyecto}</label>
                                {projects.map((project, index) => {
                                if ((project.estatusProyecto === "Realizar Cotización" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    // <progress className="projectProgressBar"max="70" value="10"></progress>
                                    <progress className="projectProgressBar"max="100" value="10"></progress>

                                    )
                                }
                                else if ((project.estatusProyecto === "Recotización" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="5"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Cotización Aceptada" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="20"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Cotización Rechazada" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="5"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Levantamiento" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="30"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Pago Inicial Recibido" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="40"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Pago Intermedio Recibido" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="50"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Pago Final Recibido" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="60"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Agendar Instalación" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="70"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Instalación Realizada" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="80"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Proyecto Finalizado" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="90"></progress>
                                    )
                                }
                                else if ((project.estatusProyecto === "Agendar Mantenimiento" && project.idProyecto === location.state?.idProyecto)) {
                                    return (
                                    <progress className="projectProgressBar"max="100" value="100"></progress>
                                    )
                                }
                            })}
                            </div>

                            {/* DESCRIPTION DIV */}
                            <div className="previewContactSpec">
                                <label className="contactTitle">Descripción del Proyecto</label>
                                <p>{location.state?.comentarios}</p>
                            </div>

                            {/* DATA DIV */}
                            <label className="activeTitle">Detalles del Proyecto</label>
                            <div className="mainFiscalDivs">
                                {/* DATA DIV */}
                                <div className="projectMainSpec">
                                    <div className="mainSpecElement">
                                        <label>Nombre o ID: </label>
                                        <label className="mainSpecAnswer">{location.state?.idProyecto}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Encargado de Proyecto: </label>
                                        <label className="mainSpecAnswer">{location.state?.nombreEncargado}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Folio Aceptado: </label>
                                        <label className="mainSpecAnswer">{location.state?.folioAceptado}</label>
                                    </div>
                                </div>
                                {/* DATES DIV */}
                                <div className="projectMainSpec">
                                    <div className="mainSpecElement">
                                        <label>Inicio del Proceso: </label>
                                        <label className="mainSpecAnswer">{location.state?.inicioProceso}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Inicio Técnico: </label>
                                        <label className="mainSpecAnswer">{location.state?.inicioTecnico}</label>
                                    </div>
                                </div>
                            </div>

                            {/* DOCS DIV */}
                            <div>
                                <label className="activeTitle">Documentación</label>
                                <div className="main-FileButtonDiv">
                                    {/* <label>{location.state?.file}</label> */}
                                    {/* NEW OCT22 */}
                                    <div className="fileDiv">
                                        <div className="labelFileAndButtonHeader">
                                            <label>Tipo de Documento</label>
                                            <label>Nombre</label>
                                            <label>Ver Documento</label>
                                        </div>
                                        <div className="labelFileAndButton">
                                            <label>Cédula de Identificación Fiscal</label>
                                            <label>{fileCIFExtractor}</label>
                                            <button onClick={viewCIF} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                        </div>
                                        <div className="labelFileAndButton">
                                            <label>Constancia de Situación Fiscal</label>
                                            <label>{fileCSFExtractor}</label>
                                            <button onClick={viewCSF} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                        </div>
                                        <div className="labelFileAndButton">
                                            <label>Carta de Conformidad</label>
                                            <label>{fileCartaConformidadExtractor}</label>
                                            <button onClick={viewCartaConformidad} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                        </div>
                                        <div className="labelFileAndButton">
                                            <label>Cotización</label>
                                            <label>{fileCotizacionExtractor}</label>
                                            <button onClick={viewCotizacion} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                        </div>
                                        <div className="labelFileAndButton">
                                            <label>Factura</label>
                                            <label>{fileFacturaExtractor}</label>
                                            <button onClick={viewFactura} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                        </div>
                                        <div className="labelFileAndButton">
                                            <label>Orden de Compra</label>
                                            <label>{fileOrdenCompraExtractor}</label>
                                            <button onClick={viewOrdenCompra} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                        </div>
                                        <div className="labelFileAndButton">
                                            <label>Otro</label>
                                            <label>{fileOtroExtractor}</label>
                                            <button onClick={viewOtro} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                        </div>
                                    </div>
                                    {/* WND OCT22 */}
                                    {/* <button onClick={viewPDF} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button> */}
                                </div>
                            </div>

                            {/* <label className="activeTitle">Documentación</label>
                            <div>

                            </div> */}

                        </div>
                        {/* DETAILS SIDE END */}
                    </tbody>
                </table>
            </div>
            {/* END SEP17 */}

            {/* ASLEEP SEP12 */}
            {/* <div className="mainPageGraph">

                <div className="individualGraph">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Activos</h1>
                        <h1 className="graphAmountTitle">0/0</h1>
                        <h1 className="graphMoneyAmount">$0</h1>
                    </div>
                    <ActiveChart></ActiveChart>
                </div>

                <div className="THISGOESOFF!individualGraphTwo">
                <div className="individualGraph">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Terminados</h1>
                        <h1 className="graphAmountTitle">0/0</h1>
                        <h1 className="graphMoneyAmount">$0</h1>
                    </div>
                    <FinishedChart></FinishedChart>
                </div>

                <div className="THISGOESOFF!individualGraphTwo">
                <div className="individualGraph">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Dormidos</h1>
                        <h1 className="graphAmountTitle">0/0</h1>
                        <h1 className="graphMoneyAmount">$0</h1>
                    </div>
                    <SleepingChart></SleepingChart>
                </div>

                <div className="THISGOESOFF!individualGraphFour">
                <div className="individualGraphLast">
                    <div className="graphInfo">
                        <h1 className="graphTitle">Cancelados</h1>
                        <h1 className="graphAmountTitle">0/0</h1>
                        <h1 className="graphMoneyAmount">$0</h1>
                    </div>
                    <CanceledChart></CanceledChart>
                </div>
            </div> */}
            {/* ASLEEP SEP12 */}

            {/* OLD OFF SEP20 */}
            {/* <div>
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
                        {getSortedArray(projects).map((project, index) => (
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
                        ))}
                    </tbody>
                </table>
            </div> */}
             {/* OLD OFF SEP20 */}
        
            <Footer/>
        </div>
    )
}

export default MainProjects
// NEW COMMIT END

// ORIGINAL COMMIT

// import { useEffect, useState, useContext } from "react"
// import React from "react";

// import { useNavigate } from "react-router-dom";

// import Header from "./Header"
// import Footer from "./Footer"

// import { faTrash } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// import { faChartPie } from "@fortawesome/free-solid-svg-icons"
// import Caret from "./Icons/Caret";

// // new jun20
// import ApexChart from "./chartTest";
// import ActiveChart from "./Charts/activeChart";
// import FinishedChart from "./Charts/finishedChart";
// import SleepingChart from "./Charts/sleepingChart";
// import CanceledChart from "./Charts/canceledChart";
// // import TestChart from "./chartTest";
// // end jun20


// function MainProjects() {
//     // NEW APR19
//     const headers =[
//         {
//             id: 1,
//             KEY: "cliente",
//             LABEL: "CLIENTE"
//         },
//         {
//             id: 2,
//             KEY: "idProyecto",
//             LABEL: "PROYECTO"
//         }, 
//         {
//             id: 3,
//             KEY: "inicioProceso",
//             LABEL: "INICIO PROCESO"
//         },
//         {
//             id: 4,
//             KEY: "inicioTecnico",
//             LABEL: "INICIO TÉCNICO"
//         },
//         {
//             id: 5,
//             KEY: "nombreEncargado",
//             LABEL: "ENCARGADO"
//         },
//         {
//             id: 6,
//             KEY: "folioAceptado",
//             LABEL: "FOLIO"
//         },
//         // {
//         //     id: 7,
//         //     KEY: "file",
//         //     LABEL: "ARCHIVOS"
//         // },
//         {
//             id: 7,
//             KEY: "estatusProyecto",
//             LABEL: "ESTATUS"
//         },
//         // new may02
//         {
//             id: 8,
//             KEY: "subtotal",
//             LABEL: "SUBTOTAL"
//         },
//         {
//             id: 9,
//             KEY: "total",
//             LABEL: "TOTAL"
//         },
//         // end may02
//         // {
//         //     id: 11,
//         //     KEY: "comentarios",
//         //     LABEL: "COMENTARIOS"
//         // },
//         // OFF APR23
//         // {
//         //     id: 10,
//         //     KEY: "borrar",
//         //     LABEL: "BORRAR"
//         // }
//         // OFF APR23
//     ]
//     // END APR19
//     const navigate = useNavigate()

//     let [food, setFood] = useState()

//     useEffect(() => {
//         console.log(JSON.stringify(food))
//     })

//     const [selectedRow, setSelectedRow] = React.useState(-1);

//     let [projects, setProjects] = useState([])

//     console.log(projects)

//     // NEW APR21
//     const [sort, setSort] = useState({ keyToSort: 'cliente', direction: 'asc'})
//     // END APR21

//     useEffect(() => {
//         getAllProjects()
//     },[])

//     const getAllProjects =()=> {
//         fetch('https://orion-backend-z5yv.onrender.com/project')
//         // fetch('http://localhost:4000/project')
//         .then((response) => response.json())
//         .then((data) => {
//             setProjects(data)
//             console.log(data)
//             if(data.message === undefined) {
//                 setFood()
//             }
//             else {
//                 setFood(data)
//             }
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     }

//     const deleteProject = (id, cliente, idProyecto) => {
//         if(window.confirm(`Estás seguro que quieres borrar ${cliente} - ${idProyecto}`)) {
            
//             fetch("https://orion-backend-z5yv.onrender.com/deleteProject", {
//             // fetch("http://localhost:4000/deleteProject", {
//                 method: "POST",
//                 crossDomain: true,
//                 headers: {
//                     "Content-Type": "application/json",
//                     Accept: "application/json",
//                     "Access-Control-Allow-Origin": "*",
//                 },
//                 body: JSON.stringify({
//                     userid: id,
//                 }),
//             })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     getAllProjects()
//                     alert(`Proyecto ${idProyecto} del cliente ${cliente} eliminado exitosamente`)

//                 })
//         } else{

//         }
//     }

//     // NEW JUL02
//     // const infoTest = project_forms.aggregate([
//     //     {
//     //         $match:{nombreEncargado: "Cesar Flores"}
//     //     }
//     // ])

//     // console.log("this getting printed?" + infoTest)
//     // END JUL02

//     // NEW APR21
//     function handleHeaderClick(header) {
//         setSort({
//             keyToSort: header.KEY,
//             direction: header.KEY === sort.keyToSort ? sort.direction === 'asc' ? 'desc' : 'asc' : 'desc'
//         })
//     }

//     function getSortedArray(arrayToSort) {
//         if(sort.direction === 'asc') {
//             return arrayToSort.sort((a,b) => (a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1))
//         }
//         return arrayToSort.sort((a,b) => (a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1))
//     }
//     // END APR21

//     //NEW APR02 --> OFF APR20
//     // const categories = [
//     //     {value: "0", text: "Seleccionar filtro"},
//     //     {value: "1", text: "Cliente"},
//     //     {value: "2", text: "Inicio Proceso"},
//     //     {value: "3", text: "Inicio Tecnico"},
//     //     {value: "4", text: "Encargado"},
//     //     {value: "5", text: "Estatus"}
//     // ]

//     // const options = categories.map((option) => {
//     //     return <option value={option.value}>{option.text}</option>
//     // })

//     // const [catValue, setCatValue] = useState()
//     //END APR02

//     return (
//         <div>
//             <Header/>
//             <div className="mainSubHeader">
//                 <h1 className="mainSubHeaderTitle">Panel de proyectos</h1> 
//                 {/* OFF ON APR20 */}
//                 {/* <select className="filterDropDown" value={catValue} onChange={(e) => setCatValue(e.target.value)}>{options}</select> */}
//                 <a href="/project"><button className="btnProject">+</button></a>
//                 {/* <a href="/graph"><button className="btnGraph fa-sm"><FontAwesomeIcon icon={faChartPie} /></button></a> */}
//             </div>

//             {/* new jun20 */}
//             {/* <div> */}
//             <div className="mainPageGraph">

//                 <div className="individualGraph">
//                     <div className="graphInfo">
//                         <h1 className="graphTitle">Activos</h1>
//                         <h1 className="graphAmountTitle">0/0</h1>
//                         <h1 className="graphMoneyAmount">$0</h1>
//                     </div>
//                     <ActiveChart></ActiveChart>
//                 </div>

//                 {/* <div className="individualGraphTwo"> */}
//                 <div className="individualGraph">
//                     <div className="graphInfo">
//                         <h1 className="graphTitle">Terminados</h1>
//                         <h1 className="graphAmountTitle">0/0</h1>
//                         <h1 className="graphMoneyAmount">$0</h1>
//                     </div>
//                     <FinishedChart></FinishedChart>
//                 </div>

//                 {/* <div className="individualGraphTwo"> */}
//                 <div className="individualGraph">
//                     <div className="graphInfo">
//                         <h1 className="graphTitle">Dormidos</h1>
//                         <h1 className="graphAmountTitle">0/0</h1>
//                         <h1 className="graphMoneyAmount">$0</h1>
//                     </div>
//                     <SleepingChart></SleepingChart>
//                 </div>

//                 {/* <div className="individualGraphFour"> */}
//                 <div className="individualGraphLast">
//                     <div className="graphInfo">
//                         <h1 className="graphTitle">Cancelados</h1>
//                         <h1 className="graphAmountTitle">0/0</h1>
//                         <h1 className="graphMoneyAmount">$0</h1>
//                     </div>
//                     <CanceledChart></CanceledChart>
//                 </div>
//             </div>
//             {/* end jun20 */}

//             <div>
//                 <table className="tableProjects">
//                     <thead>
//                         <tr>
//                             {headers.map((header, index) => (
//                                 <>
//                                 <th key={index} onClick={() => handleHeaderClick(header)}>
//                                     <div className="header-container">
//                                         <span>{header.LABEL}</span>

//                                         {header.KEY === sort.keyToSort && (
//                                             <Caret direction={sort.keyToSort === header.KEY ? sort.direction : 'asc'}/>
//                                         )}
//                                     </div>  
//                                 </th>
//                                 </>
//                             ))}
//                             <th className="header-erase">BORRAR</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* change row for projecy */}
//                         {/* change projects.map to getSortedArray */}
//                         {getSortedArray(projects).map((project, index) => (
//                             <tr key={index} onClick={() => setSelectedRow(project.cliente)} className={"clickable-row ".concat(selectedRow === project.cliente ? "selected" : "")}>
//                                 {headers.map((header, index) => {
//                                     return (
//                                         <>
//                                             <td key={index} onClick={(event) => {
//                                                 setFood(project)
//                                                 navigate("/updateProject", {state: project})
//                                             }}>
//                                                 {/* change row for project */}
//                                                 {project[header.KEY]}
//                                             </td>
//                                         </>  
//                                     )
//                                 })}
//                                 <td>
//                                     <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
//                                 </td>
//                             </tr>
//                         ))}


//                         {/* {projects.map((project, index) => {
//                             return (
//                                 <tr key={index} onClick={() => setSelectedRow(project.cliente)} className={"clickable-row ".concat(selectedRow === project.cliente ? "selected" : "")}>
//                                     <td onClick={(event) => {
//                                         setFood(project)
//                                         navigate("/updateProject", {state: project})}}>{project.cliente}</td>
//                                     <td onClick={(event) => {
//                                         setFood(project)
//                                         navigate("/updateProject", {state: project})}}>{project.idProyecto}</td>
//                                     <td onClick={(event) => {
//                                         setFood(project)
//                                         navigate("/updateProject", {state: project})}}>{project.inicioProceso}</td>
//                                     <td onClick={(event) => {
//                                         setFood(project)
//                                         navigate("/updateProject", {state: project})}}>{project.inicioTecnico}</td>
//                                     <td onClick={(event) => {
//                                         setFood(project)
//                                         navigate("/updateProject", {state: project})}}>{project.nombreEncargado}</td>
//                                     <td onClick={(event) => {
//                                         setFood(project)
//                                         navigate("/updateProject", {state: project})}}>{project.folioAceptado}</td>
//                                     <td onClick={(event) => {
//                                         setFood(project)
//                                         navigate("/updateProject", {state: project})}}>{project.file}</td>
//                                     <td onClick={(event) => {
//                                         setFood(project)
//                                         navigate("/updateProject", {state: project})}}>{project.estatusProyecto}</td>
//                                     <td onClick={(event) => {
//                                         setFood(project)
//                                         navigate("/updateProject", {state: project})}}>{project.comentarios}</td>
//                                     <td>
//                                         <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
//                                     </td>
//                                 </tr>
//                             )
//                         })} */}
//                     </tbody>
//                 </table>
//             </div>
        
//             <Footer/>
//         </div>
//     )
// }

// export default MainProjects

// ORIGINAL COMMIT END
