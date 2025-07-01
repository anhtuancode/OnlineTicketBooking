import './App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <h1>React Router Dom</h1>
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
