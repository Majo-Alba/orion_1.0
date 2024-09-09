const express = require('express')
const cors = require('cors')

const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel")
const projectModel = require("../models/projectModel")
const verifyToken = require("../verifyToken")

// NEW AUG21
const quoterModel = require("../models/quoterModel")
// END AUG21

const multer = require("multer")
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    // destination: function (req, res, cb) {
        cb(null, './files')
    },
    filename: (req, file, cb) => {
        // cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
        cb(null, file.originalname)


    // filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now()
        // cb(null, uniqueSuffix+file.originalname)
    }
})
const upload = multer({ storage: storage })

// router.post("/upload-files", upload.single("folioPDF"), async (req,res) => {
//     console.log(req.file)
// })
//END APR04

//USER RELATED API's

//API || ENDPOINT FOR REGISTERING USER & PASSWORD HASHING
router.post('/register', (req,res) => {
    let user = req.body

    bcrypt.genSalt(10,(err,salt) => {
        if(!err)
        {
            bcrypt.hash(user.contraseña, salt, (err,hpass) => {
                if(!err)
                {
                    user.contraseña = hpass

                    userModel.create(user)
                    .then((doc) => {
                        res.status(201).send({message:"¡Usuario registrado exitosamente!"})
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).send({message:"Encountered a problem while registering user"})
                    })
                }
            })
        }
    })
})

//API || ENDPOINT FOR LOGIN
router.post('/login', (req, res) => {
    let userCred = req.body

    userModel.findOne({email:userCred.email})
    .then((user) => {
        if(user !==null) {
            bcrypt.compare(userCred.contraseña, user.contraseña, (err, result) => {
                if(result===true) {
                    //TOKEN GENERATION
                    jwt.sign({email:userCred.email}, "kangarookey", (err, token) => {
                        if(!err) {
                            res.send({token:token})
                        }
                        else {
                            res.status(500).send({message: " Some problem while creating token. Please try again"})
                        }
                    })
                }
                else {
                    res.status(403).send({message: "Contraseña incorrecta!"})
                }
            })
        }
        else {
            res.status(404).send({message: "El usuario no se encontró"})
        }
    })
    .catch((err) => {
        console.log(err)
        res.send({message: "Encountered some problem!"})
    })
})

//TOKEN VERIFIED ENDPOINT EXAMPLE --> MAKE SURE TO DELETE!!
router.get('/getdata', verifyToken, (req,res) => {
    res.send({message:"Bad dev with good heart"})
})

//PROJECT-RELATED API's

//API || ENDPOINT FOR POSTING A NEW PROJECT
//NOTE TO SELF: /project COMES FROM WHAT YOU STATED IN NEWPROJECT.JS AXIOS ROUTE, IN THIS CASE LOCALHOST:4000/PROJECT
// router.post('/project', (req,res) => {


// NEW JUL18
router.post('/project', upload.single('file'), (req,res) => {
    //END MAY14
    
    // SINGLE FILE START
    let file = req.file.filename
    console.log(file)
    
    let project = [req.body, req.file]
    console.log(project)
    
    console.log({...req.body, file: req.file.filename})
    projectModel.create({...req.body, file: req.file.filename})
    .then((data) => {
        res.send({data:data,message:"Proyecto creado exitosamente"})
        console.log(data);
        console.log("Project created!");
    })
    .catch((err) => {
        console.log(err);
    })
})

router.post('/project', upload.single('file'), (req,res) => {
    
    // SINGLE FILE START
    let file = req.file.filename
    console.log(file)
    
    let project = [req.body, req.file]
    console.log(project)
    
    console.log({...req.body, file: req.file.filename})
    projectModel.create({...req.body, file: req.file.filename})
    .then((data) => {
        res.send({data:data,message:"Proyecto creado exitosamente"})
        console.log(data);
        console.log("Project created!");
    })
    .catch((err) => {
        console.log(err);
    })
})
// END JUL18

//ASLEEP JUL18 - NEW MAY14
// // router.post('/project', upload.any('myFiles'), (req,res) => {
// // router.post('/project', upload.array('file', 10), (req,res) => {
// router.post('/project', upload.single('file'), (req,res) => {
// //END MAY14

//     // SINGLE FILE START
//     let file = req.file.filename
//     console.log(file)

//     let project = [req.body, req.file]
//     console.log(project)

//     console.log({...req.body, file: req.file.filename})
//     projectModel.create({...req.body, file: req.file.filename})
//     // SINGLE FILE END

//     // MULTIFILE START
//     // let files = req.files
//     // console.log(files)

//     // let project = [req.body, req.files]
//     // // console.log(project)

//     // console.log(project, files)
//     // // console.log({...req.body, ...req.files})
//     // projectModel.create({...req.body, ...req.files})

//     // console.log({...req.body, file: req.files.filename})
//     // projectModel.create({...req.body, file: req.files.filename})
//     // MULTIFILE END

