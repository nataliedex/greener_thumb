const express = require('express');
const app = express();


// use .env file in the config folder
require('dotenv').config({ path:'./config/.env' });

// using EJS for the views
app.set('view engine', 'ejs');

// static folder
app.use(express.static('public'));

// body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render('index.ejs');
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is currently running on ${process.env.PORT}`);
});