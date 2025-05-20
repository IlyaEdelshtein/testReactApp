import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addTask, removeTask, updateTask } from '../features/todoSlice';

const TodoPage: React.FC = () => {
  const tasks = useAppSelector(state => state.todo.tasks);
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTask(text.trim()));
      setText('');
    }
  };

  const handleToggle = (id: number, completed: boolean) => {
    dispatch(updateTask({ id, completed: !completed }));
  };

  const handleChange = (id: number, newText: string) => {
    dispatch(updateTask({ id, text: newText }));
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
            <button onClick={() => dispatch(removeTask(task.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
