import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

const fetchTodoLists = () => {
  return fetch('http://localhost:3001/lists')
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      return response.json()
    })
    .catch((error) => {
      console.error(error)
    })
}

const saveListToServer = (id, todoList) => {
  return fetch(`http://localhost:3001/lists/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoList),
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
    })
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            const listToUpdate = todoLists[id]
            const updatedList = { ...listToUpdate, todos }
            saveListToServer(id, updatedList)
              .then(() => setTodoLists({
                ...todoLists,
                [id]: updatedList,
              }))
              .catch(error => alert(error))
          }}
        />
      )}
    </Fragment>
  )
}
