"use strict";

let storyNoType = async function (ctx) {
    const queryMessage = "Stories that need a Type field"
    var query = {
        "from": "Story",
        "select": [
            "Name",
            "Scope.Name",
            "Category"
        ],
        "where": {
            "Category.ID": "NULL",
            "Scope.Name": "$currentScopeName",
            "Team.Name": "$teamName"
        },
        "with": {
            "$currentScopeName": "Sample: Release 1.0",
            "$teamName": "Sample: Team A"
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
    storyNoType: storyNoType
}
