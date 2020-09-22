import axios from 'axios'
import { storageService } from './asyncStorageService'
import { utils } from './utils'
import httpService from './httpService'
const BASE_URL = 'http://localhost:3001/trip'

const resolveData = res => res.data

export const tripService = {
    query,
    getById,
    remove,
    save
}


const user = {
    _id: 'u101',
    fullName: 'Orly Amdadi',
    userName: 'orly@amdadi.com',
    password: 'tinkerbell',
    imgUrl: 'http://some-img',
}


const trips = [
    {
        _id: '43857754658fu049f',
        members: [{
            _id: 'u101',
            fullName: 'Orly Amdadi',
            imgUrl: 'http://jbdcsdcj'
        }],
        createdBy: 'u101',
        imgUrl: 'https://images.unsplash.com/photo-1484804959297-65e7c19d7c9f?ixlib=rb-1.2.1',
        destinations: [
            {
                id: 'ksndv8',
                name: 'taipei',
                startDate: 1600236000000,
                endDate: 1600466400000,
                location: {
                    lat: 25.04776,
                    lng: 121.53185
                }
            }],

        activities: [

            {
                id: 'KHKHHL776',
                destination: 'Taipei',
                at: 1600232400000,
                duration: 2,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL72277',
                destination: 'Taipei',
                at: 1600246800000,
                duration: 5,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL778',
                destination: 'Taipei',
                at: 1600257600000,
                duration: 5,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL779',
                destination: 'Taipei',
                at: 1600326000000,
                duration: 2,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL780',
                destination: 'Taipei',
                at: 1600329600000,
                duration: 9,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL781',
                destination: 'Taipei',
                at: 1600358400000,
                duration: 6,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7761',
                destination: 'Taipei',
                at: 1600407000000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7762',
                destination: 'Taipei',
                at: 1600425000000,
                duration: 2,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7763',
                destination: 'Taipei',
                at: 1600426800000,
                duration: 5,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7764',
                destination: 'Taipei',
                at: 1600434000000,
                duration: 5,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
        ]
    },
    {
        _id: '98307667jkedbfj',
        members: [{
            _id: 'u101',
            fullName: 'Orly Amdadi',
            imgUrl: 'http://jbdcsdcj'
        }],
        createdBy: 'jbkjg876iug865gl',
        imgUrl: 'https://images.unsplash.com/photo-1484804959297-65e7c19d7c9f?ixlib=rb-1.2.1',
        destinations: [{
            id: 'ksndv8',
            name: 'Taipei',
            startDate: Date.now() + (1000 * 60 * 60 * 24 * 5),
            endDate: Date.now() + (1000 * 60 * 60 * 24 * 10),
            location: {
                lat: 25.04776,
                lng: 121.53185
            }
        },
        {
            id: 'ks55ji',
            name: 'China',
            startDate: Date.now() + (1000 * 60 * 60 * 24 * 10),
            endDate: Date.now() + (1000 * 60 * 60 * 24 * 18),
            location: {
                lat: 22.3193,
                lng: 114.1694
            }
        }
        ],


        activities: [{
            id: 'KHKHHL776',
            destination: 'Taipei',
            at: 875848759,
            duration: 2,
            name: 'beach',
            notes: ['towel', 'sun screen', 'water', 'beer'],
            location: { lat: 3224.234234, lng: 43534 },
            imgUrl: 'http//scac.vodvm.sda',
            price: { amount: 20, currency: '$' },
            labels: ['relax']
        }]
    },

    {
        _id: '9869545n5knldkvs',
        members: [{
            _id: 'u101',
            fullName: 'Orly Amdadi',
            imgUrl: 'http://jbdcsdcj'
        }],
        createdBy: 'jbkjg876iug865gl',
        imgUrl: 'http//vkjbfcd.jpg',
        destinations: [{
            id: 'ksndv8',
            name: 'sao paolo',
            startDate: 43635868,
            endDate: 735938669,
            location: {
                lat: 23.5505,
                lng: 46.6333
            }
        }],

        activities: [{
            id: 'KHKHHL776',
            destination: 'sao paolo',
            at: 875848759,
            duration: 2,
            name: 'barbecue',
            notes: ['towel', 'sun screen', 'water', 'beer'],
            location: { lat: 3224.234234, lng: 43534 },
            imgUrl: 'http//scac.vodvm.sda',
            price: { amount: 250, currency: '$' },
            labels: ['relax']
        }]
    }, {
        _id: '986975845156dkvs',
        members: [{
            _id: 'u101',
            fullName: 'Orly Amdadi',
            imgUrl: 'http://jbdcsdcj'
        }],
        createdBy: 'jbkjg876iug865gl',
        imgUrl: 'http//vkjbfcd.jpg',
        destinations: [{
            id: 'ksndv8',
            name: 'Corfu',
            startDate: Date.now() + (1000 * 60 * 60 * 24 * 10),
            endDate: Date.now() + (1000 * 60 * 60 * 24 * 22),
            location: {
                lat: 39.6243,
                lng: 19.9217
            }
        }],

        activities: [{
            id: 'KHKHHL75616',
            destination: 'Corfu',
            at: 875848759,
            duration: 2,
            name: 'retaurant',
            notes: ['towel', 'sun screen', 'water', 'beer'],
            location: { lat: 3224.234234, lng: 43534 },
            imgUrl: 'http//scac.vodvm.sda',
            price: { amount: 70, currency: '$' },
            labels: ['relax']
        },
        {
            id: 'KHKHHL776',
            destination: 'Corfu',
            at: 875848759,
            duration: 5,
            name: 'beach',
            notes: ['towel', 'sun screen', 'water', 'beer'],
            location: { lat: 3224.234234, lng: 43534 },
            imgUrl: 'http//scac.vodvm.sda',
            price: { amount: 15, currency: '$' },
            labels: ['relax']
        }]
    },
    {
        _id: '438577i4h48fu049f',
        members: [{
            _id: 'u101',
            fullName: 'Orly Amdadi',
            imgUrl: 'http://jbdcsdcj'
        }],
        createdBy: 'u101',
        imgUrl: 'http//vkjbfcd.jpg',
        destinations: [
            {
                id: 'ksnd3v8',
                name: 'nepal',
                startDate: 1600236000000 + 13 * 24 * 60 * 60 * 1000,
                endDate: 1600466400000 + 13 * 24 * 60 * 60 * 1000,
                location: { lat: 28.3949, lng: 84.1240 }
            },
            {
                id: 'ksn4dv8',
                name: 'Butan',
                startDate: 1600466400000 + 13 * 24 * 60 * 60 * 1000,
                endDate: 1600466400000 + 16 * 24 * 60 * 60 * 1000,
                location: { lat: 33.3949, lng: 94.1240 }
            },
            {
                id: 'ksnd5v8',
                name: 'Mongolia',
                startDate: 1600466400000 + 16 * 24 * 60 * 60 * 1000 ,
                endDate: 1600466400000 + 19 * 24 * 60 * 60 * 1000,
                location: { lat: 33.3949, lng: 94.1240 }
            }
        ],

        activities: [

            {
                id: 'KHKHHL776',
                destination: 'nepal',
                at: 1600232400000 + 13 * 24 * 60 * 60 * 1000,
                duration: 4,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL72277',
                destination: 'nepal',
                at: 1600246800000 + 13 * 24 * 60 * 60 * 1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL778',
                destination: 'nepal',
                at: 1600257600000 + 13 * 24 * 60 * 60 * 1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL779',
                destination: 'nepal',
                at: 1600326000000 + 13 * 24 * 60 * 60 * 1000,
                duration: 2,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL780',
                destination: 'nepal',
                at: 1600329600000 + 13 * 24 * 60 * 60 * 1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL781',
                destination: 'nepal',
                at: 1600358400000 + 13 * 24 * 60 * 60 * 1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7761',
                destination: 'nepal',
                at: 1600407000000 + 13 * 24 * 60 * 60 * 1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7762',
                destination: 'nepal',
                at: 1600425000000 + 13 * 24 * 60 * 60 * 1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7763',
                destination: 'nepal',
                at: 1600426800000 + 13 * 24 * 60 * 60 * 1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7764',
                destination: 'nepal',
                at: 1600434000000 + 13 * 24 * 60 * 60 * 1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL778889',
                destination: 'Butan',
                at: 1601708400000 ,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL77699s0',
                destination: 'Butan',

                at: 1601739000000 ,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7769d90',
                destination: 'Butan',

                at: 1601708400000 + 1 * 24 * 60 * 60 * 1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7762990',
                destination: 'Butan',

                at: 1601809200000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL776a90',
                destination: 'Butan',

                at: 1601809200000 +24*60**2*1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL7769dd0',
                destination: 'Mongolia',

                at: 1601809200000 +1*24*62**2*1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            {
                id: 'KHKHHL77s69asd0',
                destination: 'Mongolia',

                at: 1601809200000 +3*24*62**2*1000,
                duration: 1,
                name: 'beach',
                notes: ['towel', 'sun screen', 'water', 'beer'],
                location: { lat: 3224.234234, lng: 43534 },
                imgUrl: 'http//scac.vodvm.sda',
                price: { amount: 20, currency: '$' },
                labels: ['relax']
            },
            

        ]
    }
]





async function query(filterBy) {
    // const queryParams
    return httpService.get('trip', filterBy)

    const queryStr = `?search=${filterBy.search}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&type=${filterBy.type}&inStock=${filterBy.inStock}`;
    return httpService.get(`trip${queryStr}`);
    // let tripsToReturn = await storageService.query('trips')
    // if (!tripsToReturn.length) {
    //     tripsToReturn = await storageService.postAll('trips', trips)
    //     console.log(tripsToReturn, 'query');
    // }
    // return Promise.resolve(tripsToReturn)
}


async function getById(tripId) {
    // const trip = await storageService.getById('trips', tripId)
    // return Promise.resolve(trip)
    return httpService.get(`trip/${tripId}`,tripId)

}

function remove(tripId) {
    // return storageService.remove('trips', tripId)
    return httpService.delete(`trip/${tripId}`)
}

function save(trip) {
    if (trip._id) {
        // return storageService.put('trips', trip)
        return httpService.put(`trip/${trip._id}`, trip)

    } else {
        // return storageService.post('trips', trip)
        return httpService.post('trip', trip)
    }
}