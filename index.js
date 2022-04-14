const express = require('express')
const bodyParser = require('body-parser')
const { response } = require('express')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API'})
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/journalentries/:user_id_fkey', db.getJournalEntriesByUser)
app.post('/journalentries/:user_id_fkey', db.createJournalEntry)

app.get('/recoverycapital/:user_id_fkey', db.getRecoveryCapitalByUser)
app.put('/recoverycapital/:user_id_fkey', db.updateRecoveryCapital)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
