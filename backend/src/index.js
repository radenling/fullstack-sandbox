const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const todos = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [{
      name: 'First todo of first list!',
      done: false,
    }],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [{
      name: 'First todo of second list!',
      done: true,
    }],
  },
}

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/lists', (req, res) => {
  res.json(todos)
})

app.put('/lists/:listId', (req, res) => {
  const listId = req.params.listId
  if (todos[listId]) {
    todos[listId] = req.body
    res.status(200).send()
  } else {
    res.status(404).send('List not found')
  }
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
