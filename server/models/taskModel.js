const { application } = require('express')
const mongoose = require('mongoose')

//TASK SCHEMA SETUP
const taskSchema = mongoose.Schema({
    prioridadTarea: {
        type: String,
    },
    nombreTarea: {
        type: String,
    },
    descripcionTarea: {
        type: String,
    },
    encargadoTarea: {
        type: String,
    },
    fechaAsignacion: {
        type: String,
    },
    clienteTarea: {
        type: String,
    },
    estatusTarea: {
        type: String,
    },

}, {timestamps: true})

const taskModel = mongoose.model("task_forms", taskSchema)

module.exports = taskModel
