const mongoose = require('mongoose')

// On créé un schema stricte pour nos objets afin de les stocker dans la base de données
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
})

module.exports = mongoose.model('Thing', thingSchema)