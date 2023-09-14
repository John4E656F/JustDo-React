import { Input, Todo } from './components';
import { HiCheck } from 'react-icons/hi';

import './App.css';

function App() {
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
        <Todo />
      </section>
    </>
  );
}

export default App;
