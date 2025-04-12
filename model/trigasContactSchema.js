const mongoose = require("mongoose");

const TrigasContactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

})

const Trigasadmin = mongoose.model("trigasAdminContact", TrigasContactSchema)

module.exports = Trigasadmin