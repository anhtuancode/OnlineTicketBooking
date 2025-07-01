import './App.css'
import { Link } from 'react-router-dom'
import Navbar from './components/navbar'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <ul>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </>
  )
}

export default App
