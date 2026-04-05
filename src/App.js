import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

function App() {

  const [todo, setTodo] = useState([]);

  const showNotification = (e) => {
    e.preventDefault();

    let name = e.target.form.todoname.value.trim();

    //empty check
    if (!name) {
      toast.error("Please fill the box ❌");
      return;
    }

    //duplicate check
    if (todo.includes(name)) {
      toast.warning("This todo is already saved ⚠️");
      return;
    }

    //add todo
    setTodo([...todo, name]);
    toast.success("Successfully Saved 🚀");

    // clear input
    e.target.form.todoname.value = "";
  };

  //delete function
  const deleteTodo = (index) => {
    const updated = todo.filter((_, i) => i !== index);
    setTodo(updated);
    toast.info("Task deleted 🗑️");
  };

  return (
    <>
      <h1 className='text-3xl text-center w-[60vw] h-16 py-4 m-auto my-3 rounded-lg bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500'>
        TODO LIST
      </h1>

<form className='
  flex flex-col 
  sm:flex-row 
  items-center justify-center
  m-auto my-2 
  text-center 
  sm:w-[80vw]
  md:w-[60vw] 
  min-h-[300px] sm:h-[80vh] md:h-96
  rounded-3xl 
  bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500
'>        
        <label className='flex m-auto my-3'>
          <input
            type='text'
            name='todoname'
            placeholder='Add your work'
            className='text-center sm:my-3 my-5 mx-3 rounded-2xl p-2'
          />

          <button
            type='button'
className='bg-green-500 px-3 py-2 sm:px-2 sm:py-2 md:px-4 md:py-5 mx-1 sm:mx-0 md:mx-1 rounded-2xl font-semibold text-white'            onClick={showNotification}
          >
            Save
          </button>
        </label>


      <div className='w-[60vw] m-auto rounded-2xl min-h-40 bg-transparent p-4 todo'>
        <ul>
          {todo.map((value, index) => (
            <Todolist
            key={index}
            value={value}
            index={index}
            deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
          </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;

function Todolist({ value, index, deleteTodo }) {

  return (
    <li className='rounded-2xl hover:bg-cyan-400 flex justify-between p-2 '>
      {value}
      <span
        className="cursor-pointer font-bold"
        onClick={() => deleteTodo(index)}
      >
        &times;
      </span>
    </li>
  );
}