import moment from 'moment';
import { useState, useEffect } from 'react';
import Task from './Task'

export default function App() {

  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState([])


  const handleSubmit = e => {
    e.preventDefault();
    if(title !== '') {
      setTasks([...tasks, { id: Math.random(36).toString(), title, date: moment().valueOf(), important: false}])
      setTitle('')
      saveTasks()
    } else alert('Please enter some text...')
  }

  const handleDelete = id => {
    setTasks(tasks.filter(task => task.id !== id))
    saveTasks()
  }

  const handleToggle = id => {
    setTasks(tasks.map(task => task.id === id ? { ...task, important: !task.important } : task))
    saveTasks()
  }

  const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks))

  useEffect(() => {
    const tempTasks = JSON.parse(localStorage.getItem('tasks'))
    if(tempTasks) setTasks(tempTasks)
  }, [])

  return (
    <div className="container">
      <main>
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title..." value={title} onChange={e => setTitle(e.target.value)} />
          <button type="submit">Add</button>
        </form>

        <div className="taskContainer">
          { tasks.map(task => <Task task={task} deleteTask={handleDelete} toggleImportant={handleToggle} />) }
        </div>
      </main>
    </div>
  );
}