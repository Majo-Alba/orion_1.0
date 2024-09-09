import { useEffect, useState, useContext } from "react"
import React from "react";
import axios from "axios"


import { useNavigate } from "react-router-dom";

import Header from "./Header"
import Footer from "./Footer"

import { faBuilding, faEnvelope, faLocationDot, faPhone, faTag, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// new jul18
import { faUser } from "@fortawesome/free-solid-svg-icons"
// end jul18

import { faChartPie } from "@fortawesome/free-solid-svg-icons"
import Caret from "./Icons/Caret";

// new aug30
import { jsPDF } from "jspdf";
import autoTable from  '/jspdf-autotable'

import cdeLogo from "../assets/images/cde-logo.png"
import iconBuilding from "../assets/images/iconBuilding.png"
import iconContact from "../assets/images/iconContact.png"
import iconLocation from "../assets/images/iconLocation.png"
import iconPhone from "../assets/images/iconPhone.png"
import iconEmail from "../assets/images/iconEmail.png"
// end aug30


function QuoterMain() {
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

    // NEW AUG21
    const[quoterDetails, setQuoterDetails] = useState({
        empresa:"",
        contacto:"",
        calle:"",
        ciudadYEdo:"",
        cp:"",
        telPrincipal:"",
        correoPrincipal:"",

        rfcEmpresa:"",
        regimenEmpresa:"",
        correoFacturacion:"",

        tipoFactura:"",
        metodoPago:"",
        formaPago:"",
        plazosPago:"",

        descripcionProyecto:"",

        terminosYCondiciones:"1. Los precios expresados son en MONEDA NACIONAL \n \n2. Los precios mostrados no incluyen I.V.A. \n \n3. La vigencia de la presente cotización es de 15 días naturales a partir de la fecha de emisión \n \n4. La presente cotización está sujeta a cambios ",

        calleServicio:"",
        numExteriorServicio:"",
        numInteriorServicio:"",
        colServicio:"",
        cpServicio:"",
        ciudadServicio:"",
        estadoServicio:"",

        fechaElaboracion:"",
        fechaValidez:"",
        idCotizacion:"",
        elaboradaPor:"",

        materials:"",
        labour:"",
        misc:"",

        descuento:"",
    })

    const [message, setMessage] = useState({
        type:"invisible-msg",
        text:""
    })

    function handleInput(event) {
        setQuoterDetails((prevState) => {
            return {...prevState, [event.target.name]:event.target.value}
        })
    }

    // SUB NEW AUG19
    function handleSubmit() {
        event.preventDefault();
        console.log("Generate PDF button clicked")
        console.log(quoterDetails)

        fetch('http://localhost:4000/quoter', {
            method: "POST",
            body: JSON.stringify(quoterDetails),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setMessage({type:"success", text:data.message})

            setQuoterDetails({
                empresa:"",
                contacto:"",
                calle:"",
                ciudadYEdo:"",
                cp:"",
                telPrincipal:"",
                correoPrincipal:"",

                rfcEmpresa:"",
                regimenEmpresa:"",
                correoFacturacion:"",

                tipoFactura:"",
                metodoPago:"",
                formaPago:"",
                plazosPago:"",

                descripcionProyecto:"",

                terminosYCondiciones:"",

                calleServicio:"",
                numExteriorServicio:"",
                numInteriorServicio:"",
                colServicio:"",
                cpServicio:"",
                ciudadServicio:"",
                estadoServicio:"",

                fechaElaboracion:"",
                fechaValidez:"",
                idCotizacion:"",
                elaboradaPor:"",

                materials:"",
                labour:"",
                misc:"",

                descuento:"",
            })

            setTimeout(() => {
                setMessage({type:"invisible-msg", text:"Exit"})
            }, 5000)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // NEW AUG30
    const [item,setItem]=React.useState([{iname:"",quantity:"",amount:"",total:0}])

    // new sep01
    const [labourItem,setLabourItem]=React.useState([{iname:"",quantity:"",amount:"",total:0}])
    const [miscItem,setMiscItem]=React.useState([{iname:"",quantity:"",amount:"",total:0}])
    // end sep01

    function addItem()
    {
        const newItem={iname:"",quantity:"",amount:"",total:0}
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

    // NEW SEP01
    function addLabourItem()
    {
        const newItem={iname:"",quantity:"",amount:"",total:0}
        setLabourItem((oldValue) => {
            const newArray=[]
            for(let i=0;i<oldValue.length;i++)
            {
            newArray.push(oldValue[i])
            }
            newArray.push(newItem)
            return newArray
    })
    }

    function addMiscItem()
    {
        const newItem={iname:"",quantity:"",amount:"",total:0}
        setMiscItem((oldValue) => {
            const newArray=[]
            for(let i=0;i<oldValue.length;i++)
            {
            newArray.push(oldValue[i])
            }
            newArray.push(newItem)
            return newArray
    })
    }
    // END SEP01

    function handleChange(index,event)
    {
        //Storing currect item value in a array object 
        let data = [...item]
        
        //Getting the changed input box name and their corresponding value
        data[index][event.target.name] = event.target.value
        
        //Calculating the total value accordingly 
        data[index]['total']=(data[index]['quantity']*data[index]['amount']).toFixed(2)
        
        //Setting the new value accordingly
        setItem(data)
    }

    // NEW SEP01
    function handleLabourChange(index,event)
    {
        //Storing currect item value in a array object 
        let data = [...labourItem]
        
        //Getting the changed input box name and their corresponding value
        data[index][event.target.name] = event.target.value
        
        //Calculating the total value accordingly 
        data[index]['total']=(data[index]['quantity']*data[index]['amount']).toFixed(2)
        
        //Setting the new value accordingly
        setLabourItem(data)
    }

    function handleMiscChange(index,event)
    {
        //Storing currect item value in a array object 
        let data = [...miscItem]
        
        //Getting the changed input box name and their corresponding value
        data[index][event.target.name] = event.target.value
        
        //Calculating the total value accordingly 
        data[index]['total']=(data[index]['quantity']*data[index]['amount']).toFixed(2)
        
        //Setting the new value accordingly
        setMiscItem(data)
    }
    // END SEP01

    function removeEntry(index)
    {
        //Storing old items value in a variable
        let data=[...item]
        
        //Removing the array object with index value form the stored variable
        data.splice(index,1)
        
        //Storing it into the state
        setItem(data)
    }

    // NEW SEP01
    function removeLabourEntry(index)
    {
        //Storing old items value in a variable
        let data=[...labourItem]
        
        //Removing the array object with index value form the stored variable
        data.splice(index,1)
        
        //Storing it into the state
        setLabourItem(data)
    }

    function removeMiscEntry(index)
    {
        //Storing old items value in a variable
        let data=[...miscItem]
        
        //Removing the array object with index value form the stored variable
        data.splice(index,1)
        
        //Storing it into the state
        setMiscItem(data)
    }
    // END SEP01

    //Creating state for billing total amount
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

    // NEW SEP01
    const[labourBillTotal,setLabourBillTotal]=React.useState(0)

    React.useEffect(()=>{
        //Setting total bill amount
        setLabourBillTotal(()=>{
        
            //Getting copy of all item with its corresponding total
        let data = [...labourItem];
        
        //Initializing temporary variable
        let temp=0;
        
        //Parsing through each item to calculate bill total based on each item total amount
        for(let i=0;i<data.length;i++)
        {
            temp= parseFloat(data[i].total) + temp;
        }
        
        return temp.toFixed(2)
        })
    },[labourItem])

    const[miscBillTotal,setMiscBillTotal]=React.useState(0)

    React.useEffect(()=>{
        //Setting total bill amount
        setMiscBillTotal(()=>{
        
            //Getting copy of all item with its corresponding total
        let data = [...miscItem];
        
        //Initializing temporary variable
        let temp=0;
        
        //Parsing through each item to calculate bill total based on each item total amount
        for(let i=0;i<data.length;i++)
        {
            temp= parseFloat(data[i].total) + temp;
        }
        
        return temp.toFixed(2)
        })
    },[miscItem])
    // END SEP01

    // NEW SEP02
    const billAmount = parseFloat(billTotal)
    const labourBillAmount = parseFloat(labourBillTotal)
    const miscBillAmount = parseFloat(miscBillTotal)

    const globalBill = ((billAmount + labourBillAmount + miscBillAmount).toFixed(2))

    const discountNumber = parseFloat(quoterDetails.descuento)
    console.log(discountNumber)
    const discPercent = (discountNumber * (.01))
    console.log(discPercent)
    const discAmount = (parseFloat((globalBill * discPercent).toFixed(2)))
    console.log(discAmount)
    const discTotal = (parseFloat((globalBill - discAmount).toFixed(2)))
    console.log(discTotal)
    const taxTotal = (parseFloat((discTotal * .16).toFixed(2)))
    console.log(taxTotal)
    const grandTotal = ((discTotal+taxTotal).toFixed(2))
    console.log(grandTotal)
    // END SEP02

    function handlePDFGenerator(event)
    {
        console.log("PDF Generator clicked!")
        //Preventing the input field to get erased
        event.preventDefault();
        
        //Intializing jspdf 
        const doc = new jsPDF()
        let newArray = []
        // new sep01
        let newLabourArray = []
        let newMiscArray = []

        let totalSummaryArray = [
            ['Subtotal', `$${globalBill}`],
            ['Descuento (%)', `${discountNumber}%`],
            ['Subtotal - Descuento', `$${discTotal}`],
            ['I.V.A.', '16%'],
            ['Total I.V.A', `$${taxTotal}`],
            ['Total', `$${grandTotal}`]
        ]
        // new sep05  
        let termsAndCondsArray =[
            [`${quoterDetails.terminosYCondiciones}`]
        ]
        // end sep05
        // end sep01
        
        //Converting array object into array to make PDF conversion easy
        for(let i=0;i<item.length;i++)
        {
            newArray.push([i+1,item[i].iname,item[i].quantity,item[i].amount,item[i].total])
        }
        // new sep01
        for(let i=0;i<labourItem.length;i++)
        {
            newLabourArray.push([i+1,labourItem[i].iname,labourItem[i].quantity,labourItem[i].amount,labourItem[i].total])
        }

        for(let i=0;i<miscItem.length;i++)
        {
            newMiscArray.push([i+1,miscItem[i].iname,miscItem[i].quantity,miscItem[i].amount,miscItem[i].total])
        }

        const pageHeight= doc.internal.pageSize.height;
        // end sep01
        
        //Name of Shop in text
        doc.addImage(cdeLogo, 10, 5, 25, 25);

        doc.setFontSize(12);
        doc.setFont('custom', 'bold');
        doc.text('COTIZACIÓN', 170, 12);
        doc.text("Comunicación Digital Estrella, S.A.", 40,20);
        
        //Header: Quote details
        doc.setFontSize(10);
        doc.setFont('custom', 'bold');
        doc.text(`Fecha de Elaboración: ${quoterDetails.fechaElaboracion}`, 200, 25, null, null, "right");
        doc.text(`Cotización Valida Hasta: ${quoterDetails.fechaValidez}`, 200, 30, null, null, "right");
        doc.text(`ID de Cotización: ${quoterDetails.idCotizacion}`, 200, 35, null, null, "right");
        doc.text(`Elaborada Por: ${quoterDetails.elaboradaPor}`, 200, 40, null, null, "right");


        // Header-client section separation line
        doc.setLineWidth(0.1);
        doc.setDrawColor(200, 200, 200);
        doc.line(10, 45, 200, 45)

        // Client section
        doc.setFontSize(11);
        doc.setFont('custom', 'bold');
        doc.text("Cliente", 13,51);

        doc.setFontSize(10);
        doc.addImage(iconBuilding, 13, 53, 5, 5);
        doc.text(`${quoterDetails.empresa}`, 19, 57); 

        doc.addImage(iconContact, 13.5, 59.5, 4, 4);
        doc.text(`${quoterDetails.contacto}`, 19, 63);

        doc.addImage(iconLocation, 13.7, 65, 3, 4);
        doc.text(`${quoterDetails.calle}`, 19, 68);
        doc.text(`${quoterDetails.ciudadYEdo}`, 19, 72);
        doc.text(`${quoterDetails.cp}`, 19, 76);

        doc.addImage(iconPhone, 13.7, 78, 3, 4);
        doc.text(`${quoterDetails.telPrincipal}`, 19, 81.5);

        doc.addImage(iconEmail, 13.7, 84, 4, 3);
        doc.text(`${quoterDetails.correoPrincipal}`, 19, 87); 

        doc.setFontSize(11);
        doc.setFont('custom', 'bold');
        doc.text("Información Fiscal", 100,51);

        doc.setFontSize(10);
        doc.text(`RFC: ${quoterDetails.rfcEmpresa}`, 100, 57, null, null);
        doc.text(`Régimen Fiscal: ${quoterDetails.regimenEmpresa}`, 100, 63, null, null);
        doc.text(`Correo de Facturación: ${quoterDetails.correoFacturacion}`, 100, 68, null, null);

        // doc.setFontSize(11);
        // doc.setFont('custom', 'bold');
        // doc.text("Preferencias de Pago", 100,70);

        // doc.setFontSize(10);
        // doc.text(`Tipo de Factura: ${quoterDetails.tipoFactura}`, 100, 76, null, null);
        // doc.text(`Método de Pago: ${quoterDetails.metodoPago}`, 100, 82, null, null);
        // doc.text(`Forma de Pago: ${quoterDetails.formaPago}`, 100, 88, null, null);
        // doc.text(`Plazos de Pago: ${quoterDetails.plazosPago}`, 100, 94, null, null);

        // Client-material section separation line
        doc.setLineWidth(0.1);
        doc.setDrawColor(200, 200, 200);
        doc.line(10, 92, 200, 92);

        // Project description
        doc.setFontSize(11);
        doc.setFont('custom', 'bold');
        doc.text("Descripción del Proyecto", 13,99);

        doc.setFontSize(10);
        doc.setFont('custom', 'normal');
        var splitTitle = doc.splitTextToSize(quoterDetails.descripcionProyecto, 180);
        doc.text(14.5, 106, splitTitle);
        
        //Adding table heading along with its array of values
        doc.setFontSize(10);
        doc.setFont('custom', 'bold');

        // NEW SEP03
        // var y = 500
        // if (y>=pageHeight)
        // {
        //     doc.addPage();
        //     y = 0 
        // }
        // END SEP03

        doc.text("Materiales", 13,125);
        autoTable(doc, {
        head: [['S.no','Item name', 'Quantity','Amount','Total']],
        body: newArray,
        startY: 130,
        })
        let materialFinalY = doc.previousAutoTable.finalY;
        doc.text(`Total materiales: $ ${billTotal}`, 13, materialFinalY+ 10);

        // NEW SEP03
        // if (y>=pageHeight)
        // {
        //     doc.addPage();
        //     y = 0 
        // }
        // END SEP03

        doc.text("Mano de obra", 13, materialFinalY+ 20);
        autoTable(doc, {
        head: [['S.no','Item name', 'Quantity','Amount','Total']],
        body: newLabourArray,
        startY: materialFinalY+ 25,
        })
        let labourFinalY = doc.previousAutoTable.finalY;
        doc.text(`Total mano de obra: $ ${labourBillTotal}`, 13, labourFinalY+ 10);

        // NEW SEP03
        // if (y>=pageHeight)
        // {
        //     doc.addPage();
        //     y = 0 
        // }
        // END SEP03

        doc.text("Misceláneos", 13, labourFinalY+ 20);
        autoTable(doc, {
        head: [['S.no','Item name', 'Quantity','Amount','Total']],
        body: newMiscArray,
        startY: labourFinalY+25,
        })
        let miscFinalY = doc.previousAutoTable.finalY;
        doc.text(`Total misceláneos: $ ${miscBillTotal}`, 13, miscFinalY+ 10);

        // NEW SEP04
        doc.text("", 13, miscFinalY+ 20);
        autoTable(doc, {
        body: totalSummaryArray,
        startY: miscFinalY+25,
        margin:{left: 100},
        columnStyles: {
            0: {
                // halign: 'right',
                cellWidth: 50,
                fillColor: [232, 252, 245],
                },
            1: {
                // halign: 'right',
                cellWidth: 50,
                fillColor: [232, 252, 245],
                },
        },
        bodyStyles: {
            fontStyle:'bold',
        },
        })
        // let miscFinalY = doc.previousAutoTable.finalY;
        // doc.text(`Total misceláneos: $ ${miscBillTotal}`, 13, miscFinalY+ 10);
        // EMD SEP04
        
        // ASLEEP SEP04: Adding total billing amount in the end of table
        let finalY = doc.previousAutoTable.finalY;
        // doc.setFontSize(11);
        // doc.setFont('custom', 'bold');
        // doc.text(`Total: $ ${globalBill}`, 13, finalY + 20);

        // NEW SEP05
        doc.setFont('custom', 'bold');
        doc.setFontSize(11);
        doc.text("Terminos y Condiciones", 13, finalY+ 20);
        autoTable(doc, {
        body: termsAndCondsArray,
        startY: finalY+25,
        columnStyles: {
            0: {
                // halign: 'right',
                // cellWidth: 50,
                fillColor: [255, 255, 255],
                },
        //     1: {
        //         // halign: 'right',
        //         cellWidth: 50,
        //         fillColor: [232, 252, 245],
        //         },
        },
        bodyStyles: {
            fontSize: 10,
            fontStyle:'bold',
            font:'custom',
            textColor: [0, 0, 0],
        },
        })

        // END SEP05

        // new sep02
        // doc.text("Términos y condiciones:", 12, finalY + 35)
        // doc.text(`${quoterDetails.terminosYCondiciones}`, 12, finalY + 45)
        // emd sep02

        // Add summary and page numbers
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.line(10, 283, 200, 283)
            doc.setPage(i);
            doc.setFont('Newsreader');
            doc.text(
                `${i} de ${totalPages}`,
                185,
                doc.internal.pageSize.getHeight() - 5
            );
        }
        
        //saving bill in the name of 
        doc.save('Bill.pdf')
    }
    // END AUG30

    // ASLEEP AND CHANGED FOR PRECEDING SOLUTION NEW AUG28
    // function newRow() {
    //     // event.preventDefault();
    //     console.log("New row button clicked!")
       
    //     document.getElementById("materialsTable")
    //     // document.getElementById("materialsTableID")
    //     .innerHTML += 
    //     `
    //     <tr>
    //         <td>
    //             <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Identificador de material" name="materials" value={quoterDetails.materials}></input>
    //         </td>
    //         <td>
    //             <input></input>
    //         </td>
    //         <td>
    //             <input></input>
    //         </td>
    //         <td>
    //             <input></input>
    //         </td>
    //     </tr> `;
    // }
    // END AUG28

    // SUB END AUG19

    // function handleSubmit() {
    //     event.preventDefault();
    //     console.log("Generate PDF button clicked")
    //     console.log(quoterDetails)

    //     const formData = new FormData()

    //     formData.append('empresa', quoterDetails.empresa)
    //     formData.append('contacto', quoterDetails.contacto)
  
    //     axios.post('http://localhost:4000/quoter', formData, {
    //         empresa: quoterDetails.empresa,
    //         contacto: quoterDetails.contacto,
    //     })
    //     .then((data) => {
    //         setMessage({type:"success", text:data.message})
    //         console.log(data)
    //     })
    //     .catch(err => console.log(err))
    // }

    // END AUG21
    // STOP HERE
    // THEEE END IS NEAAAR!

    const navigate = useNavigate()

    let [food, setFood] = useState()

    useEffect(() => {
        console.log(JSON.stringify(food))
    })

    const [selectedRow, setSelectedRow] = React.useState(-1);

    let [projects, setProjects] = useState([])

    console.log(projects)
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

    return (
        <div>
            <Header/>
            <div className="mainSubHeader">
                <h1 className="mainSubHeaderTitle">Cotizador</h1> 
            </div>

            <div>
                {/* <table className="tableProjects"> */}
                <table className="clientTable">
                    <thead>
                        <tr>
                            <div className="clientHeader">
                                <th>DESCRIPCIÓN</th>
                                <th>DESGLOSE DE COSTOS</th>
                            </div>
                        </tr>
                    </thead>
                    <tbody className="quoterBody">
                        {/* NEW AUG19 */}
                        {/* <form action="/project" method="POST" enctype="multipart/form-data" name="myFiles" id="newProjectForm" className="container-newProject" onSubmit={handleSubmit}> */}
                        {/* DESCRIPTION SIDE */}
                        <div className="descriptionCardBase">
                            {/* CLIENT INFO */}
                            <div className="descript-sectionTitle">
                                <label>Cliente</label>
                            </div>

                            <div className="descript-clientCard">
                                <div className="descriptDiv-iconText">
                                    <FontAwesomeIcon icon={faBuilding}/>
                                    <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Empresa" name="empresa" value={quoterDetails.empresa}></input>
                                    
                                    {/* <input className="quoterDescriptPlaceholer" type="text" placeholder="Empresa"></input> */}
                                    {/* <label>Kangaroo Cacti</label> */}

                                </div>
                                <div className="descriptDiv-iconText">
                                    <FontAwesomeIcon icon={faUser}/>
                                    <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Contacto" name="contacto" value={quoterDetails.contacto}></input>
                                    
                                    {/* <input className="quoterDescriptPlaceholer" type="text" placeholder="Nombre de Contacto"></input> */}
                                    {/* <label>Maria Jose Albanes</label> */}
                                </div>
                                <div className="descriptDiv-iconText">
                                    <FontAwesomeIcon icon={faLocationDot}/>
                                    <div className="descript-Address">
                                        <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Calle y Número" name="calle" value={quoterDetails.calle}></input>
                                        <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Ciudad y Edo" name="ciudadYEdo" value={quoterDetails.ciudadYEdo}></input>
                                        <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="C.P." name="cp" value={quoterDetails.cp}></input>

                                        {/* <input className="quoterDescriptPlaceholer" type="text" placeholder="Calle y Número"></input> */}
                                        {/* <input className="quoterDescriptPlaceholer" type="text" placeholder="Ciudad y Edo"></input> */}
                                        {/* <input className="quoterDescriptPlaceholer" type="text" placeholder="C.P."></input> */}

                                        {/* <label>José María Heredia #2637</label>
                                        <label>Guadalajara, Jal.</label>
                                        <label>C.P. 44657</label> */}
                                    </div>
                                </div>
                                <div className="descriptDiv-iconText">
                                    <FontAwesomeIcon icon={faPhone}/>
                                    <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Teléfono Principal" name="telPrincipal" value={quoterDetails.telPrincipal}></input>

                                    {/* <input className="quoterDescriptPlaceholer" type="text" placeholder="Teléfono Principal"></input> */}
                                    {/* <label>331 080 5641</label> */}
                                </div>
                                <div className="descriptDiv-iconText">
                                    <FontAwesomeIcon icon={faEnvelope}/>
                                    <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Correo Principal" name="correoPrincipal" value={quoterDetails.correoPrincipal}></input>

                                    {/* <input className="quoterDescriptPlaceholer" type="text" placeholder="Correo Principal"></input> */}
                                    {/* <label>mj_albanes@yahoo.com</label> */}
                                </div>
                            </div>

                            {/* FISCAL INFO */}
                            <div className="descript-sectionTitle">
                                <label>Información Fiscal</label>
                            </div>
                            <div className="descript-clientCard">
                                <div className="descriptDiv-textText">
                                    <label>RFC:</label>
                                    <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="R.F.C. Empresa" name="rfcEmpresa" value={quoterDetails.rfcEmpresa}></input>

                                    {/* <input className="quoterDescriptPlaceholer" type="text" placeholder="R.F.C. Empresa"></input> */}
                                    {/* <label>AABJ910822G14</label> */}
                                </div>
                                <div className="descriptDiv-textText">
                                    <label>Régimen Fiscal:</label>
                                    <select required className="quoterDescriptPlaceholer" onChange={handleInput} placeholder="Régimen fiscal del cliente..." name="regimenEmpresa" value={quoterDetails.regimenEmpresa}>
                                        <option>Seleccionar Régimen</option>
                                        <option>601: General de Ley Personas Morales</option>
                                        <option>603: Personas Morales con Fines no Lucrativos</option>
                                        <option>605: Sueldos y Salarios e Ingresos Asimilados a Salarios</option>
                                        <option>606: Arrendamiento</option>
                                        <option>607: Régimen de Enajenación o Adquisición de Bienes</option>
                                        <option>608: Demás ingresos</option>
                                        <option>610: Residentes en el Extranjero sin Establecimiento Permanente en México</option>
                                        <option>611: Ingresos por Dividendos - Socios y accionistas</option>
                                        <option>612: Personas Físicas con Actividades Empresariales y Profesionales</option>
                                        <option>614: Ingresos por intereses</option>
                                        <option>615: Régimen de los ingresos por obtención de premios</option>
                                        <option>616: Sin obligaciones fiscales</option>
                                        <option>620: Sociedades Cooperativas de Producción que optan por diferir sus ingresos</option>
                                        <option>621: Incorporación Fiscal</option>
                                        <option>622: Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras</option>
                                        <option>623: Opcional para Grupos de Sociedades</option>
                                        <option>624: Coordinados</option>
                                        <option>625: Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas</option>
                                        <option>626: Régimen Simplificado de Confianza</option>
                                    </select>
                                    {/* <label>605: Sueldos y Salarios e Ingresos Asimilados</label> */}
                                </div>
                                <div className="descriptDiv-textText">
                                    <label>Correo:</label>
                                    <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Correo de Facturación" name="correoFacturacion" value={quoterDetails.correoFacturacion}></input>

                                    {/* <label>mj.albanes@gmail.com</label> */}
                                </div>
                            </div>

                            {/* PAYMENT SPECS & PREFS */}
                            <div className="descript-sectionTitle">
                                <label>Preferencias de Pago</label>
                            </div>
                            <div className="descript-clientCard">
                                <div className="descriptDiv-textText">
                                    <label>Tipo de Factura:</label>
                                    <select required onChange={handleInput} placeholder="Escoger tipo de factura..." name="tipoFactura" value={quoterDetails.tipoFactura}>
                                        <option>Escoger tipo de factura...</option>
                                        <option>Por el total</option>
                                        <option>Complemento de pago</option>
                                    </select>
                                    {/* <label>Por el total</label> */}
                                </div>
                                <div className="descriptDiv-textText">
                                    <label>Metodo de Pago:</label>
                                    <select required onChange={handleInput} placeholder="Escoger método de pago..." name="metodoPago" value={quoterDetails.metodoPago}>
                                        <option>Escoger método de pago...</option>
                                        <option>PUE</option>
                                        <option>PPD</option>
                                    </select>
                                </div>
                                <div className="descriptDiv-textText">
                                    <label>Forma de Pago:</label>
                                    <select required onChange={handleInput} placeholder="Escoger forma de pago..." name="formaPago" value={quoterDetails.formaPago}>
                                        <option>Escoger forma de pago...</option>
                                        <option>01: Efectivo</option>
                                        <option>02: Cheque nominativo</option>
                                        <option>03: Transferencia electrónica de fondos</option>
                                        <option>04: Tarjeta de crédito</option>
                                        <option>05: Monedero electrónico</option>
                                        <option>06: Dinero electrónico</option>
                                        <option>08: Vales de despensa</option>
                                        <option>12: Dación en pago</option>
                                        <option>13: Pago por subrogación</option>
                                        <option>14: Pago por consignación</option>
                                        <option>15: Condonación</option>
                                        <option>17: Compensación</option>
                                        <option>23: Novación</option>
                                        <option>24: Confusión</option>
                                        <option>25: Remisión de deuda</option>
                                        <option>26: Prescripción o caducidad</option>
                                        <option>27: A satisfacción del acreedor</option>
                                        <option>28: Tarjeta de débito</option>
                                        <option>29: Tarjeta de servicios</option>
                                        <option>30: Aplicación de anticipos</option>
                                        <option>99: Por definir</option>
                                    </select>
                                    {/* <label>03: Transferencia electrónica de fondos</label> */}
                                </div>
                                <div className="descriptDiv-textText">
                                    <label>Plazos de Pago:</label>
                                    <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Plazos" name="plazosPago" value={quoterDetails.plazosPago}></input>

                                    {/* <label>3</label> */}
                                </div>
                            </div>

                            {/* JOB DESCRIPTION */}
                            <div className="descript-sectionTitle">
                                <label>Descripción del Proyecto</label>
                            </div>
                            <div className="descript-clientCard">
                                <div>
                                    <textarea className="quoterDescriptPlaceholer" type="text" rows="7" cols="38" onChange={handleInput} placeholder="Descripción y detalles del proyecto" name="descripcionProyecto" value={quoterDetails.descripcionProyecto}></textarea>

                                    {/* <label>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                        Duis aute irure dolor in reprehenderit in voluptate velit 
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                                        occaecat cupidatat non proident, sunt in culpa qui officia 
                                        deserunt mollit anim id est laborum. </label> */}
                                </div>
                            </div>

                            {/* TERMS & CONDITIONS */}
                            <div className="descript-sectionTitle">
                                <label>Términos y Condiciones</label>
                            </div>
                            <div className="descript-clientCard">
                                <textarea className="quoterDescriptPlaceholer" type="text" rows="7" cols="38" onChange={handleInput} placeholder="Terminos y Condiciones" name="terminosYCondiciones" value={quoterDetails.terminosYCondiciones}></textarea>
                            </div>
                        </div>

                        {/* BREAKDOWN SIDE */}
                        <div className="previewWindow">
                            {/* WORK LOCATION & DATES DIV */}
                            <div className="locationDatesDiv">
                                {/* LOCATION DIV */}
                                <div className="locationDiv">
                                    <div className="locationDate-sectionTitle">
                                        <label>Dirección de Servicio</label>
                                    </div>
                                    <div className="descript-clientCard">
                                        <div className="locationDate-labelInput">
                                            <label>Calle</label>
                                            <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Calle" name="calleServicio" value={quoterDetails.calleServicio}></input>
                                            {/* <input type="text" placeholder="Calle..."></input> */}
                                        </div>
                                        <div className="locationDate-labelInputDouble">
                                            <div className="locationDate-number">
                                                <label># Ext.</label>
                                                <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Número Exterior" name="numExteriorServicio" value={quoterDetails.numExteriorServicio}></input>
                                                {/* <input type="text" placeholder="Número Exterior..."></input> */}
                                            </div>
                                            <div className="locationDate-number">
                                                <label className="locationDate-extNumber"># Int.</label>
                                                <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Número Interior" name="numInteriorServicio" value={quoterDetails.numInteriorServicio}></input>
                                                {/* <input type="text" placeholder="Número Interior..."></input> */}
                                            </div>
                                        </div>
                                        <div className="locationDate-labelInput">
                                            <label>Col.</label>
                                            <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Colonia" name="colServicio" value={quoterDetails.colServicio}></input>
                                            {/* <input type="text" placeholder="Colonia..."></input> */}
                                        </div>
                                        <div className="locationDate-labelInput">
                                            <label>C.P.</label>
                                            <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Código Postal" name="cpServicio" value={quoterDetails.cpServicio}></input>
                                            {/* <input type="text" placeholder="Código Postal..."></input> */}
                                        </div>
                                        <div className="locationDate-labelInputDouble">
                                            <div className="locationDate-number">
                                                <label>Ciudad</label>
                                                <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Ciudad" name="ciudadServicio" value={quoterDetails.ciudadServicio}></input>
                                                {/* <input type="text" placeholder="Ciudad..."></input> */}
                                            </div>
                                            <div className="locationDate-number">
                                                <label>Estado</label>
                                                <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Estado" name="estadoServicio" value={quoterDetails.estadoServicio}></input>
                                                {/* <input type="text" placeholder="Estado..."></input> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* DATES DIV */}
                                <div className="locationDiv">
                                    <div className="locationDate-sectionTitle">
                                        <label>Detalles de Cotización</label>
                                    </div>
                                    <div className="datesCard">
                                        <div className="dates-labelInput">
                                            <label>Fecha de Elaboración</label>
                                            <input type="date"required onChange={handleInput} placeholder="Elaboración" name="fechaElaboracion" value={quoterDetails.fechaElaboracion}></input>
                                            {/* <input type="date" placeholder="Elaboración..."></input> */}
                                        </div>
                                        <div className="dates-labelInput">
                                            <label>Cotización Valida Hasta</label>
                                            <input type="date"required onChange={handleInput} placeholder="Validez" name="fechaValidez" value={quoterDetails.fechaValidez}></input>
                                            {/* <input type="date" placeholder="Validez..."></input> */}
                                        </div>
                                        <div className="dates-labelInput">
                                            <label>ID de Cotización</label>
                                            <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="ID" name="idCotizacion" value={quoterDetails.idCotizacion}></input>
                                            {/* <input type="text" placeholder="ID..."></input> */}
                                        </div>
                                        <div className="dates-labelInput">
                                            <label>Elaborada por</label>
                                            <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Nombre de quien elabora" name="elaboradaPor" value={quoterDetails.elaboradaPor}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MATERIALS DIV */}
                            <div>
                                <div className="locationDate-sectionTitle">
                                    <label>Materiales</label>
                                </div>
                                <div className="tableDivScroll">
                                    <table id="materialsTable" className="materialsTable">
                                        <thead>
                                            <tr className="invoiceTableHeader">
                                                <th>MATERIAL</th>
                                                <th>CANTIDAD</th>
                                                <th>PRECIO UNIT</th>
                                                <th>TOTAL</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody onChange={handleInput} placeholder="materials" name="materials" value={quoterDetails.materials}>
                                            {/* NEW AUG30 */}
                                            {item.map((input,index) =>(
                                                <div key={index} className="invoiceItemRow">
                                                    {/* <input name="iname" placeholder="item name" value={input.iname}></input> */}
                                                    <input className="invoiceItem-Item" name="iname" placeholder='Código o nombre de material' value={input.iname} onChange={event => handleChange(index,event)}></input>

                                                    {/* <input name="quantity" type="number" pattern="[0-9]*" step=".001" min=".000" max="999.999" placeholder='quantity' value={input.quantity}></input> */}
                                                    <input className="invoiceItem-Amount" name="quantity" type="number" pattern="[0-9]*" step=".001" min=".000" max="999.999" placeholder='Cantidad' value={input.quantity} onChange={event => handleChange(index,event)}></input>

                                                    {/* <input name="amount" type="number" pattern="[0-9]*" step=".01" min=".01" max="99999.99" placeholder='amount' value={input.amount}></input> */}
                                                    <input className="invoiceItem-Price" name="amount" type="number" pattern="[0-9]*" step=".01" min=".01" max="99999.99" placeholder='Precio Unitario' value={input.amount} onChange={event => handleChange(index,event)}></input>

                                                    <input className="invoiceItem-Total" name="total" placeholder='Total Parcial' value={input.total} readOnly></input>

                                                    <FontAwesomeIcon icon={faTrash} className="invoiceItem-Trash" onClick={() => removeEntry(index)}/>
                                                    {/* <button key={index} onClick={() => removeEntry(index)}>Remove</button> */}
                                                    {/* <button key={index}>Remove</button> */}
                                                </div>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="sectionTotalsDiv">
                                    <label className="sectionsTotalLabel">TOTAL:</label>
                                    <label className="sectionsTotalAmount">${billTotal ? billTotal : 0}</label>
                                </div>
                                <button type='button' className="btnAddRow" onClick={addItem}>+</button>
                            </div>

                            {/* LABOUR DIV */}
                            <div>
                                <div className="locationDate-sectionTitle">
                                    <label>Mano de Obra</label>
                                </div>
                                <div className="tableDivScroll">
                                    <table className="materialsTable">
                                        <thead>
                                            <tr className="invoiceTableHeader">
                                                <th>DESCRIPCIÓN</th>
                                                <th>UNIDADES</th>
                                                <th>PRECIO UNIT</th>
                                                <th>TOTAL</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody onChange={handleInput} placeholder="labour" name="labour" value={quoterDetails.labour}>
                                            {/* NEW AUG30 */}
                                            {labourItem.map((input,index) =>(
                                                <div key={index} className="invoiceItemRow">
                                                    {/* <input name="iname" placeholder="item name" value={input.iname}></input> */}
                                                    <input className="invoiceItem-Item" name="iname" placeholder='Código o nombre de elemento mano de obra' value={input.iname} onChange={event => handleLabourChange(index,event)}></input>

                                                    {/* <input name="quantity" type="number" pattern="[0-9]*" step=".001" min=".000" max="999.999" placeholder='quantity' value={input.quantity}></input> */}
                                                    <input className="invoiceItem-Amount" name="quantity" type="number" pattern="[0-9]*" step=".001" min=".000" max="999.999" placeholder='Cantidad' value={input.quantity} onChange={event => handleLabourChange(index,event)}></input>

                                                    {/* <input name="amount" type="number" pattern="[0-9]*" step=".01" min=".01" max="99999.99" placeholder='amount' value={input.amount}></input> */}
                                                    <input className="invoiceItem-Price" name="amount" type="number" pattern="[0-9]*" step=".01" min=".01" max="99999.99" placeholder='Precio Unitario' value={input.amount} onChange={event => handleLabourChange(index,event)}></input>

                                                    <input className="invoiceItem-Total" name="total" placeholder='Total Parcial' value={input.total} readOnly></input>

                                                    <FontAwesomeIcon icon={faTrash} className="invoiceItem-Trash" onClick={() => removeLabourEntry(index)}/>
                                                </div>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="sectionTotalsDiv">
                                    <label className="sectionsTotalLabel">TOTAL:</label>
                                    <label className="sectionsTotalAmount">${labourBillTotal ? labourBillTotal : 0}</label>
                                </div>
                                <button type='button' className="btnAddRow" onClick={addLabourItem}>+</button>
                            </div>

                            {/* MISC DIV */}

                            <div>
                                <div className="locationDate-sectionTitle">
                                    <label>Misceláneos</label>
                                </div>
                                <div className="tableDivScroll">
                                    <table className="materialsTable">
                                        <thead>
                                            <tr className="invoiceTableHeader">
                                                <th>DESCRIPCIÓN</th>
                                                <th>UNIDADES</th>
                                                <th>PRECIO UNIT</th>
                                                <th>TOTAL</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody onChange={handleInput} placeholder="labour" name="labour" value={quoterDetails.MISC}>
                                            {/* NEW AUG30 */}
                                            {miscItem.map((input,index) =>(
                                                <div key={index} className="invoiceItemRow">
                                                    {/* <input name="iname" placeholder="item name" value={input.iname}></input> */}
                                                    <input className="invoiceItem-Item" name="iname" placeholder='Código o nombre de elemento misceláneo' value={input.iname} onChange={event => handleMiscChange(index,event)}></input>

                                                    {/* <input name="quantity" type="number" pattern="[0-9]*" step=".001" min=".000" max="999.999" placeholder='quantity' value={input.quantity}></input> */}
                                                    <input className="invoiceItem-Amount" name="quantity" type="number" pattern="[0-9]*" step=".001" min=".000" max="999.999" placeholder='Cantidad' value={input.quantity} onChange={event => handleMiscChange(index,event)}></input>

                                                    {/* <input name="amount" type="number" pattern="[0-9]*" step=".01" min=".01" max="99999.99" placeholder='amount' value={input.amount}></input> */}
                                                    <input className="invoiceItem-Price" name="amount" type="number" pattern="[0-9]*" step=".01" min=".01" max="99999.99" placeholder='Precio Unitario' value={input.amount} onChange={event => handleMiscChange(index,event)}></input>

                                                    <input className="invoiceItem-Total" name="total" placeholder='Total Parcial' value={input.total} readOnly></input>

                                                    <FontAwesomeIcon icon={faTrash} className="invoiceItem-Trash" onClick={() => removeMiscEntry(index)}/>
                                                </div>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                    <div className="sectionTotalsDiv">
                                        <label className="sectionsTotalLabel">TOTAL:</label>
                                        <label className="sectionsTotalAmount">${miscBillTotal ? miscBillTotal : 0}</label>
                                    </div>

                                    <button type='button' className="btnAddRow" onClick={addMiscItem}>+</button>

                                    {/* <table className="materialsTable">
                                        <thead>
                                            <tr>
                                                <th width="45%">DESCRIPCIÓN</th>
                                                <th width="15%">CANTIDAD</th>
                                                <th width="15%">PRECIO UNIT</th>
                                                <th width="25%">TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Honeywell Cámara IP Domo IR para Exteriores HC30W42R3, Alámbrico, 1920 x 1080 Pixeles, Día/Noche</td>
                                                <td>
                                                    <input></input>
                                                </td>
                                                <td>2</td>
                                                <td>$3,859.00</td>
                                                <td>$7,718.00</td>
                                            </tr> 
                                            <tr>
                                                <td>Hikvision Kit de Videoportero DS-KIS302-P, Monitor Touch 7", Altavoz, Inalámbrico/Alámbrico, Negro/Plata</td>
                                                <td>1</td>
                                                <td>$2,589.00</td>
                                                <td>$2,589.00</td>
                                            </tr> 
                                        </tbody>
                                    </table> */}
                                {/* <div className="sectionTotalsDiv">
                                    <label className="sectionsTotalLabel">TOTAL:</label>
                                    <label className="sectionsTotalAmount">$83,133.00</label>
                                </div>
                                <button className="btnAddRow">+</button> */}
                            </div>

                            {/* FOOTER DIV */}
                            <div className="footer-totalsDiv">
                                {/* SIGNATURE DIV */}
                                <div>
                                    {/* <label>Firmas</label> */}
                                </div>

                                {/* TOTALS DIV */}
                                <div className="totalsDiv">
                                    <div className="totals-labelLabel">
                                        <label className="totals-boldLabel">Subtotal</label>
                                        <label className="totals-boldLabel">${globalBill}</label>
                                    </div>
                                    <div className="totals-labelLabel">
                                        <label>Descuento (%)</label>
                                        <input className="quoterDescriptPlaceholer" type="text"required onChange={handleInput} placeholder="Descuento" name="descuento" value={quoterDetails.descuento}></input>
                                        {/* <label>10%</label> */}
                                    </div>
                                    <div className="totals-labelLabel">
                                        <label className="totals-boldLabel">Subtotal - Descuento</label>
                                        <label className="totals-boldLabel">${discTotal}</label>
                                    </div>
                                    <div className="totals-labelLabel">
                                        <label>I.V.A.</label>
                                        <label>16%</label>
                                    </div>
                                    <div className="totals-labelLabel">
                                        <label>Total I.V.A.</label>
                                        <label>${taxTotal}</label>
                                    </div>
                                    <div className="totals-labelLabel">
                                        <label className="totals-bolderLabel">Total</label>
                                        <label className="totals-bolderLabel">${grandTotal}</label>
                                    </div>
                                </div>
                            </div>
                            {/* <button className="btnGeneratePDF" type="submit" onClick={handleSubmit}>Generar PDF</button> */}
                            <button className="btnGeneratePDF" type="submit" onClick={handlePDFGenerator}>Generar PDF</button>

                        </div>
                        {/* NEW AUG19 */}
                        {/* </form> */}
                        {/* END AUG19 */}
                    </tbody>
                </table>
            </div>
        
            <Footer/>
        </div>
    )
}

export default QuoterMain
