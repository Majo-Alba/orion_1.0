// NEW COMMIT START
import { useEffect, useState, useContext } from "react"
import React from "react";

import { useNavigate, useLocation  } from "react-router-dom";

import Header from "./Header"
import Footer from "./Footer"

// import { faTrash } from "@fortawesome/free-solid-svg-icons"
// import { faEnvelope, faLocationDot, faPhone, faTag, faTrash, faUser, faPencil } from "@fortawesome/free-solid-svg-icons"
import { faUser, faTrash, faEnvelope, faLocationDot, faPhone, faTag, faPencil, faSquareCheck, faFlagCheckered, faScrewdriverWrench, faDollarSign, faChevronRight, faClock, faEquals, faWrench, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faChartPie } from "@fortawesome/free-solid-svg-icons"
import Caret from "./Icons/Caret";


function Accounting() {

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
    const navigate = useNavigate()

    let [food, setFood] = useState()

    useEffect(() => {
        console.log(JSON.stringify(food))
    })

    const [selectedRow, setSelectedRow] = React.useState(-1);

    let [projects, setProjects] = useState([])

    console.log(projects)

    const [sort, setSort] = useState({ keyToSort: 'cliente', direction: 'asc'})

    const location = useLocation()
    console.log(location)

    // NEW SEP22

    // const payedAlready = (((location.state?.pagado))?.replace(/[^\w\s]/gi, '', ""))
    // const toPay = (((location.state?.total))?.replace(/[^\w\s]/gi, '', ""))
    // const downPayment = (((location.state?.anticipo))?.replace(/[^\w\s]/gi, '', ""))

    // const payedDecimal = (payedAlready * 0.01)
    // const toPayDecimal = (toPay * 0.01)
    // const downPaymentDecimal = (downPayment * 0.01)

    // console.log(payedDecimal)
    // console.log(toPayDecimal)

    // // const progressBarFillValue = (parseFloat((payedAlready * 100) / toPay))
    // const progressBarFillValue = (parseFloat((downAndPayedTot * 100) / toPay))
    // console.log((progressBarFillValue))

    function handleInput(event) {
        setFood((prevState) => {
            return {...prevState, [event.target.name]:event.target.value}
        })
    }

    const [item,setItem]=React.useState([{iname:"",date:"",bank:"",amount:"",total:0}])

    function addItem()
    {
        // const newItem={iname:"",model:"",quantity:"",amount:"",total:0}
        const newItem={iname:"",date:"",bank:"",amount:"",total:0}
        setItem((oldValue) => {
            const newArray=[]
            for(let i=0;i<oldValue.length;i++)
            {
            newArray.push(oldValue[i])
            }
            newArray.push(newItem)
            return newArray
    })
    }

    function handlePaymentChange(index,event)
    {
        //Storing currect item value in a array object 
        let data = [...item]
        
        //Getting the changed input box name and their corresponding value
        data[index][event.target.name] = event.target.value
        
        //Calculating the total value given a function 
        data[index]['total']=(data[index]['amount'] * 1).toFixed(2)
        
        //Setting the new value accordingly
        setItem(data)
    }

    function removePaymentEntry(index)
    {
        //Storing old items value in a variable
        let data=[...item]
        
        //Removing the array object with index value form the stored variable
        data.splice(index,1)
        
        //Storing it into the state
        setItem(data)
    }

    const[billTotal,setBillTotal]=React.useState(0)

    React.useEffect(()=>{
        //Setting total bill amount
        setBillTotal(()=>{
        
            //Getting copy of all item with its corresponding total
        let data = [...item];
        
        //Initializing temporary variable
        let temp=0;
        
        //Parsing through each item to calculate bill total based on each item total amount
        for(let i=0;i<data.length;i++)
        {
            temp= parseFloat(data[i].total) + temp;
        }
        
        return temp.toFixed(2)
        })
    },[item])

    // END SEP22

    // new sep25
    //NEW ARRAY OF ALL PAYMENTS
    // function paymentArrayCreation(index, event) {
    //     const pastItems = (location.state?.item)
    //     console.log(pastItems)
    
    //     const pastArray = [...pastItems]
    //     console.log(pastArray)
    
    //     const newPayments = [...item]
    //     console.log(newPayments)
    
    //     const combinedArray = []
    //     combinedArray.push(pastArray)
    //     combinedArray.push(newPayments)
    //     console.log(combinedArray)
    // }

    // const pastItems = JSON.stringify(location.state?.item)

    let parsedPastItems = []
    
    function testFunction() {
        const pastItems = (location.state?.item)?.flat()
        if(pastItems=== undefined) {return}
        else {
            const pastItems = (location.state?.item)?.flat(Infinity)
            console.log(pastItems)

            const stringifyPastItems = JSON.stringify(pastItems?.flat(Infinity))
            // const parsedPastItems = JSON.parse(stringifyPastItems)
            parsedPastItems = JSON.parse(stringifyPastItems)

            console.log(stringifyPastItems)
            console.log(parsedPastItems)
        }
    }

    testFunction();
    
    console.log(parsedPastItems)
// example
    // activeTot.push(project.total)
    //         console.log(JSON.stringify(activeTot))
    //         console.log((activeTot))

    //         activeTot.map((element) => {
    //             activeElement = (element.replace(/[^\w\s]/gi, '', "")*0.01);
    //             console.log(activeElement)
    //         })
    //         activeParsed.push(activeElement)
    //         console.log(activeParsed)

    //         sumActive = activeParsed.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    //         console.log(sumActive);
// exmple

    const payedArr = []
    let payedElement = 0
    const payedParsed = []
    let sumPayed = 0

    parsedPastItems.forEach(project => {
        payedArr.push(project.total)
        console.log(payedArr)

        payedArr.map((element) => {
            payedElement = (element.replace(/[^\w\s]/gi, '', "")*0.01);
            console.log(payedElement)
        })
        payedParsed.push(payedElement)
        console.log(payedParsed)
    })


    sumPayed = payedParsed.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(sumPayed);

    const totalPayedLiveArr = []
    let totalPayedLive = 0

    console.log(totalPayedLiveArr)
    totalPayedLiveArr.push(sumPayed)
    totalPayedLiveArr.push(JSON.parse(billTotal))
    console.log(totalPayedLiveArr)

    totalPayedLive = totalPayedLiveArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(totalPayedLive);

    const downAndPayedArr = []
    const downpaymentBase = (((location.state?.anticipo))?.replace(/[^\w\s]/gi, '', ""))

    let downpaymentParsed = (downpaymentBase * 0.01)
    // let downpaymentParsed = JSON.parse(downpaymentBase)
    console.log(downpaymentParsed)
    let downAndPayedTot = 0

    downAndPayedArr.push((downpaymentParsed))

    // downAndPayedArr.push(JSON.parse(downpaymentBase))
    downAndPayedArr.push(totalPayedLive)
    console.log(downAndPayedArr)

    downAndPayedTot = downAndPayedArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(downAndPayedTot);
    
    const payedAlready = (((location.state?.pagado))?.replace(/[^\w\s]/gi, '', ""))
    const toPay = (((location.state?.total))?.replace(/[^\w\s]/gi, '', ""))
    const downPayment = (((location.state?.anticipo))?.replace(/[^\w\s]/gi, '', ""))

    console.log(toPay*0.01)

    const payedDecimal = (payedAlready * 0.01)
    const toPayDecimal = (toPay * 0.01)
    const downPaymentDecimal = (downPayment * 0.01)

    console.log(payedDecimal)
    console.log(toPayDecimal)

    // const progressBarFillValue = (parseFloat((payedAlready * 100) / toPay))
    const progressBarFillValue = (parseFloat((downAndPayedTot * 100) / (toPay * 0.01)))
    console.log((progressBarFillValue))
 
    // const itemToForm = (event) => {
    //     const pastItems = (location.state?.item)?.flat()
    //     if(pastItems=== undefined) {return}
    //     else {
    //         const pastItems = (location.state?.item)?.flat(Infinity)
    //         console.log(pastItems)

    //         const stringifyPastItems = JSON.stringify(pastItems?.flat(Infinity))
    //         const parsedPastItems = JSON.parse(stringifyPastItems)
    //         console.log(stringifyPastItems)
    //         console.log(parsedPastItems)
    //     }
    // }


    // working oct02
    // const pastItems = (location.state?.item)?.flat()
    // console.log(pastItems)

    // const stringifyPastItems = JSON.stringify(pastItems?.flat())
    // const parsedPastItems = JSON.parse(stringifyPastItems)
    // console.log(parsedPastItems)
    // console.log(stringifyPastItems)
    // working oct02


    // const pastArray = [...pastItems]
    // console.log(pastArray)

    // const newPayments = [...item]
    // console.log(newPayments)

    // const combinedArray = []
    // combinedArray.push(pastArray)
    // combinedArray.push(newPayments)
    // console.log(combinedArray)
    // edn sep25
 

    useEffect(() => {
        getAllProjects()
        // new sep23
        // setItem(location.state?.item)
        // end sep23
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

    // new sep23
    const handleItemChange = (event) => { 
        event.preventDefault()
        console.log(location.state?.item)
        setItem(event.target?.value)
        console.log(item)
    }

    const updateData = (event) => {

        const pastItems = [location.state?.item]
        console.log(pastItems)
    
        const pastArray = [...pastItems]
        console.log(pastArray)
    
        const newPayments = [...item]
        console.log(newPayments)
    
        const combinedArray = []
        combinedArray.push(pastArray)
        combinedArray.push(newPayments)
        console.log(combinedArray)

        event.preventDefault()
        fetch("https://orion-backend-z5yv.onrender.com/updateProject",{
        // fetch("http://localhost:4000/updateProject", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: location.state._id,
                item: combinedArray,
            }),
        })
            .then((res) => res.json())
            .then((data => {
                console.log(data)
                window.location.href="/main"
            }))
    }
    // end sep23

    return (
        <div>
            {/* <button onClick={itemToForm()}></button> */}
            <Header/>
            <div className="mainSubHeader">
                <h1 className="accountingTitle">Panel Contable</h1> 
                {/* OFF ON APR20 */}
                {/* <select className="filterDropDown" value={catValue} onChange={(e) => setCatValue(e.target.value)}>{options}</select> */}
                {/* <a href="/project"><button className="btnProject">+</button></a> */}
                {/* <a href="/graph"><button className="btnGraph fa-sm"><FontAwesomeIcon icon={faChartPie} /></button></a> */}
            </div>

            {/* NEW SEP22 */}
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
                                  return (
                                    <tr>
                                        <div>
                                            {/* ID & EDIT DIV */}
                                            <div className="companyAndEditDiv">
                                                {/* PROYECT ID */}
                                                <td className="companyName" onClick={(event) => {
                                                    setFood(project)
                                                    navigate("/accounting", {state: project})}}>{project.idProyecto}</td>
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
                                                        navigate("/accounting", {state: project})}}>{project.cliente}</td>
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
                                                        navigate("/accounting", {state: project})}}>{project.nombreEncargado}</td>
                                                </div>
                                                <div className="clientCard-location">
                                                    {/* LOCATION */}
                                                    <FontAwesomeIcon icon={faLocationDot}/>
                                                    <td className="locationText"onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/accounting", {state: project})}}>{project.ubicacion}</td>
                                                </div>
                                            </div>

                                            {/* DATES DIV */}
                                            {/* <div className="main-secondRow">
                                                <div className="clientCard-client"> */}
                                                    {/* PROCESS START */}
                                                    {/* <FontAwesomeIcon icon={faFlagCheckered}/>
                                                    <td className="clientText" onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/main", {state: project})}}>{project.inicioProceso}</td>
                                                </div>
                                                <div className="clientCard-location"> */}
                                                    {/* TECH START */}
                                                    {/* <FontAwesomeIcon icon={faWrench}/>
                                                    <td className="locationText"onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/main", {state: project})}}>{project.inicioTecnico}</td>
                                                </div>
                                            </div> */}

                                            {/* MONEY DIV */}
                                            <div className="main-secondRow">
                                                <div className="clientCard-client">
                                                    {/* SUBTOTAL */}
                                                    <FontAwesomeIcon icon={faChevronRight}/>
                                                    <td className="clientText" onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/accounting", {state: project})}}>{project.subtotal}</td>
                                                </div>
                                                <div className="clientCard-location">
                                                    {/* TOTAL */}
                                                    <FontAwesomeIcon icon={faEquals}/>
                                                    <td className="locationText"onClick={(event) => {
                                                        setFood(project)
                                                        navigate("/accounting", {state: project})}}>{project.total}</td>
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
                                                        navigate("/accounting", {state: project})}}>{project.estatusContable}</td>
                                                </div>
                                            </div>

                                            {/* new sep18 */}
                                            <div className="cardTrashcan">
                                                <div></div>
                                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/>
                                            </div>
                                            {/* end sep18 */}
                                        </div>
                                    </tr>
                                )  
                            })}
                        </div>
                        {/* PREVIEW WINDOW */}

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
                                {/* <label>{location.state?.pagado}</label> */}
                                <label>${downAndPayedTot}</label>
                                <progress className="projectProgressBar"max="100" value={progressBarFillValue}></progress>
                                {/* <progress className="projectProgressBar"max="100" value="50"></progress> */}
                                <label className="toPayLabel">{location.state?.total}</label>
                            </div>

                            {/* DESCRIPTION DIV */}
                            <div className="previewContactSpec">
                                <label className="contactTitle">Descripción del Proyecto</label>
                                <p>{location.state?.comentarios}</p>
                            </div>

                            {/* GENERALS DIV */}
                            <label className="activeTitle">Datos Generales</label>
                            <div className="mainFiscalDivs">
                                {/* GENERALS DIV */}
                                <div className="projectMainSpec">
                                    <div className="mainSpecElement">
                                        <label>Empresa: </label>
                                        <label className="mainSpecAnswer">{location.state?.empresa}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Cliente: </label>
                                        <label className="mainSpecAnswer">{location.state?.cliente}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>R.F.C.: </label>
                                        <label className="mainSpecAnswer">{location.state?.razonSocial}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Teléfono: </label>
                                        <label className="mainSpecAnswer">{location.state?.numeroTelefono}</label>
                                    </div>
                                </div>
                                {/* DATES DIV */}
                                <div className="projectMainSpec">
                                    <div className="mainSpecElement">
                                        <label>Dirección: </label>
                                        <label className="mainSpecAnswer">{location.state?.direccion}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Sucursal: </label>
                                        <label className="mainSpecAnswer">{location.state?.sucursal}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Ubicación: </label>
                                        <label className="mainSpecAnswer">{location.state?.ubicacion}</label>
                                    </div>
                                </div>
                            </div>

                            {/* BILLING DATA DIV */}
                            <label className="activeTitle">Datos de Facturación</label>
                            <div className="billingDataDiv">
                                <div className="mainFiscalDivs">
                                    {/* BILLING DATA DIV */}
                                    <div className="projectMainSpec">
                                        <div className="mainSpecElement">
                                            <label>Correo de Facturación: </label>
                                            <label className="mainSpecAnswer">{location.state?.correoFacturacion}</label>
                                        </div>
                                        <div className="mainSpecElement">
                                            <label>Tipo de Factura: </label>
                                            <label className="mainSpecAnswer">{location.state?.tipoFactura}</label>
                                        </div>
                                        <div className="mainSpecElement">
                                            <label>Método de Pago: </label>
                                            <label className="mainSpecAnswer">{location.state?.metodoPago}</label>
                                        </div>
                                    </div>
                                    {/* DATES DIV */}
                                    <div className="projectMainSpec">
                                        <div className="mainSpecElement">
                                            <label>Régimen Fiscal: </label>
                                            <label className="mainSpecAnswer">{location.state?.regimenFiscal}</label>
                                        </div>
                                        <div className="mainSpecElement">
                                            <label>Forma de Pago: </label>
                                            <label className="mainSpecAnswer">{location.state?.formaPago}</label>
                                        </div>
                                        <div className="mainSpecElement">
                                            <label>Uso CFDI: </label>
                                            <label className="mainSpecAnswer">{location.state?.usoCFDI}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FINANCIAL DIV */}
                            <label className="activeTitle">Datos Financieros</label>
                            <div className="mainFiscalDivs">
                                {/* FINANCIAL 1 DIV */}
                                <div className="projectMainSpec">
                                    <div className="mainSpecElement">
                                        <label>Subtotal: </label>
                                        <label className="mainSpecAnswer">{location.state?.subtotal}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>I.V.A. Generado: </label>
                                        <label className="mainSpecAnswer">{location.state?.ivaGenerado}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Total: </label>
                                        <label className="mainSpecAnswer">{location.state?.total}</label>
                                    </div>
                                </div>
                                {/* DATES DIV */}
                                <div className="projectMainSpec">
                                    <div className="mainSpecElement">
                                        <label>Plazos de Pago: </label>
                                        <label className="mainSpecAnswer">{location.state?.plazosDePago}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Anticipo: </label>
                                        <label className="mainSpecAnswer">{location.state?.anticipo}</label>
                                    </div>
                                    <div className="mainSpecElement">
                                        <label>Pendiente de Pago: </label>
                                        {/* STILL MISSING MINUS EVERYTHING THAT GETS PAYED WITHIN CLIENTS RECORD */}
                                        <label className="mainSpecAnswer">${(toPayDecimal)-(downPaymentDecimal)-(sumPayed)}</label>
                                    </div>
                                </div>
                            </div>

                            {/* FINANCIAL DIV */}
                            <label className="activeTitle">Historial de Pagos</label>
                            {/* off on new sep25 */}
                            {/* <span>{stringifyPastItems}</span> */}
                            {/* {stringifyPastItems.map((pastItem, index) => (
                                <div key={index}>
                                    <span>here</span>
                                    <span>{pastItem.iname}</span>
                                </div>
                            ))} */}
                            {/* {parsedPastItems.map((pastItem, index) => (
                                <div key={index}>
                                    <span>{pastItem.iname}</span>
                                    <span>{pastItem.date}</span>
                                    <span>{pastItem.bank}</span>
                                    <span>{pastItem.total}</span>

                                </div>
                            ))} */}
                            {/* off on end sep25 */}

                            <div className="tableDivScroll">
                                    <table id="materialsTable" className="materialsTable">
                                        <thead>
                                            <tr className="invoiceTableHeader">
                                                <th>CONCEPTO</th>
                                                <th>FECHA</th>
                                                <th>BANCO</th>
                                                <th>MONTO</th>
                                                <th>TOTAL</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody onChange={handleInput} placeholder="materials" name="materials">
                                            {/* new sep25 */}
                                            {parsedPastItems.map((pastItem, index) => (
                                                <div key={index} className="invoiceItemRow">
                                                    <input className="invoiceItem-Item" value={pastItem.iname}/>
                                                    <input className="invoiceItem-Item" value={pastItem.date}/>
                                                    <input className="invoiceItem-Item" value={pastItem.bank}/>
                                                    <input className="invoiceItem-Item" value={pastItem.amount}/>
                                                    <input className="invoiceItem-Item" value={pastItem.total}/>
                                                </div>
                                            ))}
                                            {/* end sep25 */}
                                        {/* <input className="invoiceItem-Item" name="iname" placeholder='Anticipo' value={input.iname} onChange={event => handlePaymentChange(index,event)}></input> */}
                                            {item.map((input,index) =>(
                                                <div key={index} className="invoiceItemRow">
                                                    <input className="invoiceItem-Item" name="iname" placeholder='Concepto de pago' value={input.iname} onChange={event => handlePaymentChange(index,event)}></input>
                                                    <input className="invoiceItem-Item" name="date" type="date" placeholder='Fecha' value={input.date} onChange={event => handlePaymentChange(index,event)}></input>
                                                    <input className="invoiceItem-Item" name="bank" placeholder='Banco' value={input.bank} onChange={event => handlePaymentChange(index,event)}></input>
                                                    <input className="invoiceItem-Price" name="amount" type="number" pattern="[0-9]*" step=".01" min=".01" max="99999.99" placeholder='Monto' value={input.amount} onChange={event => handlePaymentChange(index,event)}></input>
                                                    <input className="invoiceItem-Total" name="total" placeholder='Total Parcial' value={input.total} readOnly></input>

                                                    {/* <input className="invoiceItem-Amount" name="quantity" type="number" pattern="[0-9]*" step=".001" min=".000" max="999.999" placeholder='Cantidad' value={input.quantity} onChange={event => handlePaymentChange(index,event)}></input>

                                                    <input className="invoiceItem-Price" name="amount" type="number" pattern="[0-9]*" step=".01" min=".01" max="99999.99" placeholder='Precio Unitario' value={input.amount} onChange={event => handlePaymentChange(index,event)}></input>

                                                    <input className="invoiceItem-Total" name="total" placeholder='Total Parcial' value={input.total} readOnly></input> */}

                                                    <FontAwesomeIcon icon={faTrash} className="invoiceItem-Trash" onClick={() => removePaymentEntry(index)}/>
                                                </div>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="sectionTotalsDiv">
                                    <label className="sectionsTotalLabel">TOTAL:</label>
                                    <label className="sectionsTotalAmount">${(totalPayedLive)}</label>
                                    {/* <label className="sectionsTotalAmount">${billTotal ? billTotal : 0}</label> */}
                                </div>
                                <div>
                                    <button type='button' className="btnAddRow" onClick={addItem}>+</button>
                                    <button type='button' className="btnAddRow" onClick={updateData}>+</button>
                                    {/* <button type='button' className="btnAddRow" onClick={paymentArrayCreation}>+</button> */}

                                </div>
                                {/* <button type='button' className="btnAddRow" onClick={addItem}>+</button> */}
                        </div>

                        {/* <div className="previewWindow">
                            <div className="previewHeader">
                                <label>{location.state?.idProyecto}</label>
                            </div>
                        </div> */}
                        </tbody>
                </table>
            </div>
            {/* END SEP22 */}

            {/* ASLEEP SEP22 */}
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
                            ))} */}
                            {/* <th className="header-erase">BORRAR</th> */}
                        {/* </tr>
                    </thead>
                    <tbody> */}
                        {/* change row for projecy */}
                        {/* change projects.map to getSortedArray */}
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
                                <td> */}
                                    {/* <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/> */}
                                {/* </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
            {/* ASLEEP SEP22 */}
        
            <Footer/>
        </div>
    )
}

