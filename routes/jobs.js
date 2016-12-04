const mockData = require('../fake_jobs.js');
const getJobs = require('../db/getJobs');
const client = require('../db/db_init');

const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/jobs',
    handler: (request, reply) => {
      getJobs(client, (err, jobs) => {
        reply.view('jobs', { data: jobs, credentails: getCredentials(request) })
      })
    }
  })

  next()
}

register.attributes = {
  name: 'jobsBoardEndpoint'
}

module.exports = register
