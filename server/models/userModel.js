const mongoose = require('mongoose')

//USER SCHEMA SETUP
const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required:[true, "Campo obligatorio"],
        minLength: [4, "Nombre debe contener un mínimo de 4 caracteres"],
        maxLength: [50, "Nombre no debe exceder los 50 caracteres"]
    },
    apellido: {
        type: String,
        required:[true, "Campo obligatorio"],
        minLength: [4, "Apellido debe contener un mínimo de 4 caracteres"],
        maxLength: [50, "Apellido no debe exceder los 50 caracteres"]    
    },
    email: {
        type: String,
        required: true
    },
    contraseña: {
        type: String, 
        required: true
    },
}, {timestamps: true})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel