import '../styles/Task.css';
import React, { useState, useEffect } from 'react';

function TaskContent() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        taskName: '',
        taskDescription: '',
        taskDate: '',
        taskStatus: 'Complete',
    });
    const [filters, setFilters] = useState({
        statusFilter: 'Todos',
        dateFilter: ''
    });

    useEffect(() => {
        // Cargar las tareas de localStorage al iniciar el componente
        const loadedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(loadedTasks);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let currentDate = new Date().toISOString().split('T')[0];
        if (newTask.taskDate < currentDate) {
            alert("La fecha de la tarea no puede ser anterior a la fecha actual.");
            return;
        }
        const updatedTasks = [...tasks, { ...newTask, id: tasks.length + 1 }];
        setTasks(updatedTasks);
        setNewTask({ taskName: '', taskDescription: '', taskDate: '', taskStatus: 'Incomplete' });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const completeTask = (taskId) => {
        const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, taskStatus: 'Complete' } : task);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const getFilteredTasks = () => {
        return tasks.filter(task => {
            const statusMatch = filters.statusFilter === 'Todos' || task.taskStatus === filters.statusFilter;
            const dateMatch = !filters.dateFilter || task.taskDate === filters.dateFilter;
            return statusMatch && dateMatch;
        });
    };

    return (
      <div className='Gestor'>
          <div className='title'>
            <h2 className="animate__animated animate__fadeIn">TASK GESTOR</h2>
            <i className="fa-solid fa-list-check"></i>
          </div>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  placeholder="Task name"
                  value={newTask.taskName}
                  onChange={handleInputChange}
              />
              <textarea
                  id="taskDescription"
                  name="taskDescription"
                  placeholder="Task Description"
                  value={newTask.taskDescription}
                  onChange={handleInputChange}
              />
              <input
                  type="date"
                  id="taskDate"
                  name="taskDate"
                  value={newTask.taskDate}
                  onChange={handleInputChange}
                  className='date'
              />
              <select
                  id="taskStatus"
                  name="taskStatus"
                  value={newTask.taskStatus}
                  onChange={handleInputChange}
              >
                  <option value="Incomplete">Incomplete</option>
                  <option value="Complete">Complete</option>
              </select>
              <button type="submit"><i className="fa-regular fa-square-plus"></i></button>
              <p className='countask'>Total tasks = {tasks.length}</p>
          </form>

          <div className='filter'>
              <label htmlFor="statusFilter">Filter by status:</label>
              <select
                  id="statusFilter"
                  name="statusFilter"
                  value={filters.statusFilter}
                  onChange={handleFilterChange}
              >
                  <option value="Todos">All</option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Complete">Complete</option>
              </select>

              <label htmlFor="dateFilter">Filtrar por fecha:</label>
              <input
                  type="date"
                  id="dateFilter"
                  name="dateFilter"
                  value={filters.dateFilter}
                  onChange={handleFilterChange}
              />
          </div>

          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody className='task-table'>
                  {getFilteredTasks().map((task) => (
                      <tr key={task.id} className='tr-td'>
                          <td>{task.id}</td>
                          <td>{task.taskName}</td>
                          <td>{task.taskDescription}</td>
                          <td>{task.taskDate}</td>
                          <td>{task.taskStatus}</td>
                          <td>
                              <button onClick={() => deleteTask(task.id)}>⛔</button>
                              <button onClick={() => completeTask(task.id)}>✅</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default TaskContent;
