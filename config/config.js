
const apiKey = process.env.V1APIKEY
if (!apiKey) {
    throw new Error("No API Key in environment variable V1APIKEY")
}

const v1ServerBaseUrl = "https://www4.v1host.com/7GenTech"

const config = { 
    v1ApiKey: apiKey, 
    v1EpicBaseUrl: v1ServerBaseUrl+"/epic.mvc/Summary?oidToken=",
    v1StoryBaseUrl: v1ServerBaseUrl+"/story.mvc/Summary?oidToken=",
    v1QueryUrl: v1ServerBaseUrl+"/query.v1",
}
  
module.exports = config