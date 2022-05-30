const express = require('express')
const faulty = require('express-faulty')
const app = express()

// Heroku dynamically sets a port
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

const faultMiddleware = faulty({
  enabled: true,
  faultType: 'DOWN',
  afterRequestCount: 1
})

app.get('/health', faultMiddleware, (req, res) => {
  res.send('ok')
})

app.get('/version', (req, res) => {
  res.send('new version? 1')
})

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log('server indeedy did start at port 5000')
})
