import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Product from './components/Product'
import FrontendHeavyPagination from './components/FrontendHeavy'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* with limit and offset pagination */}
      {/* <Product/>    */}

      {/* with limit only pagination */}
      <FrontendHeavyPagination/>
    </>
  )
}

export default App
