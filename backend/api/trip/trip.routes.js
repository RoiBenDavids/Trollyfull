const express = require('express')
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {addTrip, getTrips, deleteTrip,getTrip} = require('./trip.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/:id', getTrip)
router.get('/', getTrips)
// router.post('/',  requireAuth, addTrip)
router.put('/:id', addTrip)
router.post('/', addTrip)
router.delete('/:id', deleteTrip)

module.exports = router