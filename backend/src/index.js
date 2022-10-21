const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/lists', (req, res) => {
  res.json({
    '0000000001': {
      id: '0000000001',
      title: 'First List',
      todos: ['First todo of first list!'],
    },
    '0000000002': {
      id: '0000000002',
      title: 'Second List',
      todos: ['First todo of second list!'],
    },
  })
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
