const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const { connectDB } = require('./database/models/index') // Шлях може відрізнятись залежно від структури

const PORT = 5000

// Підключення до бази даних перед запуском сервера
connectDB().then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server started on port ${PORT}`)
    console.log(`🔗 http://localhost:${PORT}`)
  })
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err)
  process.exit(1)
})