//     // .then(result => res.json(result))
//     .then((data) => {
//         res.send({data:data,message:"Proyecto creado exitosamente"})
//         console.log(data);
//         console.log("Project created!");
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// ASLEEP JUL18 

//API || ENDPOINT FOR POSTING A NEW QUOTE
// NEW AUG21
router.post('/quoter', (req,res) => {

    // SINGLE FILE START
    // let file = req.file.filename
    // console.log(file)

    let quoter = req.body
    // let project = [req.body, req.file]
    console.log(quoter)
    
    // console.log({...req.body, file: req.file.filename})
    console.log({...req.body})
    quoterModel.create({...req.body})
    .then((data) => {
        res.send({data:data,message:"Proyecto creado exitosamente"})
        console.log(data);
        console.log("Quote created!");
    })
    .catch((err) => {
        console.log(err);
    })
})
// END AUG21

router.get('/getPDF', (req, res) => {
    projectModel.findOne()
    .then(file => res.json(file))
    .catch(err => res.json(err))
})

//API || ENDPOINT FOR FETCHING FULL COLLECTION DATA
router.get('/project', (req,res) => {
    projectModel.find()
    .then((projects) => {
        res.send(projects)
        console.log(projects);
    })
    .catch((err) => {
        console.log(err);
        res.send({message:"Couldn't fetch projects"})
    })
})

//API || ENDPOINT FOR FETCHING ONLY ONE ITEM FROM COLLECTION, GIVEN ITS ID
router.get('/project/:id', (req,res) => {
    projectModel.findOne({_id:req.params.id})
    .then((project) => {
        res.send(project)
        console.log(project);
    })
    .catch((err) => {
        console.log(err);
        res.send({message:"Couldn't fetch project"})
    })
})

//API || ENDPOINT FOR DELETING DATA
router.delete('/project/:id', (req,res) => {
    projectModel.deleteOne({_id:req.params.id})
    .then((info) => {
        res.send({message: "Product deleted!"})
        console.log(info)
        console.log("Project deleted succesfully")
    })
    .catch((err) => {
        res.send({message:"Encountered some problem"})
        console.log(err);
    })
})

//API || ENDPOINT FOR UPDATING DATA, GIVEN ITS ID --> FEB 20 GOOD
router.put('/project/:id', (req,res) => {
    let project = req.body
    console.log("Print project" + JSON.stringify(project))

    projectModel.updateOne({_id:req.params.id},project)
    .then((info) => {
        res.send({message:"Product updated!"})
        console.log(project)
        console.log(info)
        console.log("Project updated succesfully!!")
    })
    .catch((err) => {
        res.send({message:"Encountered some problem"})
        console.log(err);
    })
})

//API || ENDPOINT FOR UPDATING PROJECT
router.post("/updateProject", async (req, res) => {
    // MODIF Jun/04
    const {id, empresa, cliente, numeroCliente, razonSocial, correoPrincipal, numeroTelefono, direccion, sucursal, ubicacion, giro,
        correoFacturacion, regimenFiscal, tipoFactura, metodoPago, formaPago, usoCFDI, 
        idProyecto, nombreEncargado, folioAceptado, inicioProceso, inicioTecnico, estatusProyecto, folioPDF, 
        subtotal, total, ivaGenerado, anticipo, pagado, porPagar, plazosDePago, estatusContable, 
        pagoAdicional, fechaPago, bancoPago, comentarios, condicion,
        payment, extraPayment} = req.body
        console.log(req.body)
    try {
        await projectModel.updateOne({_id: id}, {
            $set: {
                empresa: empresa,
                cliente: cliente,
                numeroCliente: numeroCliente,
                razonSocial: razonSocial,
                correoPrincipal: correoPrincipal,
                numeroTelefono: numeroTelefono,
                direccion: direccion,
                sucursal: sucursal,
                ubicacion: ubicacion,
                giro: giro,

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
                folioPDF: folioPDF,

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

                payment: payment,
                extraPayment: extraPayment,
            }
        })
        return res.json({status: "ok", data: "updated"})
        console.log("Project updated succesfully!!")


    } catch (error) {
    return res.json({status: "error", data: "error"})
    }
})

// API || ENPOINT FOR DELETING --> FEB27
router.post("/deleteProject", async (req,res) => {
    const {userid} = req.body
    projectModel.deleteOne({_id: userid})
    .then((info) => {
        res.send({message: "Proyecto eliminado"})
        console.log(info)
        console.log("Project deleted succesfully!")
    })
    .catch((err) => {
        res.send({message: "Encountered some problem"})
        console.log(err)
    })
})


// router.delete('/project/:id', (req,res) => {
//     projectModel.deleteOne({_id:req.params.id})
//     .then((info) => {
//         res.send({message: "Product deleted!"})
//         console.log(info)
//         console.log("Project deleted succesfully")
//     })
//     .catch((err) => {
//         res.send({message:"Encountered some problem"})
//         console.log(err);
//     })
// })

module.exports = router