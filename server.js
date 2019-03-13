const http = require('http')
const app = require('./src')

let port = process.env.PORT || 4400
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error', () => {
    console.error(`Error listening on ${port}`)
})
server.on('listening', () => {
    console.log(`Listening on localhost:${port}`)
})
