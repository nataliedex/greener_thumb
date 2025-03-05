const express = require('express');
const app = express();
const axios = require('axios');


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
    res.render('index.ejs', { data: [] });
});

app.get("/data", async (req, res) => {
    try{
        const edible = req.query.edible;
        const poisonous = req.query.poisonous;
        const cycle = req.query.cycle;
        const watering = req.query.watering;
        const sunlight = req.query.sunlight;
        const indoor = req.query.indoor;
        const hardiness = req.query.hardiness;

        let url = `https://perenual.com/api/v2/species-list?key=${process.env.PERENUAL_API_KEY}`;

        if (edible !== "") url += `&edible=${edible}`;
        if (poisonous !== "") url += `&poisonous=${poisonous}`;
        if (cycle !== "") url += `&cycle=${cycle}`;
        if (watering !== "") url += `&watering=${watering}`;
        if (sunlight !== "") url += `&sunlight=${sunlight}`;
        if (indoor !== "") url += `&indoor=${indoor}`;
        if (hardiness !== "") url += `&hardiness=${hardiness}`;

        console.log(url);
        
        const response = await axios.get(url);
        const data = response.data.data;

        res.render('index', { data });
    } catch(error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is currently running on ${process.env.PORT}`);
});