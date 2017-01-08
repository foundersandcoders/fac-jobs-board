const { getCredentials } = require('../plugins/github_auth.js')

const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/list-job',
    config: { auth: false },
    handler: (request, reply) => {
      reply.view('list-job', { credentials: getCredentials(request) })
    }
  })

  next()
}

register.attributes = {
  name: 'listJobEndpoint'
}

module.exports = register
