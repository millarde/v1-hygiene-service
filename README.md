# v1-hygiene-service
Service interface for V1 hygiene queries

Requires node.js 8.x and a current version of Docker if you want to create/run the container.

Good data is important if you want to make data-backed decisions.
This service helps identify, based on queries you create to meet your needs, V1 work items that need attention. There is a related, simple UI for displaying the results and changing some of the query parameters. See [Vue.js UI for V1 Hygiene](https://github.com/millarde/v1-hygiene-vue-ui "V1 Work Item Hygiene Dashboard")

This node.js based service 
provides a REST-like interface 
for calling pre-made queries 
that retrieve VersionOne work item data.
Each query spec (in /queries) uses the V1 query.v1 API to retrieve work items that match the specified criteria. 
[Read more about how to use V1 query API](https://medium.com/@millard3/getting-into-the-versionone-query-api-f4408f3767b9)

The "contract" for a query is that 
it will return a message that desribes the items returned 
along with a collection of {name, link} for each item. 
Use an existing query to start a new one, carefully replacing the data needed.
Read [Working with the VersionOne API](https://medium.com/@millard3/working-with-the-versionone-api-70c5391057ab) for a useful way to create and test new queries. I used [http://convertjson.com/yaml-to-json.htm](this YAML-to-JSON converter) before dropping the JSON into the query code.

# V1 API Key REQUIRED!
The service requires a valid VersionOne API key for your target system in order to work. The service will look for this in an environment variable named V1APIKEY. In the current version, it requires the full Authorization section with the key value, e.g., export V1APIKEY="Bearer 1.As...Nm4=". The _Working with VersionOne API_ article linked above describes how to get a valid key.

# Running the service
You'll also need your own _Server Base URI_ that points to your running VersionOne instance. See [config.js](./config/config.js).
  
With an exported API key and your <Server Base URI> configured, you can start the service and try out the existing endpoints.
  
Use `npm start` to start the service. It will listen on port 3000 unless you configure a different port via your environment.

You can use the /healthcheck endpoint to verify that the service is running: http://localhost:3000/healthcheck

The other endpoints require that you provide necessary queryParams that include data identifying a Scope and Team that exist in your V1 config. For example, http://localhost:3000/featurenostatus?scopeName=MyScope&teamName=MyTeam

Aside: There are /data helper "queries" in the repo. These are intended to provide select values to support a UI. You can certainly call these as well though you should not modify them (unless you are prepared to fixup the UI to deal with any changes). 

# Containering the service

In the [docker-cmds.txt](./docker-cmds.txt) file are the commands you'll need to create and run the container (depending on your Docker workflow, you may want to adjust, for example, providing a proper name). The export line in the file doesn't work, it's just a reminder that you need to have a V1APIKEY environment variable in order for the service to work. The port mapping makes it possible to have your local copy running at port 3000 and the container version running at port 8088.

To run the /healthcheck against the container version, use http://localhost:8088/healthcheck

# Making new queries
This is getting a bit long. Adding a query to the service is described [here](./ADDQUERY.MD).

# Need help? Have suggestions (or complaints)?
Feel free to contact me. Create an issue or pull request as appropriate.
