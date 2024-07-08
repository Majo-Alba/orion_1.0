const { application } = require('express')
const mongoose = require('mongoose')

//PROJECT SCHEMA SETUP
const projectSchema = mongoose.Schema({
    // _id: {
        // type: String,
        // type: mongoose.Schema.Types.ObjectId,
    // },

    cliente: {
        type: String,
        required:[true, "Campo obligatorio"],
        minLength: [4, "Cliente debe contener un mínimo de 4 caracteres"],
        maxLength: [100, "Cliente no debe exceder los 100 caracteres"]
    },
    numeroCliente: {
        type: String,
    },
    razonSocial: {
        type: String,
    },
    correoPrincipal: {
        type: String
    },
    direccion: {
        type: String
    },
    sucursal: {
        type: String
    },
    correoFacturacion: {
        type: String
    },
    regimenFiscal: {
        type: String
    },
    tipoFactura: {
        type: String
    },
    metodoPago: {
        type: String
    },
    formaPago: {
        type: String
    },
    usoCFDI: {
        type: String
    },
    idProyecto: {
        type: String,
        required:[true, "Campo obligatorio"],
        minLength: [4, "Nombre debe contener un mínimo de 4 caracteres"],
        maxLength: [100, "Nombre no debe exceder los 100 caracteres"]
    },
    inicioProceso: {
        type: String,
        //required:[true, "Campo obligatorio"]    
    },
    inicioTecnico: String,
    nombreEncargado: {
        type: String,
        //required:[true, "Campo obligatorio"],
        //minLength: [4, "Encargado debe contener un mínimo de 4 caracteres"],
        //maxLength: [50, "Encargado no debe exceder los 50 caracteres"]    
    },
    folioAceptado: {
        type: String,
        required:[true, "Campo obligatorio"],
        minLength: [4, "Folio debe contener un mínimo de 4 caracteres"],
        maxLength: [50, "Folio no debe exceder los 50 caracteres"]
    },
    file: {
        type: String,
        // type: Array
    },
    estatusProyecto: {
        type: String,
        //required:[true, "Campo obligatorio"],
        //minLength: [4, "Estatus debe contener un mínimo de 4 caracteres"],
        //maxLength: [100, "Estatus no debe exceder los 100 caracteres"],
    },
    subtotal: {
        type: String,
    },
    total: {
        type: String,
    },
    ivaGenerado: {
        type: String
    },
    // NEW JUN04
    anticipo: {
        type: String,
    },
    plazosDePago: {
        type: Number,
    },
    estatusContable: {
        type: String
    },
    // END JUN04
    // NEW JUN04.2
    pagado: {
        type: String,
    },
    porPagar: {
        type: String,
    },
    pagoAdicional: {
        type: String,
    },
    fechaPago: {
        type: String
    },
    bancoPago: {
        type: String
    },
    // END JUN04.2
    comentarios: {
        type: String,
        maxLength: [350, "Estatus no debe exceder los 350 caracteres"]
    },
    condicion: {
        type: String
    },
    payment: {
        type: String,
    },
    extraPayment: {
        type: String,
    }, 
  
}, {timestamps: true})

const projectModel = mongoose.model("project_forms", projectSchema)

module.exports = projectModel