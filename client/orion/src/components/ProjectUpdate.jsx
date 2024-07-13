import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";

// NEW APR26
import emailjs from '@emailjs/browser'
import { set } from "mongoose";
// END APR26

export default function ProjectUpdate() {

    const location = useLocation()

    const [cliente, setCliente] = useState("")
    const [razonSocial, setRazonSocial] = useState("")
    const [correoPrincipal, setCorreoPrincipal] = useState("")
    const [direccion, setDireccion] = useState("")
    const [sucursal, setSucursal] = useState("")

    const [correoFacturacion, setCorreoFacturacion] = useState("")
    const [regimenFiscal, setRegimenFiscal] = useState("")
    const [tipoFactura, setTipoFactura] = useState("")
    const [metodoPago, setMetodoPago] = useState("")
    const [formaPago, setFormaPago] = useState("")
    const [usoCFDI, setUsoCFDI] = useState("")

    const [idProyecto, setIdproyecto] = useState("")
    const [nombreEncargado, setNombreencargado] = useState("")
    const [folioAceptado, setFolioaceptado] = useState("")
    const [inicioProceso, setInicioproceso] = useState("")
    const [inicioTecnico, setIniciotecnico] = useState ("")
    const [estatusProyecto, setEstatusproyecto] = useState("")

    const [subtotal, setSubtotal] = useState("")
    const [total, setTotal] = useState("")
    const [ivaGenerado, setIvaGenerado] = useState("")
    const [anticipo, setAnticipo] = useState("")
    const [pagado, setPagado] = useState("")
    const [porPagar, setPorPagar] = useState("")
    const [plazosDePago, setPlazosDePago] = useState("")
    const [estatusContable, setEstatusContable] = useState("")

    const [pagoAdicional, setPagoAdicional] = useState("")
    const [fechaPago, setFechaPago] = useState("")
    const [bancoPago, setBancoPago] = useState("")

    const [comentarios, setComentarios] = useState("")
    const [condicion, setCondicion] = useState("")

    const [file, setFile] = useState("")
    const [payment, setPayment] = useState([])
    const [extraPayment, setExtraPayment] = useState("")

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

    const handleAddPaymemt = () => {
        console.log("add payment button clicked")
        const paymentABC=[...payment, []]
        setPayment(paymentABC)
    }
    
    const handleChange = (onChangeValue, i) => {
        const inputData=[...payment]
        inputData[i]=onChangeValue.target.value;
        setPayment(inputData)
    }
    
    console.log(payment)
    // END JUN06

    // NEW JUN07
    const [extraFile, setExtraFile] = useState([])

    const handleAddExtraFile = () => {
        console.log("add more files button clicked")
        const fileABC=[...extraFile, []]
        setExtraFile(fileABC)
    }
    
    const handleChangeFile = (onChangeValue, i) => {
        const inputData=[...extraFile]
        inputData[i]=onChangeValue.target.value;
        setExtraFile(inputData)
    }
    
    console.log(extraFile)
    // END JUN07 

    // // OFF JUN06 PAYMENT HANDLING
    // const totalAmount = (location.state?.total)
    // const totalAmountNumber = parseFloat(totalAmount)

    // const downPaymentTotal =(location.state?.anticipo)
    // const downPaymentNumber = parseFloat(downPaymentTotal)

    // const subPayment = (location.state?.payment)
    // const subPaymentNumber = parseFloat(subPayment)
    // console.log(subPayment)
    // console.log(subPaymentNumber)
    // console.log(typeof(subPaymentNumber))
  
    // const payedAmount = parseFloat(downPaymentNumber + subPaymentNumber)
    // // const payedAmount = parseFloat(downPaymentNumber)
    // console.log(payedAmount)
    // console.log(typeof(payedAmount))

    // const remainingAmount = parseFloat((totalAmountNumber - downPaymentNumber)-subPaymentNumber)
    // // const remainingAmount = parseFloat((totalAmountNumber - downPaymentNumber))
    // console.log(remainingAmount)
    // console.log(typeof(remainingAmount))

  


    useEffect(() => {
        console.log(location)
        setCliente(location.state?.cliente)
        setRazonSocial(location.state?.razonSocial)
        setCorreoPrincipal(location.state?.correoPrincipal)
        setDireccion(location.state?.direccion)
        setSucursal(location.state?.sucursal)

        setCorreoFacturacion(location.state?.correoFacturacion)
        setRegimenFiscal(location.state?.regimenFiscal)
        setTipoFactura(location.state?.tipoFactura)
        setMetodoPago(location.state?.metodoPago)
        setFormaPago(location.state?.formaPago)
        setUsoCFDI(location.state?.usoCFDI)

        setIdproyecto(location.state?.idProyecto)
        setNombreencargado(location.state?.nombreEncargado)
        setFolioaceptado(location.state?.folioAceptado)
        setInicioproceso(location.state?.inicioProceso)
        setIniciotecnico(location.state?.inicioTecnico)
        setEstatusproyecto(location.state?.estatusProyecto)

        setSubtotal(location.state?.subtotal)
        setTotal(location.state?.total)
        setIvaGenerado(location.state?.ivaGenerado)
        setAnticipo(location.state?.anticipo)
        setPagado(location.state?.pagado)
        setPorPagar(location.state?.porPagar)
        setPlazosDePago(location.state?.plazosDePago)
        setEstatusContable(location.state?.estatusContable)

        setPagoAdicional(location.state?.pagoAdicional)
        setFechaPago(location.state?.fechaPago)
        setBancoPago(location.state?.bancoPago)

        setComentarios(location.state?.comentarios)
        setCondicion(location.state?.condicion)

        setFile(location.state?.file)
        setExtraPayment(location.state?.extraPayment)
    }, [])


     // START:EQUATIONS - FINANCE SECTION
     const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    const subTotalAmount = (location.state?.subtotal)
    // const subTotalAmountNumber = parseFloat(subTotalAmount)
    const subTotalAmountNumber = ((subTotalAmount).replace(/[^0-9.]/g, ''))
    console.log(subTotalAmountNumber)


    const totalAmount = (location.state?.total)
    //  const totalAmountNumber = parseFloat(totalAmount)
    const totalAmountNumber = ((totalAmount).replace(/[^0-9.]/g, ''))
    console.log(totalAmountNumber)
 
    const downPaymentTotal =(location.state?.anticipo)
    // const downPaymentNumber = parseFloat(downPaymentTotal)
    const downPaymentNumber = ((downPaymentTotal).replace(/[^0-9.]/g, ''))
    console.log(downPaymentNumber)

    const additionalPaymentAmount = (location.state?.pagoAdicional)
    // const additionalPaymentAmountNumber = parseFloat(additionalPaymentAmount)
    const additionalPaymentAmountNumber = ((additionalPaymentAmount).replace(/[^0-9.]/g, ''))
    console.log(additionalPaymentAmountNumber)

    // const payedAmount = parseFloat(downPaymentNumber + additionalPaymentAmountNumber)
    const payedAmount = ((downPaymentNumber + additionalPaymentAmountNumber).replace(/[^0-9.]/g, ''))
    console.log(currencyFormatter.format(payedAmount))

    // const remainingAmount = parseFloat((totalAmountNumber - downPaymentNumber)-additionalPaymentAmountNumber)
    const remainingAmount = (((totalAmountNumber - downPaymentNumber)-(additionalPaymentAmountNumber)).toString().replace(/[^0-9.]/g, ''))
    console.log(remainingAmount)

    // const taxesGenerated = parseFloat(totalAmountNumber - subTotalAmountNumber)
    const taxesGenerated =(totalAmountNumber - subTotalAmountNumber)
    console.log(typeof(taxesGenerated), taxesGenerated)


    //  const taxesGenerated =  currencyFormatter.format((totalAmountNumber - subTotalAmountNumber))

    

 
     // END: PAYMENT HANDLING


     // START: EXTRA DOCS HANDLING
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
     // END: EXTRA DOCS HANDLING

    //  START: NEW PAYMENT SLOTS
    const [data, setData] = useState([{pagoAdicional:"", fechaPago:"", bancoPago:""}])

    const handleClick = () => {
        setData([...data,{pagoAdicional:"", fechaPago:"", bancoPago:""}])
    }
    //  END: NEW PAYMENT SLOTS

    const handleClientChange = (event) => { 
        event.preventDefault()
        console.log(location.state?.cliente)
        setCliente(event.target?.value)
        console.log(cliente)
    }

    const handleRazonSocial = (event) => { 
        console.log(location.state?.razonSocial)
        setRazonSocial(event.target?.value)
        console.log(razonSocial)
    }

    const handleCorreoPrincipal = (event) => { 
        console.log(location.state?.correoPrincipal)
        setCorreoPrincipal(event.target?.value)
        console.log(correoPrincipal)
    }

    const handleDireccion = (event) => { 
        console.log(location.state?.direccion)
        setDireccion(event.target?.value)
        console.log(direccion)
    }

    const handleSucursal = (event) => { 
        console.log(location.state?.sucursal)
        setSucursal(event.target?.value)
        console.log(sucursal)
    }

    const handleCorreoFacturacion = (event) => { 
        console.log(location.state?.correoFacturacion)
        setCorreoFacturacion(event.target?.value)
        console.log(correoFacturacion)
    }

    const handleRegimenFiscal = (event) => { 
        console.log(location.state?.regimenFiscal)
        setRegimenFiscal(event.target?.value)
        console.log(regimenFiscal)
    }

    const handleTipoFactura = (event) => { 
        console.log(location.state?.tipoFactura)
        setTipoFactura(event.target?.value)
        console.log(tipoFactura)
    }

    const handleMetodoPago = (event) => { 
        console.log(location.state?.metodoPago)
        setMetodoPago(event.target?.value)
        console.log(metodoPago)
    }

    const handleFormaPago = (event) => { 
        console.log(location.state?.formaPago)
        setFormaPago(event.target?.value)
        console.log(formaPago)
    }

    const handleUsoCFDI = (event) => { 
        console.log(location.state?.usoCFDI)
        setUsoCFDI(event.target?.value)
        console.log(usoCFDI)
    }

    const handleIdChange = (event) => { 
        console.log(location.state?.idProyecto)
        setIdproyecto(event.target?.value)
        console.log(idProyecto)
    }

    const handleInchargeChange = (event) => { 
        console.log(location.state?.nombreEncargado)
        setNombreencargado(event.target?.value)
        console.log(nombreEncargado)
    }

    const handleFolioChange = (event) => { 
        console.log(location.state?.folioAceptado)
        setFolioaceptado(event.target?.value)
        console.log(folioAceptado)
    }

    const handleStartChange = (event) => { 
        console.log(location.state?.inicioProceso)
        setInicioproceso(event.target?.value)
        console.log(inicioProceso)
    }

    const handleTechChange = (event) => { 
        console.log(location.state?.inicioTecnico)
        setIniciotecnico(event.target?.value)
        console.log(inicioTecnico)
    }

    const handleStatusChange = (event) => { 
        console.log(location.state?.estatusProyecto)
        setEstatusproyecto(event.target?.value)
        console.log(estatusProyecto)
    }

    const handleSubtotalChange = (event) => {
        console.log(location.state?.subtotal)
        setSubtotal(event.target?.value)
        // console.log(subtotal.replace(/\D/g, ""))
        console.log(subtotal)
    }

    const handleTotalChange = (event) => {
        console.log(location.state?.total)
        setTotal(event.target?.value)
        console.log(total)
    }

    const handleIvaGenerado = (event) => { 
        console.log(location.state?.ivaGenerado)
        setIvaGenerado(event.target?.value)
        console.log(ivaGenerado)
    }

    const handleDownPaymentChange = (event) => {
        console.log(location.state?.anticipo)
        setAnticipo(event.target?.value)
        console.log(anticipo)
    }

    const handlePagado = (event) => {
        console.log(location.state?.pagado)
        setPagado(event.target?.value)
        console.log(pagado)
    }

    const handlePorPagar = (event) => {
        console.log(location.state?.porPagar)
        setPorPagar(event.target?.value)
        console.log(porPagar)
    }

    const handlePlazosChange = (event) => {
        console.log(location.state?.plazosDePago)
        setPlazosDePago(event.target?.value)
        console.log(plazosDePago)
    }

    const handleEstatusContable = (event) => {
        console.log(location.state?.estatusContable)
        setEstatusContable(event.target?.value)
        console.log(estatusContable)
    }

    const handlePagoAdicional = (event) => {
        console.log(location.state?.pagoAdicional)
        setPagoAdicional(event.target?.value)
        console.log(pagoAdicional)
    }

    const handleFechaPago = (event) => {
        console.log(location.state?.fechaPago)
        setFechaPago(event.target?.value)
        console.log(fechaPago)
    }

    const handleBancoPago = (event) => {
        console.log(location.state?.bancoPago)
        setBancoPago(event.target?.value)
        console.log(bancoPago)
    }

    const handleCommentChange = (event) => { 
        console.log(location.state?.comentarios)
        setComentarios(event.target?.value)
        console.log(comentarios)
    }

    const handleConditionChange = (event) => {
        console.log(location.state?.condicion)
        setCondicion(event.target?.value)
        console.log(condicion)
    }

    const handleExtraPayment = (event) => {
        console.log(location.state?.extraPayment)
        setExtraPayment(event.target?.value)
        console.log(extraPayment)
    }

    const handlePdfChange = (event) => { 
        console.log(location.state?.file)
        setFile(event.target?.value)
        console.log(file)
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
        console.log("Print" + cliente, razonSocial, correoPrincipal, direccion, sucursal, 
            correoFacturacion, regimenFiscal, tipoFactura, metodoPago, formaPago, usoCFDI,
            idProyecto, nombreEncargado, folioAceptado, inicioProceso, inicioTecnico, estatusProyecto,
            subtotal, total, ivaGenerado, anticipo, pagado, porPagar, plazosDePago, estatusContable, 
            pagoAdicional, fechaPago, bancoPago, comentarios, condicion,
            file, payment, extraPayment)
        
        fetch("https://orion-backend-z5yv.onrender.com/updateProject", {
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
                cliente: cliente,
                razonSocial: razonSocial,
                correoPrincipal: correoPrincipal,
                direccion: direccion,
                sucursal: sucursal,

                correoFacturacion: correoFacturacion,
                regimenFiscal: regimenFiscal,
                tipoFactura: tipoFactura,
                metodoPago: metodoPago,
                formaPago: formaPago,
                usoCFDI: usoCFDI,

                idProyecto: idProyecto,
                nombreEncargado: nombreEncargado,
                folioAceptado: folioAceptado,
                inicioProceso: inicioProceso,
                inicioTecnico: inicioTecnico,
                estatusProyecto: estatusProyecto,

                subtotal: subtotal,
                total: total,
                ivaGenerado: ivaGenerado,
                anticipo: anticipo,
                pagado: pagado,
                porPagar: porPagar,
                plazosDePago: plazosDePago,
                estatusContable: estatusContable,

                pagoAdicional: pagoAdicional,
                fechaPago: fechaPago,
                bancoPago: bancoPago,

                comentarios: comentarios,
                condicion: condicion,

                // file: file,
                // payment: payment,
                // extraPayment: extraPayment,
            }),
        })
            .then((res) => res.json())
            .then((data => {
                console.log(data)
                window.location.href="/main"
            }))
    }

    const viewPDF = (e) => {
        event.preventDefault()
        console.log(file)
        window.open(`http://localhost:4000/files/${file}`, "_blank", "noreferrer")
    }


    // new feb19 --> delete data
    // const handleDelete = (event) => {
    //     console.log("delete called")
    //     fetch('http://localhost:4000/project/:id', {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type":"application/json"
    //         }
    //     })
    // }
   
    //end feb 10 --? delete data

    return(
        <div>
            <Header/>
            <h1 className="mainSubHeaderNewProject"> Editar Proyecto {cliente} - {idProyecto}</h1>
            {/* <h1 className="mainSubHeaderNewProject"> Editar Proyecto {props.food?.idProyecto}</h1> */}

            {/* MODIF APR/26 */}
            {/* <form className="container-newProject">  */}
            <form className="container-newProject" onSubmit={updateData}>

                {/* ESTATUS */}
                {/* <div className="multiFieldRowOne"> */}
                <div className="conditionHeader">
                    <label className="conditionTitle">Condición</label>
                    <select select type="text"required onChange={handleConditionChange} defaultValue={condicion} name="condicion">
                        <option>{condicion}</option>
                        <option>Activo</option>
                        <option>Terminado</option>
                        <option>Dormido</option>
                        <option>Cancelado</option>
                    </select>
                </div>
                
                <div className="multiFieldTop">
                    <label className="formSectionTitle">Estatus del Proyecto</label>
                    <label className="formSectionTitle">Estatus Contable</label>
                    {/* <input type="text"required onChange={handleStatusChange} defaultValue={estatusProyecto} name="estatusProyecto"></input> */}
                </div>

                <div className="multiFieldBottom">
                    {/* <input type="text"required onChange={handleStatusChange} defaultValue={estatusProyecto} name="estatusProyecto"></input> */}
                       <select type="text"required onChange={handleStatusChange} defaultValue={estatusProyecto} name="estatusProyecto">
                        <option>{estatusProyecto}</option>
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
                    <select type="text" onChange={handleEstatusContable} defaultValue={estatusContable} name="estatusContable">
                        <option>{estatusContable}</option>
                        <option>Entrada</option>
                        <option>Aceptado</option>
                        <option>Proceso de Facturación</option>
                        <option>Facturado - Pendiente de Pago</option>
                        <option>Facturado - Pagado</option>
                        <option>Complemento de Pago</option>
                    </select>
                    {/* <input type="text" onChange={handleEstatusContable} defaultValue={estatusContable} name="estatusContable"></input> */}
                </div>
                {/* ESTATUS */}

                {/* CLIENTE */}
                <label className="formSectionTitle">Datos del Cliente</label>
                
                <div className="multiFieldRowThree">
                    <label>Cliente</label> 
                    <label>Razón Social</label> 
                    <label>Correo Principal</label>
                </div>

                <div className="multiFieldRowThree">
                    <input type="text"required onChange={handleClientChange} defaultValue={cliente} name="cliente"></input>
                    <input type="text"required onChange={handleRazonSocial} defaultValue={razonSocial} name="razonSocial"></input>
                    <input type="text"required onChange={handleCorreoPrincipal} defaultValue={correoPrincipal} name="correoPrincipal"></input>
                </div>

                <div className="multiFieldRowTwo">
                    <label>Dirección</label>
                    <label>Número de Sucursal</label>
                </div>

                <div className="multiFieldRowTwo">
                    <input type="text"required onChange={handleDireccion} defaultValue={direccion} name="direccion"></input>
                    <input type="text"required onChange={handleSucursal} defaultValue={sucursal} name="sucursal"></input>
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
                    <input type="text"required onChange={handleCorreoFacturacion} defaultValue={correoFacturacion} name="correoFacturacion"></input>
                    <select type="text"required onChange={handleRegimenFiscal} defaultValue={regimenFiscal} name="regimenFiscal">
                        <option>{regimenFiscal}</option>
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
                    <select type="text"required onChange={handleTipoFactura} defaultValue={tipoFactura} name="tipoFactura">
                        <option>{tipoFactura}</option>
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
                    <select type="text"required onChange={handleMetodoPago} defaultValue={metodoPago} name="metodoPago">
                        <option>{metodoPago}</option>
                        <option>PUE</option>
                        <option>PPD</option>
                    </select>
                    <select type="text"required onChange={handleFormaPago} defaultValue={formaPago} name="formaPago">
                        <option>{formaPago}</option>
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
                    <select type="text"required onChange={handleUsoCFDI} defaultValue={usoCFDI} name="usoCFDI">
                        <option>{usoCFDI}</option>
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
                    <input type="text"required onChange={handleIdChange} defaultValue={idProyecto} name="idProyecto"></input>
                    {/* <input type="text"required onChange={handleInchargeChange} defaultValue={nombreEncargado} name="nombreEncargado"></input> */}
                    <select type="text"required onChange={handleInchargeChange} defaultValue={nombreEncargado} name="nombreEncargado">
                        <option>{nombreEncargado}</option>
                        <option>Gustavo Flores, Sr.</option>
                        <option>Gustavo Flores, Jr.</option>
                        <option>Pamela Flores</option>
                        <option>Cesar Flores</option>
                    </select>
                    <input type="text"required onChange={handleFolioChange} defaultValue={folioAceptado} name="folioAceptado"></input>
                </div>

                <div className="multiFieldRowTwo">
                    <label>Inicio de Proceso</label>
                    <label>Inicio Técnico</label>
                </div>

                <div className="multiFieldRowTwo">
                    <input type="date"required onChange={handleStartChange} defaultValue={inicioProceso} name="inicioProceso"></input>
                    <input type="date"required onChange={handleTechChange} defaultValue={inicioTecnico} name="inicioTecnico"></input>
                </div>
                {/* DATOS DEL PROYECTO */}

                {/* DOCUMENTACION */}
                <label className="formSectionTitle">Documentación Requerida</label>

                {/* NEW */}
                {/* <input type="text" required onChange={handlePdfChange} defaultValue={file} name="file"></input>
                <button onClick={viewPDF} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button> */}
                {/* END */}

                <div className="one">
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
                        {/* NEW */}
                        <div className="acceptedInvoice">
                            <input type="text" required onChange={handlePdfChange} defaultValue={file} name="file"></input>
                            <button onClick={viewPDF} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                        </div>
                        {/* END */}


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
                    <input type="text"required onChange={handleSubtotalChange} defaultValue={subtotal} name="subtotal"></input>
                    <input type="text"required onChange={handleTotalChange} defaultValue={total} name="total"></input>
                    {/* <input type="text"required onChange={handleIvaGenerado} defaultValue={parseFloat(taxesGenerated)} name="ivaGenerado"></input> */}
                    <input type="text"required onChange={handleIvaGenerado} defaultValue={currencyFormatter.format(taxesGenerated)} name="ivaGenerado"></input>

                </div>

                <div className="multiFieldRowThree">
                    <label>Anticipo del Proyecto</label>
                    <label>Monto Pagado</label>
                    <label>Monto Pendiente de Pago</label>
                </div>

                <div className="multiFieldRowThree">
                    <input type="text" onChange={handleDownPaymentChange} defaultValue={anticipo} name="anticipo"></input>
                    <input type="text" onChange={handlePagado} defaultValue={currencyFormatter.format(payedAmount)} name="pagado"></input>
                    <input type="text" onChange={handlePorPagar} defaultValue={currencyFormatter.format(remainingAmount)} name="porPagar"></input>
                </div>

                <div className="multiFieldRowTwo">
                    <label>Plazos de Pago</label>
                </div>

                <div className="multiFieldRowTwo">
                    <input type="number" onChange={handlePlazosChange} defaultValue={plazosDePago} name="plazosDePago"></input>
                </div>

                {/* START: NEW PAYMENT SLOT */}
                <div>
                    <button className="btnNewPayment" onClick={handleClick}>AGREGAR PAGO</button>
                    {
                        data.map((val, i) =>
                        <div>
                            <div className="multiFieldRowThree">
                                <label>Pago Adicional</label>
                                <label>Fecha de pago</label>
                                <label>Banco</label>
                            </div>

                            <div className="multiFieldRowThree">
                                <input type="text" onChange={handlePagoAdicional} defaultValue={pagoAdicional} name="pagoAdicional"></input>
                                <input type="date" onChange={handleFechaPago} defaultValue={fechaPago} name="fechaPago"></input>
                                <select type="text" onChange={handleBancoPago} defaultValue={bancoPago} name="bancoPago">
                                    <option>Escoger banco destino...</option>
                                    <option>Banamex - MEX</option>
                                    <option>Banamex - USD</option>
                                    <option>Banorte - MEX</option>
                                </select>
                            </div>
                        </div>
                        )
                    }
                    
                </div>
                {/* END: NEW PAYMENT SLOT */}

                {/* <div className="multiFieldRowThree">
                    <label>Pago Adicional X</label>
                    <label>Fecha de pago</label>
                    <label>Banco</label>
                </div>

                <div className="multiFieldRowThree">
                    <input type="text" onChange={handlePagoAdicional} defaultValue={pagoAdicional} name="pagoAdicional"></input>
                    <input type="text" onChange={handleFechaPago} defaultValue={fechaPago} name="fechaPago"></input>
                    <input type="text" onChange={handleBancoPago} defaultValue={bancoPago} name="bancoPago"></input>
                </div> */}
                {/* DESGLOSE FINANCIERO */}

                {/* ADICIONALES */}
                <label className="formSectionTitle">Adicionales</label>

                <label>Comentarios</label>

                <textarea type="text"required onChange={handleCommentChange} defaultValue={comentarios} name="comentarios"></textarea>
                {/* ADICIONALES */}









                {/* OFF SECTION STARTS HERE! */}

                {/* <div className="multiFieldRowTwo">
                    <label>Folio Aceptado</label>
                    <label>Documentos de Apoyo</label>
                </div>
                <div className="multiFieldRowTwo">
                    <div className="acceptedInvoice"> */}
                    {/* <input type="text"required defaultValue={ffolioaceptado} onChange={(e) => setFfolioaceptado(e.target.value)} name="folioAceptado"></input> */}

                    {/* <input type="text"required onChange={handlePdfChange} defaultValue={folioPDF} name="folioPdf"></input> */}
                    {/* </div>
                    <div className="acceptedInvoice"> 
                        <input type="text"required onChange={handlePdfChange} defaultValue={file} name="file"></input>
                        <button onClick={viewPDF} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        <button className="addMoreFilesButtonUpdate" onClick={()=>handleAddExtraFile()}>+</button>
                    </div>
                </div>

                <div>
                        {extraFile.map((data,i)=> {
                            return(
                                <div >
                                    <label>Archivo Adicional {i+2}</label>
                                    <div className="multiFieldRowTwoMagnifying">
                                        <input type="file" name="myFiles" accept=".pdf" multiple onChange={(e) => setFile(e.target.files)} /> 
                                        <button onClick={viewPDF} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                    </div>
                                </div>
                            )
                        })}
                        </div>



                <label className="formSectionTitle">Pagos Subsecuentes</label>

                <div>
                    <label>Pago Adicional 1</label> */}
                    {/* <input type="text" defaultValue={payment} name="payment"></input> */}
                    {/* <input type="text" onChange={handleExtraPayment} defaultValue={extraPayment} name="extraPayment"></input>

                </div> */}

                 {/* NEW JUN06 */}
                {/* <button className="btnSubmitProject" type="button" onClick={()=>handleAddPaymemt()}>Agregar Pago</button> */}
                    {/* {payment.map((data,i)=> {
                        return(
                            <div >
                                <label>Pago Adicional {i+2}</label> */}
                                    {/* <input type="text" onChange={handleInput} placeholder="Monto abonado..." name="payment" value={payment} /> */}
                                    {/* <input type="text" onChange={handleExtraPayment} placeholder="Monto abonado..." name="extraPayment" value={extraPayment} /> */}

                                {/* <input onChange={e=> handleChange(e,i)} /> */}
                            {/* </div>
                        )
                    })} */}
                {/* <button className="btnNewPayment" type="button" onClick={()=>handleAddPaymemt()}>Agregar Pago</button> */}

                {/* OFF SECTION ENDS HERE! */}
                {/* END JUN06 */}

                {/* <div>
                    <label>Pago Adicional</label>
                    <input type="text" defaultValue={payment} name="payment"></input>
                </div> */}
                {/* <input type="text" defaultValue={payment}></input> */}

                {/* <div>
                    {payment.map((data,i) => {
                        return(
                            <div> 
                                <label>Pago Adicional {i+1}</label>
                                <input type="text" defaultValue={payment}></input>
                            </div>
                        )
                    })}
                </div> */}

        
                {/* <textarea type="text" defaultValue={fcomentarios} onChange={(e) => setFcomentarios(e.target.value)} name="comentarios"></textarea> */}

                {/* <label>Cliente</label> */}
                {/* <input type="text"required placeholder= {props.food?.cliente} name="cliente"></input> */}
                {/* <input type="text"required defaultValue={cliente} onChange={(e) => setCliente(e.target.value)}></input> */}
                {/* GOOD */}
                {/* <input type="text"required onChange={handleClientChange} defaultValue={cliente} name="cliente"></input> */}

                {/* <label>Nombre o ID de Proyecto</label> */}
                {/* <input type="text"required defaultValue={fidproyect} onChange={(e) => setFidproyect(e.target.value)} name="idProyecto"></input> */}
                {/* GOOD */}
                {/* <input type="text"required onChange={handleIdChange} defaultValue={idProyecto} name="idProyecto"></input> */}

                {/* <label>Inicio de Proceso</label> */}
                {/* <input type="text"required defaultValue={finicioproceso} onChange={(e) => setFinicioproceso(e.target.value)} name="inicioProceso"></input> */}
                {/* <input type="text"required onChange={handleStartChange} defaultValue={inicioProceso} name="inicioProceso"></input> */}

                {/* <label>Inicio Técnico</label> */}
                {/* <input type="text" defaultValue={finiciotecnico} onChange={(e) => setFiniciotecnico(e.target.value)} name="inicioTecnico"></input> */}
                {/* <input type="text"required onChange={handleTechChange} defaultValue={inicioTecnico} name="inicioTecnico"></input> */}

                {/* <label>Encargado del Proyecto</label> */}
                {/* <input type="text"required defaultValue={fnombreencargado} onChange={(e) => setFnombreencargado(e.target.value)} name="nombreEncargado"></input> */}
                {/* GOOD */}
                {/* <input type="text"required onChange={handleInchargeChange} defaultValue={nombreEncargado} name="nombreEncargado"></input> */}
            
                {/* <label>Folio Aceptado</label> */}
                {/* <div className="acceptedInvoice">
                    <input type="text"required onChange={handleFolioChange} defaultValue={folioAceptado} name="folioAceptado"></input>
                </div> */}

                {/* NEW FEB27 */}
                {/* <label>Documento de Apoyo</label>
                <div className="acceptedInvoice"> 
                    <input type="text"required onChange={handlePdfChange} defaultValue={file} name="file"></input>
                    <button onClick={viewPDF} className="btnMagGlass fa-sm"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div> */}
                {/* END FEB27 */}

                {/* <label>Estatus del Proyecto</label> */}
                {/* <input type="text"required defaultValue={festatusproyecto} onChange={(e) => setFestatusproyecto(e.target.value)} name="estatusProyecto"></input> */}
                {/* <input type="text"required onChange={handleStatusChange} defaultValue={estatusProyecto} name="estatusProyecto"></input> */}

                {/* new may02 */}
                {/* <label>Subtotal del Proyecto</label> */}
                {/* <input type="text"required onChange={handleSubtotalChange} defaultValue={subtotal} name="subtotal"></input> */}

                {/* <label>Total del Proyecto</label> */}
                {/* <input type="text"required onChange={handleTotalChange} defaultValue={total} name="total"></input> */}
                {/* end may02 */}

                {/* new jun04 */}
                {/* <label>Anticipo del Proyecto</label> */}
                {/* <input type="text" onChange={handleDownPaymentChange} defaultValue={anticipo} name="anticipo"></input> */}

                {/* <label>Plazos de Pago</label> */}
                {/* <input type="number" onChange={handlePlazosChange} defaultValue={plazosDePago} name="plazosDePago"></input> */}
                {/* end jun 04 */}

                {/* new jun04.2 */}
                {/* <label>Monto Pagado</label> */}
                {/* <input type="text" onChange={handleInput} placeholder={`${projectDetails.total} - ${projectDetails.anticipo}`} value={projectDetails.pagado}></input> */}
                {/* <input type="text" onChange={handleInput} placeholder={`${projectDetails.total} - ${projectDetails.anticipo}`} value={projectDetails.pagado}></input> */}
                {/* <input type="text" onChange={handlePagado} defaultValue={payedAmount} name="pagado"></input> */}

                {/* <input type="text" onChange={handlePagado} defaultValue={pagado} name="pagado"></input> */}

                {/* <label>Monto Pendiente de Pago</label> */}
                {/* <input type="text" onChange={handlePorPagar} defaultValue={remainingAmount} name="porPagar"></input> */}

                {/* <input type="text" onChange={handlePorPagar} defaultValue={porPagar} name="porPagar"></input> */}


                {/* end jun04.2 */}

                {/* <label>Comentarios</label> */}
                {/* <textarea type="text" defaultValue={fcomentarios} onChange={(e) => setFcomentarios(e.target.value)} name="comentarios"></textarea> */}
                {/* <textarea type="text"required onChange={handleCommentChange} defaultValue={comentarios} name="comentarios"></textarea> */}


                {/* <button onClick={updateData} className="btnNewProject" type="submit">Guardar</button> */}
                <div>
                    <button type="submit" onClick={updateData} className="btnSubmitProject">Guardar</button> 
                </div>
                

                {/* <p className={message.type}>{message.text}</p> */}

            </form>
            <Footer/>
        </div>
    )
}
