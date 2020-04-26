const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
// FOR HEROKU
const port = process.env.PORT || 3000

//Define payths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Home Route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Page',
        description: 'Use this site to get your weather!'
    })
});

// About Route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        image: './img/img-1.jpg'
    })
});

// Help Route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'If you have any question, kindly send me an email.'
    })
});

// GET WEATHER
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {lat, lng, placeName} = {}) => {
        if (error){
            return res.send({
                error
            })
        } else{
            forecast(lat, lng, (error, {description, temperature, feelslike}) => {
                if (error) {
                    return res.send({
                        error
                    })
                } else{
                    res.send({
                        placeName,
                        description,
                        temperature,
                        feelslike
                    })
                }
            })
        }
    })
});

// 404 Pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorMessage: 'Single Help Article not found!'
    })  
});
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorMessage: 'Page Not Found!'
    })
});
 
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})