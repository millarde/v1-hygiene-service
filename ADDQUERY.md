# Adding a new query to the service

Only queries returning Features or Stories are currently supported. Because the link to the V1 item depends on the item type, start by copying an appropriate file. I'll walk through an example, presuming that you have copied the queryStoryNoFeature.js file as your starting point.

Let's pretend you want to add a query for _Stories without points_ (which requires we also pretend you are not part of the #noestimates movement). 

## Step 1: Copy an appropriate starter file
Start by making a copy of app/query/queryStoryNoFeature.js into queryStoryNoPoints.js

## Step 2: Change the query/function name
Our new query end point will be called "storyNoPoints". We need to fix that up in our new file. Best bet is to use the global replace feature of your editor (or its refactoring->rename capability). There should be 3 fixups: the function name at the top and the exports at the bottom of the file. This same name will be used to import the file to server.js and connect it to the server routing.

## Step 3: Change the queryMessage constant
This message will be part of the response and the only indicator to the caller of what issue the returned items share. In the sample UI, it is displayed above the list of item links.

## Step 4: Change the query
Using the links shared in the README.MD, you have figured out the query you want to use. The _Working with the VersionOne API_ article describes how to test a query (using YAML) then convert it its JSON representation (for use in our Javscript file). Replace the query object with your new JSON.

## Step 5: Wire the new query into the service
In service.js we need to add an import for the new file (/app/query/queryStoryNoPoints.js) and add a route so that users can get to it. It would be a line like this (add it after similar lines at the top of the file):

> const __storyNoPoints__ = require('./app/queries/__queryStoryNoPoints.js__').__storyNoPoints__

Now it is available to be called. Let's add a route to call it. Look for the _app.use(router..._ section in the code. Copy one of the lines that is most like the one you want to make and paste it under the line you copied. Then make it look like this:

> _.get('/storynopoints', storyNoPoints),

Now the server knows how to call it. Save that stuff.

## Step 7: Test it!
Using instructions from the README.MD, run the service. Every query expects a Scope and Team -- otherwise there may just be too many items selected. Test with a URL that looks like this:

> http://localhost:3000/storynopoints?scopeName=MyProject&teamName=MyTeamName

__BOOM__ Nice job. See the UI repo where I'll continue this example, showing how to add it to the UI.
