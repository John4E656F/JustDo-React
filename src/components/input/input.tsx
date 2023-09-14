import { useState, useRef } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { AiOutlineDownSquare } from 'react-icons/ai';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addTask } from '../../store/taskSlice';
import { v4 as uuidv4 } from 'uuid';

export const Input = () => {
  const [taskText, setTaskText] = useState('');
  const [severity, setSeverity] = useState('normal');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleSeverityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeverity(e.target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      task: taskText,
      severity: severity,
      done: false,
    };

    // Dispatch the addTask action with the newTask object
    dispatch(addTask(newTask));

    setTaskText('');
    setSeverity('normal');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div>
      <div className='inputContainer'>
        <div className='inputLeft'>
          <button type='submit' onClick={handleAddTask}>
            <HiOutlinePlusCircle className='PlusCircle' />
          </button>
          <input type='text' placeholder='Add a task' value={taskText} onChange={handleInputChange} onKeyDown={handleKeyDown} ref={inputRef} />
        </div>
        <div className='inputRight'>
          <p>Set severity</p>
          <AiOutlineDownSquare />
        </div>
      </div>
    </div>
  );
};
