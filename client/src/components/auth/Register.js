import { useState, useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import Button from "react-bootstrap/Button"

const Register = () => {
  const [email, setEmail] = useState('test2@test.com')
  const [password, setPassword] = useState('123456')
  const auth = useContext(AuthContext)
  //not needed but nice for UX
  //const [confirmPassword, setConfirmPassword] = useState('')
  
  
  //use Context (auth) to grab handleRegister 
  //and pass it
  //the user info 
  const handleSubmit = (e) => {
    e.preventDefault()
    //with devise_token_auth there are backend validations
    //email must be valid email and unique 
    //password must be 6 or greater characters 
    auth.handleRegister({email, password})
  }
  
  return (
    <div>
    {/* form with 2 inputs with handleSubmit 
    to prevent the default */}
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder= "Email" value={email} 
          onChange={(e)=> setEmail(e.target.value)}/>
        <input 
          placeholder= "Password"  
          value={password} 
          onChange={(e)=> setPassword(e.target.value)}/> 
      <br></br>
      <Button 
          onClick={handleSubmit} 
          className="btn-spacing" 
          size="sm" 
          variant="dark">Register</Button>
      </form>
    </div>
  )
}

export default Register 