const Hapi = require('hapi')
const Inert = require('inert')
const Handlebars = require('handlebars')
const Vision = require('vision')

require('env2')('.env')

const githubAuth = require('./plugins/github_auth.js')
const initHandlebars = require('./plugins/handlebars.js')
const jobsEndpoint = require('./routes/jobs.js');
const listJobEndpoint = require('./routes/list-job.js');

const port = process.env.PORT || 4000

const server = new Hapi.Server()

server.connection({ port })

server.register([
  Inert,
  Vision,
  initHandlebars,
  githubAuth,
  jobsEndpoint,
  listJobEndpoint
], err => {
  if (err) throw err

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
})

module.exports = server;
