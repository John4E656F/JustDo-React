import { useState, useRef } from 'react';
import { BsCircle, BsCheckCircleFill, BsCircleFill, BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineDownSquare } from 'react-icons/ai';
import { Severity } from '../';
import { Task, Modal } from '../../types';

export const Todo = ({ updateTaskStatus, id, text, done, severity }: Task, { isModalOpen, openModal, closeModal }: Modal) => {
  const [isTaskHovered, setIsTaskHovered] = useState(false);
  const [isCheckHovered, setIsCheckHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [editSeverity, setEditSeverity] = useState('normal');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseEnterTask = () => {
    setIsTaskHovered(true);
  };

  const handleMouseLeaveTask = () => {
    setIsTaskHovered(false);
  };

  const handleMouseEnterCheck = () => {
    setIsCheckHovered(true);
  };

  const handleMouseLeaveCheck = () => {
    setIsCheckHovered(false);
  };

  const handleTaskClick = () => {
    // Update the task's done status here
    const newStatus = !done;
    updateTaskStatus(id, newStatus);
    window.location.reload();
  };

  const handleEnterEditMode = () => {
    setTaskText(text);
    setIsEditMode(true);
    inputRef.current?.focus();
  };

  const handleSaveEdit = () => {
    // Update the task's text and severity in the local storage here
    // For example, you can use localStorage.getItem() to retrieve the existing tasks, update the task data, and then use localStorage.setItem() to save the updated tasks
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    const updatedTasks = existingTasks.map((taskItem) => {
      if (taskItem.id === id) {
        return {
          ...taskItem,
          text: taskText,
          severity: editSeverity,
        };
      } else {
        return taskItem;
      }
    });

    // Save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Exit edit mode
    setIsEditMode(false);
    window.location.reload();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  const handleSeverityChange = (severity: string) => {
    setEditSeverity(severity);
    closeModal();
  };

  return (
    <div className='container'>
      <div className='left'>
        {done ? (
          <BsCheckCircleFill className='PlusCircle done' />
        ) : (
          <button onMouseEnter={handleMouseEnterCheck} onMouseLeave={handleMouseLeaveCheck} onClick={handleTaskClick}>
            {isCheckHovered ? <BsCheckCircleFill className='PlusCircle' /> : <BsCircle className='PlusCircle' />}
          </button>
        )}
      </div>
      {done ? (
        <div className='rightDone'>
          <div className='taskContainer'>
            <div className='taskDone'>
              <h2>{text}</h2>
              <BsCircleFill className='severity red' />
            </div>
            <p>{severity}</p>
          </div>
        </div>
      ) : (
        <div className={isEditMode ? 'rightEditMode' : 'right'} onMouseEnter={handleMouseEnterTask} onMouseLeave={handleMouseLeaveTask}>
          <div className='taskContainer'>
            {isEditMode ? (
              <>
                <div className='task'>
                  <input
                    type='text'
                    placeholder='Add a task'
                    value={taskText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                  />
                </div>
                <div className='inputRight'>
                  <p>{severity ? severity : 'Set severity'}</p>
                  <button onClick={openModal} ref={triggerRef}>
                    <AiOutlineDownSquare />
                  </button>
                  <Severity isModalOpen={isModalOpen} triggerRef={triggerRef} handleSeverityChange={handleSeverityChange} />
                </div>
              </>
            ) : (
              <>
                <div className='task'>
                  <h2>{text}</h2>
                  <BsCircleFill className='severity red' />
                </div>
                <p>{severity}</p>
              </>
            )}
          </div>
          {isEditMode ? (
            <BsFillPencilFill className='hover' onClick={handleSaveEdit} />
          ) : isTaskHovered ? (
            <BsFillPencilFill className='hover' onClick={handleEnterEditMode} />
          ) : null}
        </div>
      )}
    </div>
  );
};
