const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!")
        console.log(err)
    })

    const sample = array => array[Math.floor(Math.random() * array.length)];


    const seedDB = async () => {
        await Campground.deleteMany({});
        for (let i = 0; i < 200; i++) {
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;
            const camp = new Campground({
                author: '627bc79effaac31b4759e521',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nulla at ducimus animi beatae aut expedita, molestiae mollitia ex. Esse aliquid ducimus earum ad magni ipsam quam reprehenderit ea tenetur.',
                price,
                geometry: {
                    type: "Point",
                    coordinates: [
                        cities[random1000].longitude,
                        cities[random1000].latitude,
                    ]
                },
                images: [
                    {
                        
                        url: 'https://res.cloudinary.com/dzasgjll4/image/upload/v1652624743/YelpCamp/ot7joewsohs5g8yalh4q.jpg',
                        filename: 'YelpCamp/ot7joewsohs5g8yalh4q'
                      
                    },
                    {
                       
                        url: 'https://res.cloudinary.com/dzasgjll4/image/upload/v1652624743/YelpCamp/u8vmiyalhle7f2dos6ls.jpg',
                        filename: 'YelpCamp/u8vmiyalhle7f2dos6ls'
                      
                    }
                  ]
            })
            await camp.save();
        }
    }
    
    seedDB().then(() => {
        mongoose.connection.close();
    })