const { application } = require('express')
const mongoose = require('mongoose')

// QUOTER SCHEMA SETUP
const quoterSchema = mongoose.Schema({
    empresa: {
        type: String,
    },
    contacto: {
        type: String,
    },
    calle: {
        type: String,
    },
    ciudadYEdo: {
        type: String,
    },
    cp: {
        type: String,
    },
    telPrincipal: {
        type: String,
    },
    correoPrincipal: {
        type: String,
    },
    rfcEmpresa: {
        type: String,
    },
    regimenEmpresa: {
        type: String,
    },
    correoFacturacion: {
        type: String,
    },
    tipoFactura: {
        type: String,
    },
    metodoPago: {
        type: String,
    },
    formaPago: {
        type: String,
    },
    plazosPago: {
        type: String,
    },
    descripcionProyecto: {
        type: String,
        maxLength: [1500]
    },
    terminosYCondiciones: {
        type: String,
    },
    calleServicio: {
        type: String,
    },
    numExteriorServicio: {
        type: String,
    },
    numInteriorServicio: {
        type: String,
    },
    colServicio: {
        type: String,
    },
    cpServicio: {
        type: String,
    },
    ciudadServicio: {
        type: String,
    },
    estadoServicio: {
        type: String,
    },
    fechaElaboracion: {
        type: String,
    },
    fechaValidez: {
        type: String,
    },
    idCotizacion: {
        type: String,
    },
    elaboradaPor: {
        type: String,
    },
    materials: {
        type: String,
    },
    labour: {
        type: String,
    },
    misc: {
        type: String,
    },
    descuento: {
        type: String,
    },
}, {timestamps: true})

const quoterModel = mongoose.model("quoter_form", quoterSchema)

module.exports = quoterModel