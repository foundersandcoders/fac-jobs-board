const server = require('./server')

server.start(err => {
  if (err) throw err
  console.log(`server started on port ${server.info.port}`)
})
