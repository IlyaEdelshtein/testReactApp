import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addTask, removeTask, updateTask, setTasks } from '../features/todoSlice';

const API_URL = 'http://localhost:4000';

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
    <div>
      <h2>Todo List</h2>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id, task.completed)}
            />
            <input
              value={task.text}
              onChange={e => handleChange(task.id, e.target.value)}
            />
            <button onClick={() => handleRemove(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
