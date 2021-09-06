const express = require('express')
const router = express.Router()
const stuffCtrl = require('../controllers/stuff')
const auth = require('../middleware/auth')

router.post('/', auth, stuffCtrl.createThing) // Poster un objet
router.delete('/:id', auth, stuffCtrl.deleteThing) // Supprimer un objet
router.put('/:id', auth, stuffCtrl.modifyThing) // Modifier un objet
router.get('/:id', auth, stuffCtrl.getOneThing) // Récupérer un objet
router.get('/', auth, stuffCtrl.getAllThings) // Récupérer tous les objets

module.exports = router