const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/list-job',
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
