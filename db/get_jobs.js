const allJobsQuery = 'SELECT * FROM jobs'

const getJobs = (client, callback) => {
  client.query(allJobsQuery, (error, response) => {
    if (error) {
      console.error('`jobQuery`', error)
      return callback(error)
    }

    callback(null, response.rows)
  })
}

module.exports = getJobs
