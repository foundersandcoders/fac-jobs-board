const JWT = require('jsonwebtoken')
const hapiAuthGithub = require('hapi-auth-github')
const hapiAuthJWT = require('hapi-auth-jwt2')

const authHandler = (req, reply, tokens, profile) => {
  if(profile) {
    // get orgs
    const token = JWT.sign(profile, process.env.JWT_SECRET);

    return reply.redirect('/jobs')
      .state('token', token, { path: '/' })
    }
  else {
    return reply("Sorry, something went wrong, please try again.").code(401);
  }
}

const validateJWT = (decoded, request, cb) => {
 // check org here
 cb(null, true)
}

authOpts = {
  key: process.JWT_SECRET,
  verifyFunc: validateJWT,
  verifyOptions: { algorithms: [ 'HS256' ] }
}

const githubAuth = {
  register: hapiAuthGithub,
  options: {
    handler: authHandler,
    SCOPE: 'user'
  }
}

const register = (server, options, next) => {
  server.register([hapiAuthJWT, githubAuth], err => {
    if (err) throw err

    server.auth.strategy('jwt', 'jwt', true, authOpts);

    server.route({
      method: 'GET',
      path: '/login',
      config: { auth: false },
      handler: (request, reply) => {
        reply.redirect(hapiAuthGithub.login_url())
      }
    })

    server.state('token', {
      ttl: null,
      isSecure: false,
      isHttpOnly: false,
    })
  })
  next()
}

register.attributes = {
  name: 'authentication'
}

module.exports = register
