const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/',
    config: { auth: false },
    handler: (request, reply) => {
      reply.view('index')
    }
  })

  next()
}

register.attributes = {
  name: 'homepageEndpoint'
}

module.exports = register
