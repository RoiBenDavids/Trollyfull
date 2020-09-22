
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    console.log(filterBy, 'service!!!!!!!');
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('trip')
    console.log(criteria, 'service!!!!!!!');
    try {
        const trips = await collection.find(criteria).toArray();
        return trips
    } catch (err) {
        console.log('ERROR: cannot find trips')
        throw err;
    }
}

async function getById(id){
    const collection = await dbService.getCollection('trip')
    try {
        const trips = await collection.findOne({"_id":ObjectId(id)});
        console.log(trips);
        return trips
    } catch (err) {
        console.log('ERROR: cannot find trips')
        throw err;
    }

}

async function update(trip) {
    const collection = await dbService.getCollection('trip')
    trip._id = ObjectId(trip._id);

    try {
        await collection.replaceOne({ "_id": trip._id }, { $set: trip })
        return trip
    } catch (err) {
        console.log(`ERROR: cannot update trip ${trip._id}`)
        throw err;
    }
}


async function add(trip) {

    const collection = await dbService.getCollection('trip')
    try {
        console.log('service');
        await collection.insertOne(trip);
        return trip;
    } catch (err) {
        console.log(`ERROR: cannot insert trip`)
        throw err;
    }
}

function remove(trip) {
    return trip
}

function _buildCriteria(filterBy) {
    if(!filterBy) return
    const criteria = { };
    return criteria;
}

module.exports = {
    query,
    update,
    remove,
    add,
    getById
}


