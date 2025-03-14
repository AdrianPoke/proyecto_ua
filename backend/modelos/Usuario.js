const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    edad: Number,
    rol: String
});

module.exports = mongoose.model('Usuario', UserSchema);
