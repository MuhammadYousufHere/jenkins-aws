import express from 'express'

const app = express()

const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World - v3 !')
})

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`)
})
