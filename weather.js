const request = require('request')

const weather = (a, b, cb) => {
    const url = 'https://api.darksky.net/forecast/e560569ada08e9cedfc89c631dcbdd2c/' + a + ',' + b
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            cb(error, undefined)
        } else {
            cb(undefined, 'its ' + response.body.currently.temperature + ' degrees now ')
        }
        



})
}

weather(37, -120, (error, temp) => {
    console.log(error, temp)
})
/* 
request({url: url, json: true}, (error, response) => {

    const latitude = response.body.features[0].center[1]
    const longitude = response.body.features[0].center[0]
    const urldarksky = 'https://api.darksky.net/forecast/e560569ada08e9cedfc89c631dcbdd2c/' + latitude + ',' + longitude 
    request({ url: urldarksky, json: true }, (error, response) => {
        console.log('its ' + response.body.currently.temperature + ' degrees now ')

})

})

*/ 