const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')
const path = require('path')

// Connexion à notre base de données
mongoose.connect('mongodb+srv://steven:131201So**@cluster0.ibqd8.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connexion à la base de données réussie.'))
.catch(() => console.warn('Erreur lors de la connexion à la base de données.'))

// Middleware Header (autorise les échanges)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

// Rend les données du corps de la requête exploitable
app.use(bodyParser.json())

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app