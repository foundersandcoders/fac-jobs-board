const { getCredentials } = require('../plugins/github_auth.js')

const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/',
    config: { auth: false },
    handler: (request, reply) => {
      reply.view('index', { credentials: getCredentials(request) })
    }
  })

  next()
}

register.attributes = {
  name: 'homepageEndpoint'
}

module.exports = register
