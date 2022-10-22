import React, { useState, useEffect, useRef } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const TodoListItem = ({ startName, index, updateTodo, deleteTodo }) => {
  const [name, setName] = useState(startName)
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

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return () => {}
    }

    resetSaveTimer();
    startSaveTimer(() => updateTodo(name))
    return resetSaveTimer
  }, [name])

  const immediateUpdate = (name) => {
    resetSaveTimer()
    updateTodo(name)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ margin: '8px' }} variant='h6'>
        {index + 1}
      </Typography>
      <TextField
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        label='What to do?'
        value={name}
        onChange={(event) => {
          setName(event.target.value)
        }}
        onBlur={() => immediateUpdate(name)}
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
