import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const COLOR = {
  pending: 'grey',
  completed: 'green'
}

const ListItem = ({ item, onUpdateStatus, onDel }) => {

  const handleUpdate = (e) => {
    const newStatus = e.target.checked ? 'completed' : 'pending'
    onUpdateStatus(item.id, newStatus)
  }

  const handleDel = () => {
    onDel(item.id)
  }
  const isCompleted = item.status === 'completed'
  return <div className='list-item'>
    <div >
      <input onChange={handleUpdate} type='checkbox' />
      <span style={{ marginLeft: 10, textDecoration: isCompleted ? 'line-through' : '', color: COLOR[item.status] }}>{item.name}</span>
    </div>
    <button onClick={handleDel} className='btn btn-delete'>Delete</button>
  </div>
};


const FormInput = ({ onAdd }) => {
  const [name, setName] = useState('')

  const handleAdd = () => {
    if (name === '') {
      alert('Please enter task name')

      return;
    }
    const newTask = {
      id: Date.now(),
      name,
      status: 'pending'
    }

    onAdd(newTask)
    setName('')
  }

  const handleKeyDown = (e) => {

    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return <div className='header'>
    <input placeholder='New task at here' onKeyDown={handleKeyDown} value={name} onChange={e => setName(e.target.value)} type='text' />
    <button onClick={handleAdd} className='btn'>Add</button>
  </div>

}


function App() {
  const [tasks, setTasks] = useState([])
  const [filtered, setFiltered] = useState([])
  const [active, setActive] = useState('all')

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => {
      return [newTask, ...prevTasks]
    })
    setActive('all')
  }

  console.log(tasks);

  const handleFilter = (status) => {

    if (status === 'all') {
      setFiltered(tasks)
    }

    const newFilters = tasks.filter((item) => item.status === status);

    setFiltered(newFilters)
    setActive(status)
  }

  const handleClear = () => {

    setTasks([])
  }

  const handleUpdateStatus = (id, status) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);
    const task = tasks[taskIndex];
    task.status = status;

    const newTasks = [...tasks];
    newTasks.splice(taskIndex, 1, task);

    setTasks(newTasks)
  }

  const handleDel = (id) => {
    // const newTasks = tasks.filter((item) => item.id !== id)

    console.log(id);
    const newTasks = [...tasks];
    const taskIndex = tasks.findIndex((item) => item.id === id);

    newTasks.splice(taskIndex, 1);

    setTasks(newTasks)
  }


  useEffect(() => {
    setFiltered(tasks)
  }, [tasks])

  return (
    <div className='App'>
      <div className='AppToDo'>
        <FormInput onAdd={handleAddTask} />
        <div className='filter'>
          <div className='left'>
            <button onClick={() => handleFilter('all')} className={`btn ${active === 'all' && 'active'}`}>All</button>
            <button onClick={() => handleFilter('pending')} className={`btn ${active === 'pending' && 'active'}`}>Pending</button>
            <button onClick={() => handleFilter('completed')} className={`btn ${active === 'completed' && 'active'}`}>Completed</button>
          </div>
          <button onClick={handleClear} className='btn btn-clear'>Clear All</button>
        </div>

        <div className='list'>
          {
            filtered.map((item) => <ListItem onDel={handleDel} onUpdateStatus={handleUpdateStatus} key={item.id} item={item} />)
          }
        </div>
      </div>
    </div>
  )
}

export default App
