const Hapi = require('hapi')
const Inert = require('inert')
const Handlebars = require('handlebars')
const Vision = require('vision')

const jobsEndpoint = require('./routes/jobs.js');
const listJobEndpoint = require('./routes/list-job.js');

const port = process.env.PORT || 4000

const server = new Hapi.Server()

server.connection({ port })

server.register([Inert, Vision, jobsEndpoint, listJobEndpoint], err => {
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
  });


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
