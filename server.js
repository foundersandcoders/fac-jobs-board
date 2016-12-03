const Hapi = require('hapi')
const Inert = require('inert')
const Handlebars = require('handlebars')
const Vision = require('vision')

require('env2')('.env')

const githubAuth = require('./github_auth.js')
const jobsEndpoint = require('./routes/jobs.js');

const port = process.PORT || 4000

const server = new Hapi.Server()

server.connection({ port })

const initHandlebars = (server, options, next) => {
  server.views({
    engines: { html: Handlebars },
    relativeTo: __dirname,
    path: 'templates',
    isCached: false
  })
  next()
}

initHandlebars.attributes = {
  name: 'initHandlebars'
}

server.register([
  Inert,
  Vision,
  initHandlebars,
  githubAuth,
  jobsEndpoint,
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
