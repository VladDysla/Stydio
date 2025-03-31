const http = require('http')
const app = require('./app')
const server = http.createServer(app)

const PORT = 5000

server.listen(PORT,'0.0.0.0', ()=>{
    console.log(`Server started on port ${PORT}`);
}) // Нє ну ти крутий ріл)

