const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for your views
app.set('views', __dirname + '/views');

// Serve static files (e.g., images, CSS, JavaScript)
app.use(express.static(__dirname));

// Define routes
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
