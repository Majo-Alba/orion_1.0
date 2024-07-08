// // NEW FEB17
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Header from "./Header"
// import Footer from "./Footer"
// // END FEB17

// export default function ProjectEdit() {

//     // console.log(props.food?.cliente)
//     // NEW FEB17
//     const location = useLocation()

//     // NEW FEB17 20:30
//     const [fclient, setFclient] = useState("")
//     const [fidproyect, setFidproyect] = useState("")
//     const [finicioproceso, setFinicioproceso] = useState("")
//     const [finiciotecnico, setFiniciotecnico] = useState ("")
//     const [fnombreencargado, setFnombreencargado] = useState("")
//     const [ffolioaceptado, setFfolioaceptado] = useState("")
//     const [ffoliopdf, setFfoliopdf] = useState("")
//     const [festatusproyecto, setFestatusproyecto] = useState("")
//     const [fcomentarios, setFcomentarios] = useState("")

//     // END FEB17 20:30

//     useEffect(() => {
//         console.log(location)
//         setFclient(location.state?.cliente)
//         setFidproyect(location.state?.idProyecto)
//         setFinicioproceso(location.state?.inicioProceso)
//         setFiniciotecnico(location.state?.inicioTecnico)
//         setFnombreencargado(location.state?.nombreEncargado)
//         setFfolioaceptado(location.state?.folioAceptado)
//         setFfoliopdf(location.state?.folioPDF)
//         setFestatusproyecto(location.state?.estatusProyecto)
//         setFcomentarios(location.state?.comentarios)
//     }, [])

//     // NEW FEB18 18:06
//     const handleClientChange = (event) => { 
//         console.log(location.state?.cliente)
//         setFclient(event.target?.value)
//         console.log(fclient)
//     }

//     const handleIdChange = (event) => { 
//         console.log(location.state?.idProyecto)
//         setFidproyect(event.target?.value)
//         console.log(fidproyect)
//     }

//     const handleStartChange = (event) => { 
//         console.log(location.state?.inicioProceso)
//         setFinicioproceso(event.target?.value)
//         console.log(finicioproceso)
//     }

//     const handleTechChange = (event) => { 
//         console.log(location.state?.inicioTecnico)
//         setFiniciotecnico(event.target?.value)
//         console.log(finiciotecnico)
//     }

//     const handleInchargeChange = (event) => { 
//         console.log(location.state?.nombreEncargado)
//         setFnombreencargado(event.target?.value)
//         console.log(fnombreencargado)
//     }

//     const handleFolioChange = (event) => { 
//         console.log(location.state?.folioAceptado)
//         setFfolioaceptado(event.target?.value)
//         console.log(ffolioaceptado)
//     }

//     const handlePdfChange = (event) => { 
//         console.log(location.state?.folioPDF)
//         setFfoliopdf(event.target?.value)
//         console.log(ffoliopdf)
//     }

//     const handleStatusChange = (event) => { 
//         console.log(location.state?.estatusProyecto)
//         setFestatusproyecto(event.target?.value)
//         console.log(festatusproyecto)
//     }

//     const handleCommentChange = (event) => { 
//         console.log(location.state?.comentarios)
//         setFcomentarios(event.target?.value)
//         console.log(fcomentarios)
//     }
//     // END FEB18 18:06

//     const updateData = (event) => {
//         event.preventDefault()
//         console.log(fclient, fidproyect, finicioproceso, finiciotecnico, fnombreencargado, ffolioaceptado, ffoliopdf, festatusproyecto, fcomentarios)

//         fetch('http://localhost:4000/project/:id', {
//             method: "PUT",
//             crossDomain: true,
//             body: JSON.stringify({
//                 // id: location.state._id,
//                 fclient,

//                 // // fclient: location.state.cliente
//                 // // // cliente: location.state.cliente,
//                 // cliente: fclient,
//                 // // // idProyecto: location.state.idProyecto,
//                 // idProyecto: fidproyect,
//                 // // // inicioProceso: location.state.inicioProceso,
//                 // inicioProceso: finicioproceso,
//                 // // // inicioTecnico: location.state.inicioTecnico,
//                 // inicioTecnico: finiciotecnico,
//                 // // // nombreEncargado: location.state.nombreEncargado,
//                 // nombreEncargado: fnombreencargado,
//                 // // // folioAceptado: location.state.folioAceptado,
//                 // folioAceptado: ffolioaceptado,
//                 // // // folioPDF: location.state.folioPDF,
//                 // folioPDF: ffoliopdf,
//                 // // // estatusProyecto: location.state.estatusProyecto,
//                 // estatusProyecto: festatusproyecto,
//                 // // // comentarios: location.state.comentarios
//                 // comentarios: fcomentarios
//             }),
//             headers: {
//                 "Content-Type":"application/json"
//             }
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data)
//             // window.location.href="/main"
//             // setMessage({type:"success", text:data.message})
//         })
//     }
//     // END FEB17

