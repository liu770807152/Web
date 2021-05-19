const proxy = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    // all request that starts with /api1 will trigger proxy config
    proxy('/api', {
      target: 'http://localhost:5000', // the address to send the request to
      changeOrigin: true, // modify "Host" field to http://localhost:5000 in the head of receiving request from the server
      pathRewrite: {'^/api': ''} // remove the prefix of the request and ensure the request address is correct (mandatory!!!)
    })
  )
}
