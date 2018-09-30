"use strict";

const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const router = require('koa-simple-router')
const error = require('koa-json-error')
const logger = require('koa-logger')
const koaRes = require('koa-res')
const handleError = require('koa-handle-error')

const storyNoFeature = require('./app/queries/queryStoryNoFeature.js').storyNoFeature
const featureNoStatus = require('./app/queries/queryFeatureNoStatus.js').featureNoStatus
const storyNoType = require('./app/queries/queryStoryNoType.js').storyNoType
const getTeamNames = require('./app/data/getTeams').getTeams
const getProjectNamesWithRoot = require('./app/data/getProjectsWithRoot').getProjects
const getChildProjects = require('./app/data/getChildProjects').getProjects

app.use(logger())
app.use(bodyParser())
app.use(convert(koaRes()))
// configure cors to allow same origin requests (localhost)  @@:turn off?
app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(router(_ => {
    _.get('/storynofeature', storyNoFeature),
    _.get('/featurenostatus', featureNoStatus),
    _.get('/storynotype', storyNoType),

    _.get('/healthcheck', async (ctx) => {
        ctx.body = 'situation normal'
    }),
    _.get('/getTeams', getTeamNames),
    _.get('/getProjectsWithRoot', getProjectNamesWithRoot),
    _.get('/getChildProjects', getChildProjects)
    
}))

const port = process.env.PORT || 3000
app.listen(port, () => console.log('App listening on ' + port));

app.on('error', err => {
    console.error('server error', err)
  });