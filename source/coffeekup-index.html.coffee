doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    link rel: 'stylesheet', href: '/stylesheets/app.css'
    style '''
      body {font-family: sans-serif}
      header, nav, section, footer {display: block}
    '''
    script src: '/javascripts/jquery.js'
    coffeescript ->
      $ ->
        alert 'Alerts are so annoying...'
  body ->
    header ->
      h1 @title or 'Untitled'
      nav ->
        ul ->
          (li -> a href: '/', -> 'Home') unless @path is '/'
          li -> a href: '/chunky', -> 'Bacon!'
    section ->

    footer ->