const server = require('./src')

const { PORT } = process.env
const port = PORT

console.log('Server: ', port)

server({ port  })
