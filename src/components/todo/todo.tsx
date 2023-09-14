import { useState } from 'react';
import { BsCircle, BsCheckCircleFill, BsCircleFill, BsFillPencilFill } from 'react-icons/bs';

export const Todo = () => {
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

  return (
    <div className='container'>
      <div className='left'>
        <button onMouseEnter={handleMouseEnterCheck} onMouseLeave={handleMouseLeaveCheck}>
          {isCheckHovered ? <BsCheckCircleFill className='PlusCircle' /> : <BsCircle className='PlusCircle' />}
        </button>
      </div>
      <div className='right' onMouseEnter={handleMouseEnterTask} onMouseLeave={handleMouseLeaveTask}>
        <div className='taskContainer'>
          <div className='task'>
            <h2> Task herefqzfqz fqzf qzf</h2>
            <BsCircleFill className='severity red' />
          </div>
          <p>Severity</p>
        </div>
        {isTaskHovered && <BsFillPencilFill className='pen' />}
      </div>
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
