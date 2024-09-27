import express from 'express'
import payload from 'payload'

require('dotenv').config()
const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })


  // Don't start server for Vercel
  if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
      console.log('Server started on http://localhost:3000')
    })
  }
}

start()

export default app