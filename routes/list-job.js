const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/list-job',
    config: { auth: false },
    handler: (request, reply) => {
      reply.view('list-job')
    }
  })

  next()
}

register.attributes = {
  name: 'listJobEndpoint'
}

module.exports = register
