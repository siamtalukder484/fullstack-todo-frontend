import { useState } from 'react'
import CreateTodo from './pages/CreateTodo'
import TodoCard from './pages/TodoCard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='main'>
        <div className='main_body'>
            <TodoCard/>
        </div>
        <div className='create_body'>
            <CreateTodo/>
        </div>
      </div>
    </>
  )
}

export default App
