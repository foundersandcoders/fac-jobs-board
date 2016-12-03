const server = require('./server');

server.start(err => {
  console.log(`server started on port ${server.info.port}`);
})
