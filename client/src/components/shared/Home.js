import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"

const Home  = () => {
  let auth = useContext(AuthContext)
  if(!auth.user){
    return <p>TODO: should not be able to come, not logged in here, redirect to login</p>
  }
  return (
    <div>
      <h1>Home</h1> 
      {/* grab the actual email from authprovider page */}
      <p>hello {auth.user.email}</p>
      <p>{JSON.stringify(auth)}</p>
    </div>
  )
}

export default Home