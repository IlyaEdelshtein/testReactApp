import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addTask, removeTask, updateTask, setTasks } from '../features/todoSlice';
import styled from 'styled-components';
import { Button, TextField, Checkbox } from '@mui/material';

const API_URL = 'http://localhost:4000';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;


const TaskItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  list-style: none;
`;

const List = styled.ul`
  padding: 0;
`;

const TodoPage: React.FC = () => {
  const tasks = useAppSelector(state => state.todo.tasks);
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => dispatch(setTasks(data)))
      .catch(console.error);
  }, [dispatch]);

  const handleAdd = async () => {
    if (text.trim()) {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      });
      const newTask = await res.json();
      dispatch(addTask(newTask));
      setText('');
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    dispatch(updateTask({ id, completed: !completed }));
  };

  const handleChange = async (id: number, newText: string) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText }),
    });
    dispatch(updateTask({ id, text: newText }));
  };

  const handleRemove = async (id: number) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    dispatch(removeTask(id));
  };

  return (
    <Container>
      <h2>Todo List</h2>
      <div>
        <TextField
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add task"
          size="small"
          sx={{ m: 1 }}
        />
        <Button variant="contained" onClick={handleAdd} sx={{ m: 1 }}>
          Add
        </Button>
      </div>
      <List>
        {tasks.map(task => (
          <TaskItem key={task.id}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggle(task.id, task.completed)}
              sx={{ mr: 1 }}
            />
            <TextField
              value={task.text}
              onChange={e => handleChange(task.id, e.target.value)}
              size="small"
              sx={{ mr: 1 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemove(task.id)}
            >
              Remove
            </Button>
          </TaskItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoPage;
