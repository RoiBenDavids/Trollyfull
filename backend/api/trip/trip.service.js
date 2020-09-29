
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('trip')
    try {
        const trips = await collection.find({
            $or: [
                {
                    destinations: {
                        $elemMatch: {
                            name: { $regex: new RegExp(filterBy.search, 'ig') }
                        }
                    }
                },
                {
                    tripName: { $regex: new RegExp(filterBy.search, 'ig') }
                }

            ]
        }).toArray();

        return trips
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    const collection = await dbService.getCollection('trip')
    try {
        const trips = await collection.findOne({ "_id": ObjectId(id) });
        return trips
    } catch (err) {
        throw err;
    }

}

async function update(trip) {
    const collection = await dbService.getCollection('trip')
    trip._id = ObjectId(trip._id);

    try {
        await collection.updateOne({ "_id": trip._id }, { $set: trip })

        return trip
    } catch (err) {
        throw err;
    }
}


async function add(trip) {

    const collection = await dbService.getCollection('trip')
    try {
        await collection.insertOne(trip);
        return trip;
    } catch (err) {
        throw err;
    }
}

async function remove(trip) {
    const collection = await dbService.getCollection('trip')
    try {
        return await collection.deleteOne({ "_id": ObjectId(trip) })
    } catch (err) {
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    // return criteria
    if (filterBy.search) {
        criteria.tripName = { $regex: new RegExp(filterBy.search, 'ig') }
    }
    return criteria;
}




module.exports = {
    query,
    update,
    remove,
    add,
    getById
}


