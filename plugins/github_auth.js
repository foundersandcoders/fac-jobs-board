const JWT = require('jsonwebtoken')
const hapiAuthGithub = require('hapi-auth-github')
const hapiAuthJWT = require('hapi-auth-jwt2')
const request = require('request')

const getOrgsRequestOptions = token => ({
  url: `https://api.github.com/user/orgs`,
  headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/json',
      'User-Agent': 'facster-jobs'
    },
})


const authHandler = (req, reply, tokens, profile) => {
  if(profile) {
    request(getOrgsRequestOptions(tokens.access_token), (err, res, body) => {
      if (err)
        return reply("Sorry, something went wrong, please try again.").code(401)

      const username = profile.login;
      const isFac = JSON.parse(body)
        .filter(org => org.login === 'foundersandcoders')
        .length >= 1

      if (isFac) {
        const token = JWT.sign({ isFac, username }, process.env.JWT_SECRET);
        reply.redirect('/')
          .state('facToken', token, { path: '/' })
      } else {
        const message =
          "You need to be a member of founders and coders to log into this site"
        return reply(message).code(401)
      }
    })
  } else {
    return reply("Sorry, something went wrong, please try again.").code(401)
  }
}

const validateJWT = (decoded, request, cb) => {
 cb(null, decoded.isFac)
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

const getCredentials = request =>
  JWT.decode(request.state.facToken, process.env.JWT_SECRET)

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

    server.state('facToken', {
      ttl: null,
      isSecure: false,
      isHttpOnly: false,
    })

    server.ext("onPreResponse", function (request, reply) {
      const responseOutput = request.response.output

      if (responseOutput && responseOutput.statusCode === 401)
        return reply.redirect('/login')

      reply.continue()
    })
  })
  next()
}

register.attributes = {
  name: 'authentication'
}

module.exports = { githubAuth: register, getCredentials }
