const express = require('express')
const router = express.Router()
const stuffCtrl = require('../controllers/stuff')

router.post('/', stuffCtrl.createThing) // Poster un objet
router.delete('/:id', stuffCtrl.deleteThing) // Supprimer un objet
router.put('/:id', stuffCtrl.modifyThing) // Modifier un objet
router.get('/:id', stuffCtrl.getOneThing) // Récupérer un objet
router.get('/', stuffCtrl.getAllThings) // Récupérer tous les objets

module.exports = router