export default Accounting

// NEW COMMIT END


// ORIGINAL COMMIT START

// import { useEffect, useState, useContext } from "react"
// import React from "react";

// import { useNavigate } from "react-router-dom";

// import Header from "./Header"
// import Footer from "./Footer"

// import { faTrash } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// import { faChartPie } from "@fortawesome/free-solid-svg-icons"
// import Caret from "./Icons/Caret";


// function Accounting() {

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
//             KEY: "plazosDePago",
//             LABEL: "PLAZOS"
//         },
//         {
//             id: 4,
//             KEY: "subtotal",
//             LABEL: "SUBTOTAL"
//         },
//         {
//             id: 5,
//             KEY: "total",
//             LABEL: "TOTAL"
//         },
//         {
//             id: 6,
//             KEY: "anticipo",
//             LABEL: "ANTICIPO"
//         },
//         {
//             id: 7,
//             KEY: "pagado",
//             LABEL: "PAGADO"
//         },
//         {
//             id: 8,
//             KEY: "porPagar",
//             LABEL: "POR PAGAR"
//         },
//         {
//             id: 9,
//             KEY: "estatusContable",
//             LABEL: "ESTATUS"
//         }
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

//     return (
//         <div>
//             <Header/>
//             <div className="mainSubHeader">
//                 <h1 className="accountingTitle">Panel Contable</h1> 
//                 {/* OFF ON APR20 */}
//                 {/* <select className="filterDropDown" value={catValue} onChange={(e) => setCatValue(e.target.value)}>{options}</select> */}
//                 {/* <a href="/project"><button className="btnProject">+</button></a> */}
//                 {/* <a href="/graph"><button className="btnGraph fa-sm"><FontAwesomeIcon icon={faChartPie} /></button></a> */}
//             </div>
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
//                             {/* <th className="header-erase">BORRAR</th> */}
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
//                                     {/* <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(project._id, project.cliente, project.idProyecto)}/> */}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
        
//             <Footer/>
//         </div>
//     )
// }

// export default Accounting

// ORIGINAL COMMIT END
