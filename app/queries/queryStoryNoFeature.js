"use strict";

let storyNoFeature = async function (ctx) {
    const queryMessage = "Stories that need a feature"
    var query = {
        "from": "Story",
        "select": [
            "Name",
            "Status.Name",
            "Super.ID",
            "Scope.Name",
            "Team.Name"
        ],
        "where": {
            "Super.ID": "NULL",
            "Scope.Name": "$currentScopeName",
            "Team.Name": "$teamName"
        },
        "with": {
            "$currentScopeName": "Sample: Company",
            "$teamName": "Sample: Team A",
            "$status": "In Progress"
        },
        "page": {
            "size": 13,
            "start": 0
        }
    };
    
    const config = require('../../config/config.js')
    const processQuery = require('../processQuery.js').processQuery

    await processQuery(query, ctx.request.query, config.v1StoryBaseUrl)
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
    storyNoFeature: storyNoFeature
}
