"use strict";

let featureNoStatus = async function (ctx) {
    const queryMessage = "Features/Epics that need Status"
    var query = {            
        "from": "Epic",
        "select": [
            "Name"
        ],
        "where": {
            "IsClosed": false,
            "Status.ID": "NULL",
            "Scope.Name": "$currentScopeName",
            "Team.Name": "$teamName"
        },
        "with": {
            "$currentScopeName": "Sample: Company",
            "$teamName": "Sample: Team A"
        },
        "page": {
            "size": 13,
            "start": 0
        }           
    }

    const config = require('../../config/config.js')
    const processQuery = require('../processQuery.js').processQuery

    await processQuery(query, ctx.request.query, config.v1EpicBaseUrl)
    .then(function (links) {
        ctx.body = {
            message: queryMessage,
            scopeName: query.with.$currentScopeName,       // scope and team may be replaced
            teamName: query.with.$teamName,
            items: links
        }       
    })
    .catch(function (err) {
        console.log(err.message)
    });
}

module.exports = { 
    featureNoStatus: featureNoStatus
}