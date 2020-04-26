const request = require('postman-request');

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=14ea8ce8c2b71ec991e3872e3e83fc24&query='+lat+','+lng+'';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback(body.error.info);
        } else{
            const data = {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast