import React, { useState } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TodoListItem } from './TodoListItem'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const save = (todos) => {
    saveTodoList(todoList.id, { todos })
    return todos
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <TodoListItem
              key={index}
              initialTodo={todo}
              index={index}
              updateTodo={(value) => {
                setTodos(save([
                  ...todos.slice(0, index),
                  value,
                  ...todos.slice(index + 1),
                ]))
              }}
              deleteTodo={() => {
                setTodos(save([
                  ...todos.slice(0, index),
                  ...todos.slice(index + 1),
                ]))
              }}
            />
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => { setTodos(save([...todos, {name: '', done: false}])) }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