//     // new feb19 --> delete data
//     //end feb 10 --? delete data

//     return(
//         <div>
//             <Header/>
//             <h1 className="mainSubHeaderNewProject"> Editar Proyecto {fidproyect}</h1>
//             {/* <h1 className="mainSubHeaderNewProject"> Editar Proyecto {props.food?.idProyecto}</h1> */}

//             <form className="newProjectForm">
//                 <label>Cliente</label>
//                 {/* <input type="text"required placeholder= {props.food?.cliente} name="cliente"></input> */}
//                 {/* <input type="text"required defaultValue={fclient} onChange={(e) => setFclient(e.target.value)} name="cliente"></input> */}
//                 <input type="text"required onChange={handleClientChange} defaultValue={fclient} name="cliente"></input>

//                 <label>Nombre o ID de Proyecto</label>
//                 {/* <input type="text"required defaultValue={fidproyect} onChange={(e) => setFidproyect(e.target.value)} name="idProyecto"></input> */}
//                 <input type="text"required onChange={handleIdChange} defaultValue={fidproyect} name="idProyecto"></input>

//                 <label>Inicio de Proceso</label>
//                 {/* <input type="text"required defaultValue={finicioproceso} onChange={(e) => setFinicioproceso(e.target.value)} name="inicioProceso"></input> */}
//                 <input type="text"required onChange={handleStartChange} defaultValue={finicioproceso} name="inicioProceso"></input>

//                 <label>Inicio Técnico</label>
//                 {/* <input type="text" defaultValue={finiciotecnico} onChange={(e) => setFiniciotecnico(e.target.value)} name="inicioTecnico"></input> */}
//                 <input type="text"required onChange={handleTechChange} defaultValue={finiciotecnico} name="inicioTecnico"></input>

//                 <label>Encargado del Proyecto</label>
//                 {/* <input type="text"required defaultValue={fnombreencargado} onChange={(e) => setFnombreencargado(e.target.value)} name="nombreEncargado"></input> */}
//                 <input type="text"required onChange={handleInchargeChange} defaultValue={fnombreencargado} name="nombreEncargado"></input>
            
//                 <label>Folio Aceptado</label>
//                 <div className="acceptedInvoice">
//                     {/* <input type="text"required defaultValue={ffolioaceptado} onChange={(e) => setFfolioaceptado(e.target.value)} name="folioAceptado"></input> */}
//                     <input type="text"required onChange={handleFolioChange} defaultValue={ffolioaceptado} name="folioAceptado"></input>

//                     {/* <input type="file" accept="application/pdf" placeholder={props.food?.folioPDF} name="folioPDF"></input> */}
//                     {/* <input type="text" defaultValue={ffoliopdf} onChange={(e) => setFfoliopdf(e.target.value)} name="folioPDF"></input> */}
//                     <input type="text"required onChange={handlePdfChange} defaultValue={ffoliopdf} name="folioPdf"></input>
//                 </div>

//                 <label>Estatus del Proyecto</label>
//                 {/* <input type="text"required defaultValue={festatusproyecto} onChange={(e) => setFestatusproyecto(e.target.value)} name="estatusProyecto"></input> */}
//                 <input type="text"required onChange={handleStatusChange} defaultValue={festatusproyecto} name="estatusProyecto"></input>

//                 <label>Comentarios</label>
//                 {/* <textarea type="text" defaultValue={fcomentarios} onChange={(e) => setFcomentarios(e.target.value)} name="comentarios"></textarea> */}
//                 <textarea type="text"required onChange={handleCommentChange} defaultValue={fcomentarios} name="comentarios"></textarea>


//                 {/* <button onClick={updateData} className="btnNewProject" type="submit">Guardar</button> */}
//                 <button onClick={updateData} className="btnNewProject">Guardar</button>

//                 {/* <button onClick={deleteData} className="btnNewProject">Guardar</button> */}

//                 {/* <p className={message.type}>{message.text}</p> */}

//             </form>
//             <Footer/>
//         </div>
//     )
// }