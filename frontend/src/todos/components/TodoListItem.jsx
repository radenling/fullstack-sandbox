import React, { useState, useEffect, useRef } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

export const TodoListItem = ({ initialTodo, index, updateTodo, deleteTodo }) => {
  const [todo, setTodo] = useState(initialTodo)
  const firstRender = useRef(true)

  let autosaveTimer = null

  const startSaveTimer = (action) => {
    autosaveTimer = setTimeout(action, 1000)
  }

  const resetSaveTimer = () => {
    if(autosaveTimer === null)
      return;

    clearTimeout(autosaveTimer)
    autosaveTimer = null
  }

  const isTimerRunning = () => autosaveTimer !== null

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return () => {}
    }

    resetSaveTimer();
    startSaveTimer(() => updateTodo(todo))
    return resetSaveTimer
  }, [todo.name])

  // Saves the todo list immediately if changes have been made to the
  // current text field.
  const immediateUpdate = (todo) => {
    if (!isTimerRunning())
      return

    resetSaveTimer()
    updateTodo(todo)
  }

  const toggleDone = () => {
    setTodo((todo) => {
      const nextTodo = { ...todo, done: !todo.done }
      updateTodo(nextTodo)
      return nextTodo
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ margin: '8px' }} variant='h6'>
        {index + 1}
      </Typography>
      <Button
        sx={{ minWidth: '48px' }}
        color='secondary'
        onClick={() => toggleDone()}
      >
        {todo.done ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}
      </Button>
      <TextField
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        label='What to do?'
        value={todo.name}
        onChange={(event) => {
          setTodo({...todo, name: event.target.value})
        }}
        onBlur={() => immediateUpdate(todo)}
      />
      <Button
        sx={{ margin: '8px' }}
        size='small'
        color='secondary'
        onClick={deleteTodo}
      >
        <DeleteIcon />
      </Button>
    </div>
  )
}
