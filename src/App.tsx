import { Input, Todo } from './components';
import { HiCheck, HiOutlineTrash } from 'react-icons/hi';
import { Task } from './types';
import './App.css';

function App() {
  const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  console.log(existingTasks);
  // Example of an updateTaskStatus function in your parent component
  const updateTaskStatus = (taskId: string, newStatus: boolean) => {
    // Retrieve the existing tasks from local storage
    const existingTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Find the task by ID
    const updatedTasks: Task[] = existingTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: newStatus };
      }
      return task;
    });

    // Update the local storage with the updated tasks
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Update your component state with the updated tasks (if needed)
    // setTasks(updatedTasks);
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
        <Input />
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
        <div className='clear'>
          <HiOutlineTrash />
          <p> Clear all Done tasks</p>
        </div>
      </div>
      <section>
        {existingTasks &&
          existingTasks.map(
            (task: Task) => task.done && <Todo key={task.id} id={task.id} text={task.text} done={task.done} severity={task.severity} />,
          )}
      </section>
    </>
  );
}

export default App;
