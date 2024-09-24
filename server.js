/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
No part of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Ali 
Student ID: taheri
Date: 24-09-24
Vercel Web App URL: 
GitHub Repository URL: https://github.com/tali40/web322-app

********************************************************************************/ 

const express = require('express');
const storeService = require('./store-service');
const app = express();

app.use(express.static('public'));

// Redirect '/' to '/about'
app.get('/', (req, res) => {
    res.redirect('/about');
});

// Serve about.html for the /about route
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

// Get all published items for the /shop route
app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then(data => res.json(data))
        .catch(err => res.status(404).json({ message: err }));
});

// Get all items for the /items route
app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then(data => res.json(data))
        .catch(err => res.status(404).json({ message: err }));
});

// Get all categories for the /categories route
app.get('/categories', (req, res) => {
    storeService.getCategories()
        .then(data => res.json(data))
        .catch(err => res.status(404).json({ message: err }));
});

// Custom 404 page for unmatched routes
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Export the app for Vercel
module.exports = (req, res) => {
    return app(req, res);
};
