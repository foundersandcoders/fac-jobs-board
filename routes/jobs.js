const mockData = require('../fake_jobs.js');

const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/jobs',
    handler: (request, reply) => {
      reply.view('jobs', { data: mockData })
    }
  })

  next()
}

register.attributes = {
  name: 'jobsBoardEndpoint'
}

module.exports = register
