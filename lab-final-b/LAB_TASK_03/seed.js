
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/driving_school')
    .then(() => {
        console.log("Connected to MongoDB for seeding");
        seedDB();
    })
    .catch(err => {
        console.log("Error connecting to DB:", err);
    });

const products = [
    {
        name: "M CLASS",
        category: "License",
        price: 450,
        description: "Vivamus ornare a massa et hendrerit. Cras ullamcorper fringilla cursus.",
        image: "/images/M_Class.jpg"
    },
    {
        name: "D CLASS",
        category: "License",
        price: 500,
        description: "Phasellus sollicitudin nulla a ipsum mattis sagittis nam tincidunt.",
        image: "/images/D_Class.jpg"
    },
    {
        name: "A B and C CLASS",
        category: "License",
        price: 1200,
        description: "Cras condimentum diam enim, a eleifend augue pretium eu. Phasellus iaculis.",
        image: "/images/ABC_Class.jpg"
    },
    {
        name: "SPORT CLASS",
        category: "License",
        price: 800,
        description: "Vestibulum sodales nisl dictum erat volutpat, id ullamcorper lacus sollicitudin.",
        image: "/images/SportClass.jpg"
    },
    {
        name: "Safety Gear Rental",
        category: "Rental",
        price: 50,
        description: "Full set of protective gear for your lessons.",
        image: "/images/PhotoGallery02.png" // using existing image as placeholder
    },
    {
        name: "Advanced Highway Module",
        category: "Safety",
        price: 150,
        description: "Specialized training for highway driving safety.",
        image: "/images/PhotoGallery04.png"
    },
    {
        name: "Night Driving Course",
        category: "Safety",
        price: 200,
        description: "Learn to navigate safely during night time conditions.",
        image: "/images/PhotoGallery06.png"
    },
    {
        name: "Winter Driving Basics",
        category: "Safety",
        price: 120,
        description: "Essential skills for driving on snow and ice.",
        image: "/images/PhotoGallery01.png"
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("Database seeded successfully");
    } catch (err) {
        console.log("Error seeding DB:", err);
    } finally {
        mongoose.connection.close();
    }
};
