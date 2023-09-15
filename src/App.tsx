import { useState } from 'react';
import { Input, Todo } from './components';
import { HiCheck, HiOutlineTrash } from 'react-icons/hi';
import { Task } from './types';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  const updateTaskStatus = (taskId: string, newStatus: boolean) => {
    const existingTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

    const updatedTasks: Task[] = existingTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: newStatus };
      }
      return task;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteDoneTasks = () => {
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    const filteredTasks = existingTasks.filter((task: Task) => !task.done);

    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    window.location.reload();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header>
        <div className='logo'>
          <h1>Just Do</h1>
          <HiCheck />
        </div>
        <h4>Dead Simple To-do App</h4>
      </header>
      <section>
        <Input isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} openModal={openModal} closeModal={closeModal} />
        {existingTasks &&
          existingTasks.map(
            (task: Task) =>
              !task.done && (
                <Todo updateTaskStatus={updateTaskStatus} key={task.id} id={task.id} text={task.text} done={task.done} severity={task.severity} />
              ),
          )}
      </section>
      <div className='spacer'>
        <div className='horizontalBar' />
        <div className='clear' onClick={deleteDoneTasks}>
          <HiOutlineTrash />
          <p> Clear all Done tasks</p>
        </div>
      </div>
      <section>
        {existingTasks &&
          existingTasks.map(
            (task: Task) =>
              task.done && (
                <Todo updateTaskStatus={updateTaskStatus} key={task.id} id={task.id} text={task.text} done={task.done} severity={task.severity} />
              ),
          )}
      </section>
    </>
  );
}

export default App;
