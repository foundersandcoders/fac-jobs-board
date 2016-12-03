const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const Handlebars = require('handlebars')

require('env2')('.env')

const githubAuth = require('./plugins/github_auth.js')
// const initHandlebars = require('./plugins/handlebars.js')

const jobsEndpoint = require('./routes/jobs.js');
const listJobEndpoint = require('./routes/list-job.js');
const homepageEndpoint = require('./routes/homepage.js');

const port = process.env.PORT || 4000

const server = new Hapi.Server()

server.connection({ port })

server.register([
  Inert,
  Vision,
  githubAuth,
  jobsEndpoint,
  listJobEndpoint,
  homepageEndpoint
], err => {
  if (err) throw err

  server.views({
    engines: { html: Handlebars },
    relativeTo: './templates',
    path: '.',
    layout: 'default',
    layoutPath: 'layout',
    helpersPath: 'helpers',
    partialsPath: 'partials',
    isCached: false
  })

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './assets',
        redirectToSlash: true,
        index: false
      }
    }
  })

  console.log('done!');
})

module.exports = server;
