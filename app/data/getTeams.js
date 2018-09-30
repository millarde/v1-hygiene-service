"use strict";

const rp = require('request-promise-native')

let getTeams = async function (ctx) {

    var options = {
        method: 'POST',
        uri: '',
        headers: {
            'User-Agent': 'millarde',
            'Accept' : 'application/json',
            'Authorization': 'Your Bearer: token string'
        },
        body: {
            "from": "Team",
            "select": [
               "Name"
            ],
            "where": {
               "IsInactive": false
            },
            "find": "Sample:",
            "findIn": "Name",
            "page": {
               "size": 42,
               "start": 0
            }
         },
        json: true // Automatically stringifies the body to JSON and FORCES body to be JSON
    };
   
    const config = require('../../config/config.js')
    if (config) options.uri = config.v1QueryUrl
    options.headers.Authorization = "Bearer "+config.v1ApiKey
    
    const teamFilter = ctx.request.query.teamFilter
    if (teamFilter) options.body.find = teamFilter

    var items = []

    await rp(options)
        .then(function (body) {
            let teams = body[0]
            teams.forEach( function(team){
                items.push(team.Name)
            } )         
        })
        .catch(function (err) {
            console.log(err.message)
            if (err.statusCode === 401) {
                items.push("Authentication error, check V1APIKEY")
            }
        });

    ctx.body = {
        message: "Team names starting with "+options.body.find,
        items: items
    } 
}

module.exports = { 
    getTeams: getTeams
}