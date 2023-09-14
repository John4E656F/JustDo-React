import { useState } from 'react';
import { BsCircle, BsCheckCircleFill, BsCircleFill, BsFillPencilFill } from 'react-icons/bs';
import { Task } from '../../types';

export const Todo = ({ updateTaskStatus, id, text, done, severity }: Task) => {
  const [isTaskHovered, setIsTaskHovered] = useState(false);
  const [isCheckHovered, setIsCheckHovered] = useState(false);

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
        <div className='right' onMouseEnter={handleMouseEnterTask} onMouseLeave={handleMouseLeaveTask}>
          <div className='taskContainer'>
            <div className='task'>
              <h2>{text}</h2>
              <BsCircleFill className='severity red' />
            </div>
            <p>{severity}</p>
          </div>
          {isTaskHovered && <BsFillPencilFill className='hover' />}
        </div>
      )}
    </div>
  );
};

{
  /* <div className='inputContainer'>
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
</div> */
}
