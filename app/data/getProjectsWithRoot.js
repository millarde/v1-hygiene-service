"use strict";

const rp = require('request-promise-native')

let getProjectsWithRoot = async function (ctx) {

    var options = {
        method: 'POST',
        uri: '',
        headers: {
            'User-Agent': 'millarde',
            'Accept' : 'application/json',
            'Authorization': 'Your Bearer: token string'
        },
        body: {
            "from": "Scope",
            "select": [
               "Name"
            ],
            "where": {
               "ParentMeAndUp.Name": "$rootScopeName",
               "IsInactive": false,
               "IsDead": false
            },
            "sort": [
               "CreateDateUTC"
            ],
            "with": {
               "$rootScopeName": "Sample: Company"
            },
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

    const projectRoot = ctx.request.query.scopeName
    if (projectRoot) options.body.with.$rootScopeName = projectRoot
    console.log(options)
    var items = []

    await rp(options)
        .then(function (body) {
            let projects = body[0]
            projects.forEach( function(project){
                items.push(project.Name)
            } )         
        })
        .catch(function (err) {
            console.log(err.message)
            if (err.statusCode === 401) {
                items.push("Authentication error, check V1APIKEY")
            }
        });

    ctx.body = {
        message: "Project names with root "+options.body.with.$rootScopeName,
        items: items
    } 
}

module.exports = { 
    getProjects: getProjectsWithRoot
}