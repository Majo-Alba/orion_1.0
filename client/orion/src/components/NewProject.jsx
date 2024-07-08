import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { json } from "react-router-dom";
import axios from "axios"

// NEW APR26
import emailjs from '@emailjs/browser'
// END APR26

// NEW CURRENCY
// import CurrencyInput from 'react-currency-input-field'
import CurrencyInput from "./currencyInput";
// END CURRENCY
import blueMark from '../assets/images/blue.png'

function Project() {

    const randomNumber = "A-" + ((Math.floor((Math.random() * 10000) + 1)))
  
    const [file, setFile] = useState([])

    // NEW JUN29
    // const [files, setFiles] = useState([])

    // const packFiles = (files)=> {
    //     const data = new FormData();

    //     [...files].forEach((file, i) => {
    //         data.append('file'+1, file, file.name)
    //     })
    //     return data
    // } 

    // console.log(packFiles)
    // END JUN29


    // START: DOCUMENT CHECKLIST DB
    const checklist_items = [
        { id: "1", value: "Cédula de Identificación Fiscal"},
        { id: "2", value: "Constancia de Situación Fiscal"},
        { id: "3", value: "Carta de Conformidad"},
        { id: "4", value: "Cotización"},
        { id: "5", value: "Factura"},
        { id: "6", value: "Orden de compra"},
        { id: "7", value: "Otros"}
    ]
    // END: DOCUMENT CHECKLIST DB

    // OFF MAY29 - NEW MAY08 --> GOES THROUGH ALL SELECTED FILES AND LISTS THEM
    // const renderFileList = () => (<ol>
    //     {[...file].map((f, i) => (
    //         <li key={i}>{f.name} - {f.type}</li>
    //     ))}
    // </ol>)

    // const packFiles = (file) => {
    //     const data = new FormData();

    //     [...file].forEach((file, i) => {
    //         data.append('file' +i, file, file.name)
    //     })
    //     return data
    // }
    // OFF MAY29 - END MAY08

    const[projectDetails, setProjectDetails] = useState({
        cliente:"",
        numeroCliente:"",
        razonSocial:"",
        correoPrincipal:"",
        direccion:"",
        sucursal:"",

        correoFacturacion:"",
        regimenFiscal:"",
        tipoFactura:"",
        metodoPago:"",
        formaPago:"",
        usoCFDI:"",

        idProyecto:"",
        nombreEncargado:"",
        folioAceptado: randomNumber,
        inicioProceso:"",
        inicioTecnico:"",
        estatusProyecto:"",

        subtotal:"",
        total:"",
        ivaGenerado:"",
        anticipo:"",
        pagado:"",
        porPagar:"",
        plazosDePago:"",
        estatusContable:"",
   
        pagoAdicional:"",
        fechaPago:"",
        bancoPago:"",

        comentarios:"",
        condicion:"",

        // file: "",
        // folioPDF: "",
    })

    // START: EQUATIONS - FINANCE SECTION
    const totalAmount = (projectDetails.total)
    const totalAmountNumber = parseFloat(totalAmount)
    
    const downPaymentTotal =(projectDetails.anticipo)
    const downPaymentNumber = parseFloat(downPaymentTotal)

    const subTotalAmount = (projectDetails.subtotal)
    const subTotalAmountNumber = parseFloat(subTotalAmount)
      
    const payedAmount = (downPaymentNumber)
    
    const remainingAmount = (totalAmountNumber - downPaymentNumber)

    const taxesGenerated = (totalAmountNumber - subTotalAmountNumber)

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    // END: EQUATIONS - FINANCE SECTION


    // START: CLIENT ID AUTOGEN
    const stringID = (projectDetails.numeroCliente)
    const numberID = parseFloat(stringID)
    console.log(typeof(numberID), numberID)
    const newID = (numberID + 1)
    console.log(newID)
    // END: CLIENT ID AUTOGEN



    const [message, setMessage] = useState({
        type:"invisible-msg",
        text:""
    })

    // NEW JUN06
    const [extraFile, setExtraFile] = useState([])

    const handleAddExtraFile = () => {
        console.log("add more files button clicked")
        const fileABC=[...extraFile, []]
        setExtraFile(fileABC)
    }
    
    const handleChange = (onChangeValue, i) => {
        const inputData=[...extraFile]
        inputData[i]=onChangeValue.target.value;
        setExtraFile(inputData)
    }
    
    console.log(extraFile)
    // END JUN06


    // NEW JUN06
    // const [payment, setPayment] = useState([])

    // const handleAddPaymemt = () => {
    //     console.log("add payment button clicked")
    //     const paymentABC=[...payment, []]
    //     setPayment(paymentABC)
    // }
    
    // const handleChange = (onChangeValue, i) => {
    //     const inputData=[...payment]
    //     inputData[i]=onChangeValue.target.value;
    //     setPayment(inputData)
    // }
    
    // console.log(payment)
    // END JUN06

    // NEW MAY07
    // const [inputFields, setInputFields] = useState([{value: ""}])
    // const [files, setFiles] = useState([{value:""}])

    // const handleValueChange = (index, event) => {
    //     // const values = [...inputFields];
    //     const values = [...files];

    //     values[index].value = event.target.value;
    //     // setInputFields(values);
    //     setFiles(values);
    // }

    // const handleAddFields = () => {
    //     // setInputFields([...inputFields,{value:""}])
    //     setFiles([...files,{value:""}])

    // }
    // END MAY07


    // const [error, setError] = useState('')
    // const [selectData, setSelectData] = useState([])
    // const [selectValue, setSelectValue] = useState('')

    //TESTING GROUNDS

       // NEW JUN18
       const [checkedList, setCheckedList] = useState([])

       const handleSelect = (event) => {
           const value = event.target.value
           const isChecked = event.target.checked

           if(isChecked) {
               setCheckedList([...checkedList, value])
           } else {
               const filteredList = checkedList.filter((item) => item != value)
               setCheckedList(filteredList)
           }
       }
       // END JUN18

    function handleInput(event) {
        setProjectDetails((prevState) => {
            return {...prevState, [event.target.name]:event.target.value}
        })
    }

    function handleSubmit() {
        event.preventDefault();
        console.log(file)
        console.log(projectDetails)

        const formData = new FormData()

        // NEW MAY29
        // for(let i = 0; i < file.length; i++) {
        //     formData.append(`images[${i}]`, file[0])
        // }
        // EMD MAY29
  
        formData.append("cliente", projectDetails.cliente)
        formData.append("numeroCliente", projectDetails.numeroCliente)
        formData.append("razonSocial", projectDetails.razonSocial)
        formData.append("correoPrincipal", projectDetails.correoPrincipal)
        formData.append("direccion", projectDetails.direccion)
        formData.append("sucursal", projectDetails.sucursal)

        formData.append("correoFacturacion", projectDetails.correoFacturacion)
        formData.append("regimenFiscal", projectDetails.regimenFiscal)
        formData.append("tipoFactura", projectDetails.tipoFactura)
        formData.append("metodoPago", projectDetails.metodoPago)
        formData.append("formaPago", projectDetails.formaPago)
        formData.append("usoCFDI", projectDetails.usoCFDI)

        formData.append("idProyecto", projectDetails.idProyecto)
        formData.append("inicioProceso", projectDetails.inicioProceso)
        formData.append("inicioTecnico", projectDetails.inicioTecnico)
        formData.append("nombreEncargado", projectDetails.nombreEncargado)
        formData.append("folioAceptado", projectDetails.folioAceptado)
        formData.append("estatusProyecto", projectDetails.estatusProyecto)
        formData.append("subtotal", currencyFormatter.format(projectDetails.subtotal))
        formData.append("total", currencyFormatter.format(projectDetails.total))
        formData.append("ivaGenerado", currencyFormatter.format(projectDetails.ivaGenerado))
        // NEW JUN04
        formData.append("anticipo", currencyFormatter.format(projectDetails.anticipo))
        formData.append("plazosDePago", projectDetails.plazosDePago)
        formData.append("estatusContable", projectDetails.estatusContable)

        // END JUN04
        // NEW JUN04.2
        // formData.append("pagado", projectDetails.pagado)
        // formData.append("porPagar", projectDetails.porPagar)

        formData.append("pagado", currencyFormatter.format(payedAmount))
        formData.append("porPagar", currencyFormatter.format(remainingAmount))
        formData.append("pagoAdicional", projectDetails.pagoAdicional)
        formData.append("fechaPago", projectDetails.fechaPago)
        formData.append("bancoPago", projectDetails.bancoPago)

        // formData.append("payment", payment)
        // END JUN04.2
        formData.append("comentarios", projectDetails.comentarios)
        formData.append("condicion", projectDetails.condicion)

        formData.append('file', file[0])
        formData.append('extraFile', extraFile[0])


        // SWAP MAY/29
        // fetch('http://localhost:4000/project', {
        //     method: 'POST',
        //     body: formData
        // }).then(res => res.json()).
        // then(data => console.log(data)).
        // catch(err => console.log(err));
        // END SWAP MAY/29

        // OFF AT MAY/29
        axios.post('http://localhost:4000/project', formData, {
            cliente: projectDetails.cliente,
            numeroCliente: projectDetails.numeroCliente,
            razonSocial: projectDetails.razonSocial,
            correoPrincipal: projectDetails.correoPrincipal,
            direccion: projectDetails.direccion,
            sucursal: projectDetails.sucursal,

            correoFacturacion: projectDetails.correoFacturacion,
            regimenFiscal: projectDetails.regimenFiscal,
            tipoFactura: projectDetails.tipoFactura,
            metodoPago: projectDetails.metodoPago,
            formaPago: projectDetails.formaPago,
            usoCFDI: projectDetails.usoCFDI,

            idProyecto: projectDetails.idProyecto,
            inicioProceso: projectDetails.inicioProceso,
            inicioTecnico: projectDetails.inicioTecnico,
            nombreEncargado: projectDetails.nombreEncargado,
            folioAceptado: projectDetails.folioAceptado,
            file: file,
            estatusProyecto: projectDetails.estatusProyecto,
            subtotal: projectDetails.subtotal,
            total: projectDetails.total,
            ivaGenerado: projectDetails.ivaGenerado,
            anticipo: projectDetails.anticipo,
            plazosDePago: projectDetails.plazosDePago,
            estatusContable: projectDetails.estatusContable,
            // pagado: projectDetails.pagado,
            // porPagar: projectDetails.porPagar,

            pagado: payedAmount,
            porPagar: remainingAmount,
            pagoAdicional: projectDetails.pagoAdicional,
            fechaPago: projectDetails.fechaPago,
            bancoPago: projectDetails.bancoPago,
            // payment:payment,

            comentarios: projectDetails.comentarios,
            condicion: projectDetails.condicion
        })
        .then((data) => {
            setMessage({type:"success", text:data.message})

            console.log(data)
            setTimeout(() => {
                        setMessage({type:"invisible-msg", text:"Exit"})
                    }, 1300)
                    setTimeout(() => {
                        window.location.href="/main"
                    }, 1800)
        })
        .catch(err => console.log(err))
        // OFF AT MAY/29

        

        // TURN BACK ON! EMAIL NOTIFICATION FOR NEW PROJECTS
        // var templateParams = {
        //     name:'Orion'
        // }
        // emailjs.send('service_jmbkmfa', 'template_clwofcp', templateParams,'9iV9-lk3L2WSurnZn')
        // END APR26


        // ASLEEP APR11 
        // fetch('http://localhost:4000/project', {
        //     method: "POST",
        //     // file: formData.file,
        //     body: JSON.stringify(projectDetails),
        //     headers: {
        //         "Content-Type":"application/json"
        //         // "Content-Type":"multipart/form-data" 
        //     }
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     setMessage({type:"success", text:data.message})

        //     setProjectDetails({
        //         cliente:"",
        //         idProyecto:"",
        //         inicioProceso:"",
        //         inicioTecnico:"",
        //         nombreEncargado:"",
        //         folioAceptado:"",
        //         // folioPDF:"",
        //         estatusProyecto:"",
        //         comentarios:"",
        //     })
        //     console.log(data)
        //     setTimeout(() => {
        //         setMessage({type:"invisible-msg", text:"Exit"})
        //     }, 1300)
        //     setTimeout(() => {
        //         window.location.href="/main"
        //     }, 1800) 
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
        // ASLEEP APR11

    }

    // NEW JUN04
    // const payedAmount = ((projectDetails.total) - (projectDetails.anticipo))
    // console.log(payedAmount)
    // END JUN04


    // NEW JUN06
    // const [payment, setPayment] = useState([])

    // const handleAddPaymemt = () => {
    //     console.log("add payment button clicked")
    //     const paymentABC=[...payment, []]
    //     setPayment(paymentABC)
    // }

    // const handleChange = (onChangeValue, i) => {
    //     const inputData=[...payment]
    //     inputData[i]=onChangeValue.target.value;
    //     setPayment(inputData)
    // }

    // console.log(payment)
    // END JUN06

    // NEW MAY08
    const handleUploadClick = () => {
        if (file.length) {
            const data = packFiles(file)
            console.log(file)
            console.log(packFiles(file))
            console.log("this being called")
            handleSubmit(data)
        }
    }
        // END MAY08

    // NEW MAY06
    // function appendFile() {
    //     setFile(this.target.files[0])
    // }

    function addFile() {
        event.preventDefault();
        console.log("Add more files")

    //     // const newUploadField = document.getElementById("fileUploadDiv")
    //     // console.log(newUploadField)
    //     // newProjectForm.appendChild(newUploadField)
    //     // console.log(newProjectForm)

    //     const newEmailField = document.createElement("input");
    //     newEmailField.type = "file";

    // //     // newEmailField.onchange = function() {appendFile()}
    // //     console.log(newEmailField)
    //     // newProjectForm.appendChild(newEmailField);

    //     fileUploadDiv.appendChild(newEmailField);

    }
    // END MAY06

    //TESTING

    return(
        <>
            <div>
                <Header/>
                <h1 className="mainSubHeaderNewProject">Registro de Proyecto</h1>

                <form action="/project" method="POST" enctype="multipart/form-data" name="myFiles" id="newProjectForm" className="container-newProject" onSubmit={handleSubmit}>
                    {/* CONDITION HEADER */}
                    <div className="conditionHeader">
                        <label className="conditionTitle">Condición</label>
                        <select className="conditionDrop">
                            <option>Seleccionar condición...</option>
                            <div>
                                {/* <img src={blueMark}></img> */}
                            </div>
                            <option>Activo</option>
                            <option>Terminado</option>
                            <option>Dormido</option>
                            <option>Cancelado</option>
                        </select>
                    </div>
                    {/* CONDITION HEADER */}

                    {/* CLIENTE */}
                    <label className="formSectionTitle">Datos del Cliente</label>

                    <div className="multiFieldRowThree"> 
                        <label>Cliente</label>  
                        <label>Número de Cliente</label>
                        <label>Razón Social</label>
                    </div>

                    <div className="multiFieldRowThree">
                        <input type="text"required onChange={handleInput} placeholder="Ingresar nombre del cliente..." name="cliente" value={projectDetails.cliente}></input>
                        <input type="text"required onChange={handleInput} placeholder="Ingrese numero" name="numeroCliente" value={projectDetails.numeroCliente}></input>
                        <input type="text" onChange={handleInput} placeholder="Ingresar razón social del cliente..." name="razonSocial" value={projectDetails.razonSocial}></input>
                        
                    </div>

                    <div className="multiFieldRowThree">
                        <label>Correo Principal</label>
                        <label>Dirección</label>
                        <label>Número de Sucursal</label>
                    </div>

                    <div className="multiFieldRowThree">
                        <input type="text" onChange={handleInput} placeholder="Ingresar correo principal del cliente..." name="correoPrincipal" value={projectDetails.correoPrincipal}></input>
                        <input type="text" onChange={handleInput} placeholder="Ingresar domicilio de cliente..." name="direccion" value={projectDetails.direccion}></input>
                        <input type="text" onChange={handleInput} placeholder="Ingresar número de sucursal..." name="sucursal" value={projectDetails.sucursal}></input>

                    </div>
                    {/* CLIENTE */}

                    {/* DATOS DE FACTURACION */}
                    <label className="formSectionTitle">Datos de Facturación</label>

                    <div className="multiFieldRowThree">
                        <label>Correo de Facturación</label>
                        <label>Régimen Fiscal</label>
                        <label>Tipo de Factura</label>
                    </div>

                    <div className="multiFieldRowThree">
                        <input type="text" onChange={handleInput} placeholder="Ingresar correo de facturación..." name="correoFacturacion" value={projectDetails.correoFacturacion}></input>
                        <select required onChange={handleInput} placeholder="Escoger régimen fiscal del cliente..." name="regimenFiscal" value={projectDetails.regimenFiscal}>
                            <option>Escoger régimen fiscal del cliente...</option>
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
                        <select required onChange={handleInput} placeholder="Escoger tipo de factura..." name="tipoFactura" value={projectDetails.tipoFactura}>
                            <option>Escoger tipo de factura...</option>
                            <option>Por el total</option>
                            <option>Complemento de pago</option>
                        </select>
                    </div>

                    <div className="multiFieldRowThree">
                        <label>Método de Pago</label>
                        <label>Forma de Pago</label>
                        <label>Uso CFDI</label>
                    </div>

                    <div className="multiFieldRowThree">
                        <select required onChange={handleInput} placeholder="Escoger método de pago..." name="metodoPago" value={projectDetails.metodoPago}>
                            <option>Escoger método de pago...</option>
                            <option>PUE</option>
                            <option>PPD</option>
                        </select>
                        <select required onChange={handleInput} placeholder="Escoger forma de pago..." name="formaPago" value={projectDetails.formaPago}>
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
                        <select required onChange={handleInput} placeholder="Escoger uso CFDI..." name="usoCFDI" value={projectDetails.usoCFDI}>
                            <option>Escoger Uso CFDI...</option>
                            <option>G01: Adquisición de mercancías</option>
                            <option>G02: Devoluciones, descuentos o bonificaciones</option>
                            <option>G03: Gastos en general</option>
                            <option>I01: Construcciones</option>
                            <option>I02: Mobiliario y equipo de oficina por inversiones</option>
                            <option>I03: Equipo de transporte</option>
                            <option>I04: Equipo de cómputo y accesorios</option>
                            <option>I05: Dados, troqueles, moldes, matrices y herramental</option>
                            <option>I06: Comunicaciones telefónicas</option>
                            <option>I07: Comunicaciones satelitales</option>
                            <option>I08: Otra maquinaria y equipo</option>
                            <option>D01: Honorarios médicos, dentales y gastos hospitalarios</option>
                            <option>D02: Gastos médicos por incapacidad o discapacidad</option>
                            <option>D03: Gastos funerales</option>
                            <option>D04: Donativos</option>
                            <option>D05: Intereses reales efectivamente pagados por créditos hipotecarios</option>
                            <option>D06: Aportaciones voluntarias al SAR</option>
                            <option>D07: Primas por seguros de gastos médicos</option>
                            <option>D08: Gastos de transportación escolar obligatoria</option>
                            <option>D09: Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones</option>
                            <option>D10: Pagos por servicios educativos</option>
                            <option>CP01: Pagos</option>
                            <option>CN01: Nómina</option>
                            <option>S01: Sin Efectos Fiscales</option>
                        </select>
                    </div>
                    {/* DATOS DE FACTURACION */}

                    {/* DATOS DEL PROYECTO */}
                    <label className="formSectionTitle">Datos del Proyecto</label>

                    <div className="multiFieldRowThree">
                        <label>Nombre o ID de Proyecto</label>
                        <label>Encargado del Proyecto</label>
                        <label>Folio Aceptado</label>
                    </div>

                    <div className="multiFieldRowThree">
                        <input type="text"required onChange={handleInput} placeholder="Ingresar ID o nombre de proyecto..." name="idProyecto" value={projectDetails.idProyecto}></input>
                        <select required onChange={handleInput} placeholder="Escoger encargado..." name="nombreEncargado" value={projectDetails.nombreEncargado}>
                            <option>Escoger encargado...</option>
                            <option>Gustavo Flores, Sr.</option>
                            <option>Gustavo Flores, Jr.</option>
                            <option>Pamela Flores</option>
                            <option>Cesar Flores</option>
                        </select>
                        <input type="text" required onChange={handleInput} placeholder={randomNumber} value={projectDetails.folioAceptado} ></input>
                    </div>

                    <div className="multiFieldRowThree">
                        <label>Inicio de Proceso</label>
                        <label>Inicio Técnico</label>
                        <label>Estatus del Proyecto</label>
                    </div>

                    <div className="multiFieldRowThree">
                        <input type="date"required onChange={handleInput} placeholder="Inicio de proceso..." name="inicioProceso" value={projectDetails.inicioProceso}></input>
                        <input type="date" onChange={handleInput} placeholder="Inicio técnico de proyecto..." name="inicioTecnico" value={projectDetails.inicioTecnico}></input>
                        <select className="estatusDropDown" required onChange={handleInput} placeholder="Escoger estatus..." name="estatusProyecto" value={projectDetails.estatusProyecto}>
                            <option>Escoger estatus...</option>
                            <option>Realizar Cotización</option>
                            <option>Cotización Aceptada</option>
                            <option>Recotización</option>
                            <option>Cotización Rechazada</option>
                            <option>Levantamiento</option>
                            <option>Pago Inicial Recibido</option>
                            <option>Pago Intermedio Recibido</option>
                            <option>Pago Final Recibido</option>
                            <option>Pago Pendiente</option>
                            <option>Agendar Instalación</option>
                            <option>Instalación Realizada</option>
                            <option>Proyecto Finalizado</option>
                            <option>Agendar Mantenimiento</option>
                        </select>
                    </div>

                    {/* DATOS DEL PROYECTO */}

                    {/* DOCUMENTACION */}
                    <label className="formSectionTitle">Documentación Requerida</label>

                    <div className="one">
                        {/* <div>
                            {checkedList.map((item, index) => {
                                return (
                                    <div className="chip">
                                        <input type="file" name="myFiles" accept=".pdf" multiple onChange={(e) => setFile(e.target.files)} /> 
                                    </div>
                                )
                            })}
                        </div> */}
                        <div className="card-body">
                            {checklist_items.map((item) => {
                                return (
                                    <div key={item.id} className="checkbox-container">
                                        <input 
                                            className="checklistBoxes"
                                            type="checkbox"
                                            name="documentos"
                                            id={item.id}
                                            value={item.value}
                                            onChange={handleSelect}
                                        />
                                        <label className="checklistLabel"for={item.id}>{item.value}</label>
                                        {/* here */}
                                    </div>
                                )
                            })}
                        </div>
                        {/* here */}
                        <div>
                            {checkedList.map((item, index) => {
                                return (
                                    <div className="chip">
                                        <input type="file" name="myFiles" accept=".pdf" multiple onChange={(e) => setFile(e.target.files)} /> 
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <div>
                        <input type="checkbox" name="documentos" value></input>
                    </div> */}

                    {/* DOCUMENTACION */}

                    {/* DESGLOSE FINANCIERO */}
                    <label className="formSectionTitle">Desglose Financiero</label>

                    <div className="multiFieldRowThree">
                        <label>Subtotal del Proyecto</label>
                        <label>Total del Proyecto</label>
                        <label>IVA Generado</label>
                    </div>
                    
                    <div className="multiFieldRowThree">
                        {/* <CurrencyInput type="text"required onChange={handleInput} placeholder="Ingresar subtotal de proyecto..." name="subtotal" value={projectDetails.subtotal}></CurrencyInput> */}
                        <input type="text"required onChange={handleInput} placeholder="Ingresar subtotal de proyecto..." name="subtotal" value={projectDetails.subtotal}></input>
                        {/* <CurrencyInput type="text"required onChange={handleInput} placeholder="Ingresar total de proyecto..." name="total" value={projectDetails.total}></CurrencyInput> */}
                        <input type="text"required onChange={handleInput} placeholder="Ingresar total de proyecto..." name="total" value={projectDetails.total}></input>
                        {/* <CurrencyInput type="text"required onChange={handleInput} placeholder={taxesGenerated} name="ivaGenerado" value={projectDetails.ivaGenerado}></CurrencyInput> */}
                        <input type="text"required onChange={handleInput} placeholder={currencyFormatter.format(taxesGenerated)} name="ivaGenerado" value={projectDetails.ivaGenerado}></input>
                    </div>

                    <div className="multiFieldRowThree">
                        <label>Anticipo del Proyecto</label>
                        <label>Monto Pagado</label>
                        <label>Monto Pendiente de Pago</label>
                    </div>

                    <div className="multiFieldRowThree">
                        <input type="text" onChange={handleInput} placeholder="Ingresar total de anticipo otorgado..." name="anticipo" value={projectDetails.anticipo}></input>
                        <input type="text" onChange={handleInput} placeholder={currencyFormatter.format(payedAmount)} name="pagado"value={projectDetails.pagado}></input>
                        <input type="text" onChange={handleInput} placeholder={currencyFormatter.format(remainingAmount)} name="porPagar" value={projectDetails.porPagar}></input>
                    </div>

                    <div className="multiFieldRowTwo">
                        <label>Plazos de Pago</label>
                        <label>Estatus Contable</label>
                    </div>

                    <div className="multiFieldRowTwo">
                        <input type="number" onChange={handleInput} placeholder="Mencionar cantidad de pagos a realizar..." name="plazosDePago" value={projectDetails.plazosDePago}></input>
                        <select className="estatusDropDown" required onChange={handleInput} placeholder="Seleccionar Estatus Contable..." name="estatusContable" value={projectDetails.estatusContable}>
                            <option>Escoger estatus...</option>
                            <option>Entrada</option>
                            <option>Aceptado</option>
                            <option>Proceso de Facturación</option>
                            <option>Facturado - Pendiente de Pago</option>
                            <option>Facturado - Pagado</option>
                            <option>Complemento de Pago</option>
                        </select>
                    </div>

                    {/* <div className="multiFieldRowThree">
                        <label>Pago Adicional X</label>
                        <label>Fecha de pago</label>
                        <label>Banco</label>
                    </div>

                    <div className="multiFieldRowThree">
                        <input type="text" onChange={handleInput} placeholder="Ingresar suma de pago..." name="pagoAdicional" value={projectDetails.pagoAdicional}></input>
                        <input type="date"required onChange={handleInput} placeholder="Fecha de pago..." name="fechaPago" value={projectDetails.fechaPago}></input>
                        <select required onChange={handleInput} placeholder="Escoger banco destino..." name="bancoPago" value={projectDetails.bancoPago}>
                            <option>Escoger banco destino...</option>
                            <option>Banamex - MEX</option>
                            <option>Banamex - USD</option>
                            <option>Banorte - MEX</option>
                        </select>
                    </div> */}


                    {/* DESGLOSE FINANCIERO */}



                    {/* <div className="multiFieldRowTwo">
                        <label>Documentos de Apoyo</label>
                    </div> */}
                    {/* <div className="multiFieldRowTwo">
                        <div id="fileUploadDiv" className="fileUI"> */}
                            {/* <input type="file" name="myFiles" accept=".pdf" multiple onChange={(e) => setFile(e.target.files)} />  */}
                            {/* <button className="addMoreFilesButton" onClick={addFile}>+</button> */}
                            {/* <button className="addMoreFilesButton" onClick={()=>handleAddExtraFile()}>+</button> */}
                            {/* {extraFile.map((data,i)=> {
                            return(
                                <div >
                                    <label>Archivo Adicional {i+1}</label>
                                    <input type="file" name="myFiles" accept=".pdf" multiple onChange={(e) => setFile(e.target.files)} /> 
                                </div>
                            )
                        })} */}
                        {/* </div> */}
                        {/* <div>
                        {extraFile.map((data,i)=> {
                            return(
                                <div >
                                    <label>Archivo Adicional {i+1}</label>
                                    <input type="file" name="myFiles" accept=".pdf" multiple onChange={(e) => setFile(e.target.files)} /> 
                                </div>
                            )
                        })}
                        </div> */}

                    {/* </div> */}


        
                    <div className="multiFieldRowThree">
                        {/* <CurrencyInput
                            id="subtotal"
                            name="subtotal"
                            onChange={handleInput}
                            placeholder="Ingresar subtotal de proyecto..."
                            // defaultValue={0}
                            decimalsLimit={2}
                            allowDecimals={true}
                            prefix="$"
                            // value={projectDetails.subtotal}
                            onValueChange={(value, name, values) => console.log(value, name, values)}
                        />

                        <CurrencyInput
                            id="total"
                            name="total"
                            onChange={handleInput}
                            placeholder="Ingresar total de proyecto..."
                            // defaultValue={0}
                            decimalsLimit={2}
                            allowDecimals={true}
                            prefix="$"
                            // value={projectDetails.subtotal}
                            onValueChange={(value, name, values) => console.log(value, name, values)}
                        />               */}
                      
                    </div>

                 
                    <div className="multiFieldRowThree">
                        {/* <CurrencyInput
                            id="anticipo"
                            name="anticipo"
                            onChange={handleInput}
                            placeholder="Ingresar total de anticipo otorgado..."
                            // defaultValue={0}
                            decimalsLimit={2}
                            allowDecimals={true}
                            prefix="$"
                            // value={projectDetails.subtotal}
                            onValueChange={(value, name, values) => console.log(value, name, values)}
                        />   */}
                  
                    </div>

                    {/* NEW JUN06 */}
                    {/* <button className="btnSubmitProject" type="button" onClick={()=>handleAddPaymemt()}>Agregar Pago</button>
                        {payment.map((data,i)=> {
                            return(
                                <div >
                                    <label>Pago Adicional {i+1}</label> */}
                                    {/* <input type="text" onChange={handleInput} placeholder="Monto abonado..." name="payment" value={payment} /> */}
                                    {/* <input onChange={e=> handleChange(e,i)} />
                                </div>
                            )
                        })} */}
                    {/* END JUN06 */}
                    {/* ADICIONALES */}
                    <label className="formSectionTitle">Adicionales</label>

                    <label>Comentarios</label>
                    <textarea type="text" onChange={handleInput} placeholder="Observaciones adicionales..." name="comentarios" value={projectDetails.comentarios}></textarea>
                    {/* ADICIONALES */}





                    {/* <div className="multiFieldRow">
                        <label>Cliente</label>  
                        <input type="text"required onChange={handleInput} placeholder="Ingresar nombre del cliente..." name="cliente" value={projectDetails.cliente}></input>

                        <label>Nombre o ID de Proyecto</label>
                        <input type="text"required onChange={handleInput} placeholder="Ingresar ID o nombre de proyecto..." name="idProyecto" value={projectDetails.idProyecto}></input>
                    </div> */}



                    {/* <label>Inicio de Proceso</label>
                    <input type="date"required onChange={handleInput} placeholder="Inicio de proceso..." name="inicioProceso" value={projectDetails.inicioProceso}></input>

                    <label>Inicio Técnico</label>
                    <input type="date" onChange={handleInput} placeholder="Inicio técnico de proyecto..." name="inicioTecnico" value={projectDetails.inicioTecnico}></input> */}

                    {/* <label>Encargado del Proyecto</label>
                    <select required onChange={handleInput} placeholder="Escoger encargado..." name="nombreEncargado" value={projectDetails.nombreEncargado}>
                        <option>Escoger encargado...</option>
                        <option>Gustavo Flores, Sr.</option>
                        <option>Gustavo Flores, Jr.</option>
                        <option>Pamela Flores</option>
                        <option>Cesar Flores</option>
                    </select> */}

                    
                    {/* <label>Folio Aceptado</label>
                    <input type="text" required onChange={handleInput} placeholder={randomNumber} value={projectDetails.folioAceptado} ></input> */}

                    {/* OFF MAY06 --> ORIGINAL & WORKING */}
                    {/* <label>Documento de Apoyo</label>
                    <input type="file" onChange={e => setFile(e.target.files[0])}/> */}
                    {/* OFF MAY06 */}

                    {/* NEW MAY06 */}
                    {/* <label>Documentos de Apoyo</label>
                    <div id="fileUploadDiv" className="fileUI">
                        <input type="file" name="myFiles" accept=".pdf" multiple onChange={(e) => setFile(e.target.files)} />  */}
                        {/* NEW MAY08 */}
                        {/* {renderFileList()} */}
                        {/* END MAYO8 */}
                        {/* <button className="addMoreFilesButton" onClick={addFile}>+</button>
                    </div> */}
                    {/* END MAY06 */}

                    {/* NEW MAY07 */}
                    {/* {files.map((file, index) => ( */}
                    {/* {inputFields.map((inputField, index) => (
                        <div key={index}>
                            <input type="file" accept=".pdf" value={inputField.value} onChange={(e) => handleValueChange(index, e)} />
                            <button className="addMoreFilesButton" onClick={handleAddFields}>+</button>
                        </div>                        
                    ))} */}
                    {/* END MAY07 */}

                    {/* <label>Estatus del Proyecto</label>
                    <select required onChange={handleInput} placeholder="Escoger estatus..." name="estatusProyecto" value={projectDetails.estatusProyecto}>
                        <option>Escoger estatus...</option>
                        <option>Realizar Cotización</option>
                        <option>Cotización Aceptada</option>
                        <option>Recotización</option>
                        <option>Cotización Rechazada</option>
                        <option>Levantamiento</option>
                        <option>Pago Inicial Recibido</option>
                        <option>Pago Intermedio Recibido</option>
                        <option>Pago Final Recibido</option>
                        <option>Pago Pendiente</option>
                        <option>Agendar Instalación</option>
                        <option>Instalación Realizada</option>
                        <option>Proyecto Finalizado</option>
                        <option>Agendar Mantenimiento</option>

                    </select> */}
                
                    {/* <label>Subtotal del Proyecto</label>
                    <input type="text"required onChange={handleInput} placeholder="Ingresar subtotal de proyecto..." name="subtotal" value={projectDetails.subtotal}></input> */}

                    {/* <label>Total del Proyecto</label> */}
                    {/* <input type="text"required onChange={handleInput} placeholder="Ingresar total de proyecto..." name="total" value={projectDetails.total}></input> */}
                    
                    {/* new jun04 */}
                    {/* <label>Anticipo del Proyecto</label> */}
                    {/* <input type="text" onChange={handleInput} placeholder="Ingresar total de anticipo otorgado..." name="anticipo" value={projectDetails.anticipo}></input> */}

                    {/* <label>Plazos de Pago</label> */}
                    {/* <input type="number" onChange={handleInput} placeholder="Mencionar cantidad de pagos a realizar..." name="plazosDePago" value={projectDetails.plazosDePago}></input> */}
                    {/* end jun 04 */}

                    {/* new jun04.2 */}
                    {/* <label>Monto Pagado</label> */}
                    {/* <input type="text" onChange={handleInput} placeholder={payedAmount} name="pagado"value={projectDetails.pagado}></input> */}

                    {/* <label>Monto Pendiente de Pago</label> */}
                    {/* <input type="text" onChange={handleInput} placeholder={remainingAmount} name="porPagar" value={projectDetails.porPagar}></input> */}

                    {/* end jun04.2 */}

                    {/* <label>Comentarios</label>
                    <textarea type="text" onChange={handleInput} placeholder="Observaciones adicionales..." name="comentarios" value={projectDetails.comentarios}></textarea> */}

                    <button className="btnSubmitProject" type="submit" onClick={handleSubmit}>Agregar</button>
                    
                    {/* <button className="btnNewProject" type="submit" onClick={handleSubmit}>Agregar</button> */}
                    {/* <button className="btnNewProject" type="submit" onClick={handleUploadClick}>Agregar</button> */}

                    <p className={message.type}>{message.text}</p>

                </form>
                <Footer/>
            </div>
        </>
    )
}

export default Project
