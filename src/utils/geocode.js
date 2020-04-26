const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3BhY2VkcmVhbWVyIiwiYSI6ImNrOWdzaGh4dDAxcWMzdXFtNzd1YzR2cmMifQ.YvcJt2rehbXRhC0V5wirLg';
    request({ url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to location service');
        } else if (body.features.length == 0) {
            callback('Location name is undefined');
        } else{
            const data = {
                lat: body.features[0].center[0],
                lng: body.features[0].center[1],
                placeName: body.features[0].place_name
            }
            callback(undefined, data);
        }
    })
}

module.exports = geocode;