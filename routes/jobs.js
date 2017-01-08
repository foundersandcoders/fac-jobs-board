const getJobs = require('../db/getJobs')
const client = require('../db/db_init')
const { getCredentials } = require('../plugins/github_auth.js')

const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/jobs',
    handler: (request, reply) => {
      getJobs(client, (err, jobs) => {
        if (err) return reply(err)
        reply.view('jobs', { data: jobs, credentials: getCredentials(request) })
      })
    }
  })

  next()
}

register.attributes = {
  name: 'jobsBoardEndpoint'
}

module.exports = register
