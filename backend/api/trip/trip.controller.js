const logger = require('../../services/logger.service')
const tripService = require('./trip.service')

// TODO: needs error handling! try, catch

async function getTrips(req, res) {
    try {
        const trips = await tripService.query(req.query)
        res.send(trips)
    } catch (err) {
        logger.error('Cannot get trips', err);
        res.status(500).send({ error: 'cannot get trips' })

    }
}

async function getTrip(req, res) {
    try {
        const trip = await tripService.getById(req.params.id)
        res.json(trip)
    } catch (err) {
        logger.error('Cannot get trip', err);
        res.status(500).send({ error: 'cannot get trip' })

    }

}

async function deleteTrip(req, res) {
    try {
        await tripService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete trip', err);
        res.status(500).send({ error: 'cannot delete trip' })
    }
}

async function addTrip(req, res) {
    var trip = req.body;
    try {
        if (trip._id) {
            trip = await tripService.update(trip)
        } else {
            trip.createdBy = req.session.user ? {
                id: req.session.user._id,
                username: req.session.user.username,
                imgUrl: req.session.user.imgUrl
            } : {
                    id: 'guest',
                    username: 'Guest',
                    imgUrl: 'https://res.cloudinary.com/idanrozen/image/upload/v1600889656/opinion-sin-imagen_raxn0y.png'
                }
            trip.members = req.session.user ? [{
                id: req.session.user._id,
                username: req.session.user.username,
                imgUrl: req.session.user.imgUrl
            }] : [{
                    id: 'guest',
                    username: 'Guest',
                    imgUrl: 'https://res.cloudinary.com/idanrozen/image/upload/v1600889656/opinion-sin-imagen_raxn0y.png'
                }]
            trip = await tripService.add(trip)
        }
        res.json(trip)
    } catch (error) {
        logger.error('Cannot save trip', error);
        res.status(500).send({ error: 'cannot save trip' })
    }

}

module.exports = {
    getTrips,
    deleteTrip,
    addTrip,
    getTrip
}