import { useState, useRef } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { AiOutlineDownSquare } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { Severity } from '../';
import { Modal } from '../../types';

export const Input = ({ isModalOpen, openModal, closeModal }: Modal) => {
  const [taskText, setTaskText] = useState('');
  const [severity, setSeverity] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleSeverityChange = (severity: string) => {
    setSeverity(severity);
    closeModal();
  };

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      text: taskText,
      severity: severity,
      done: false,
    };

    // Retrieve existing tasks from localStorage
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Add the new task
    existingTasks.push(newTask);

    // Update tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    // Clear input fields and update your component state as needed
    setTaskText('');
    setSeverity('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
    window.location.reload();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className='inputContainer'>
      <div className='inputLeft'>
        <button type='submit' onClick={handleAddTask}>
          <HiOutlinePlusCircle className='PlusCircle' />
        </button>
        <input type='text' placeholder='Add a task' value={taskText} onChange={handleInputChange} onKeyDown={handleKeyDown} ref={inputRef} />
      </div>
      <div className='inputRight'>
        <p>{severity ? severity : 'Set severity'}</p>
        <button onClick={openModal} ref={triggerRef}>
          <AiOutlineDownSquare />
        </button>
        <Severity isModalOpen={isModalOpen} triggerRef={triggerRef} handleSeverityChange={handleSeverityChange} />
      </div>
    </div>
  );
};
