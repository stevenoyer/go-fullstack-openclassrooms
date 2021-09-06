// Notre model d'objet Thing
const Thing = require('../models/Thing')

exports.createThing = (req, res, next) => {
    delete req.body._id

    const thing = new Thing({
        // Raccourci de : title: req.body.title
        ...req.body
    })

    thing.save()
        .then(() => res.status(201).json({message: 'L\'object a bien été posté.'}))
        .catch(error => res.status(400).json({error}))
}

exports.modifyThing = (req, res, next) => {
    // On récupère le paramètre et nous mettons à jour les nouvelles données de notre objet en précisant que l'id de la base de données est celui de l'objet 
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'L\'object a bien été modifié.'}))
        .catch(error => res.status(400).json({error}))
}

exports.deleteThing = (req, res, next) => {
    // On récupère le paramètre et nous supprimons l'objet par rrouterort à son id
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({message: 'L\'object a bien été supprimé.'}))
        .catch(error => res.status(400).json({error}))
}

exports.getOneThing = (req, res, next) => {
    // On récupère le paramètre et nous le cherchons dans la base de données
    Thing.findOne({ _id: req.params.id })
        .then(object => res.status(200).json(object))
        .catch(error => res.status(404).json({error}))
}

exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(objects => res.status(200).json(objects))
        .catch(error => res.status(400).json({error}))
}