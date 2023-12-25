import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchPage } from './components/SearchPage'
import { SearchPage2 } from './components/SearchPage2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <SearchPage/> */}
    <SearchPage2/>
      
    </>
  )
}

export default App
