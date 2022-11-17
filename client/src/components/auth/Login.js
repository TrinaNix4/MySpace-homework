import { useState, useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState('test2@test.com')
  const [password, setPassword] = useState('123456')
  const auth = useContext(AuthContext)
  //not needed but nice for UX
  //const [confirmPassword, setConfirmPassword] = useState('')
  
  

  const handleSubmit = (e) => {
    e.preventDefault()
    auth.handleLogin({email, password})
  }
  
  return (
    <div>
    {/* form with 2 inputs with handleSubmit 
    to prevent the default */}
      <h1>Welcome to Myspace</h1>
      <p>Existing users, login below to get started.</p>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder= "Email" 
          value={email} 
          onChange={(e)=> setEmail(e.target.value)}/>
     
        <input 
          placeholder= "Password" 
          value={password} onChange={(e)=> setPassword(e.target.value)}/> 
      <br></br>
      <p>Want to sign-up? <Link className="Nav-link" to="/register">Register</Link>here.</p>
      <Button onClick={handleSubmit} className="btn-spacing" size="sm" variant="dark">Login</Button>
      </form>
    </div>
  )
}

export default Login 