"use strict";

const rp = require('request-promise-native')

const processQuery = async function (query, queryParams, v1ItemBaseUrl) {

    var options = {
        method: 'POST',
        uri: '',
        headers: {
            'User-Agent': 'millarde',
            'Accept' : 'application/json',
            'Authorization': 'Your Bearer: token string'
        },
        body: {
        },
        json: true // Automatically stringifies the body to JSON and FORCES body to be JSON
    }

    if (query) options.body = query
    else throw new Error("No Query specified!")

    const config = require('../config/config.js')
    if (config) options.uri = config.v1QueryUrl
    options.headers.Authorization = "Bearer "+config.v1ApiKey

    //get and replace query params if available
    const v1Scope = queryParams.scopeName
    if (v1Scope) options.body.with.$currentScopeName = v1Scope
    const v1Team = queryParams.teamName
    if (v1Team) options.body.with.$teamName = v1Team

    var workItems = []

    return await rp(options)
        .then(function (body) {
            let items = body[0]
            // maybe allow user-supplied function here someday to post-process before links are generated?
            items.forEach( function(item){
                let link = v1ItemBaseUrl+item._oid
                let name = item.Name
                var workItem = {name: name, link: link}
                workItems.push(workItem)
            } )
            return workItems
        })
        .catch(function (err) {
            console.log(err.message)
            if (err.statusCode === 401) {
                var errItem = {name: "Error with authentication, check V1APIKEY", link: ""}
                workItems.push(errItem)
            }
        });
    }

module.exports = { 
    processQuery: processQuery
}