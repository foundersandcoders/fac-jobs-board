function getJobs (client, callback) {

      jobQuery = 'SELECT * FROM jobs';

    client.query(jobQuery, (error, response) => {

        if (error) {
            console.error("`jobQuery`", error);
            return callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getJobs;
