import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Timer } from './components/Timer'
import { Todo } from './components/Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Timer/>

      </div>
      <div>
        <Todo/>
      </div>
    </>
  )
}

export default App
