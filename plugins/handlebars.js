const register = (server, options, next) => {
  server.views({
    engines: { html: Handlebars },
    relativeTo: './templates',
    path: '.',
    layout: 'default',
    layoutPath: 'layout',
    helpersPath: 'helpers',
    partialsPath: 'partials',
    isCached: false
  })
  next()
}

register.attributes = {
  name: 'initHandlebars'
}

module.exports = register;
