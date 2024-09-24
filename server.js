// Load the express module
const express = require('express');
const path = require('path'); // Required for serving static files
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Redirect root to /about
app.get('/', (req, res) => {
    res.redirect('/about');
});

// Route for about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Express http server listening on port ${PORT}`);
});
