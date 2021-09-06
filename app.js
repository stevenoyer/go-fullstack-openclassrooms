const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Notre model d'objet Thing
const Thing = require('./models/Thing')

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


// Middleware qui post et stock nos nouveaux objets depuis le formulaire dans la base de données
app.post('/api/stuff', (req, res, next) => {

    delete req.body._id

    const thing = new Thing({
        // Raccourci de : title: req.body.title
        ...req.body
    })

    thing.save()
        .then(() => res.status(201).json({message: 'L\'object a bien été posté.'}))
        .catch(error => res.status(400).json({error}))
})

// Middleware qui modifie notre objet et met à jour dans notre base de données
app.put('/api/stuff/:id', (req, res, next) => {
    // On récupère le paramètre et nous mettons à jour les nouvelles données de notre objet en précisant que l'id de la base de données est celui de l'objet 
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'L\'object a bien été modifié.'}))
        .catch(error => res.status(400).json({error}))
})

// Middleware qui récupère un objet spécifique pour l'afficher
app.get('/api/stuff/:id', (req, res, next) => {
    // On récupère le paramètre et nous le cherchons dans la base de données
    Thing.findOne({ _id: req.params.id })
        .then(object => res.status(200).json(object))
        .catch(error => res.status(404).json({error}))
})

// Middleware qui récupère tous les objets de notre base de données pour les afficher
app.use('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(objects => res.status(200).json(objects))
        .catch(error => res.status(400).json({error}))
})

module.exports = app