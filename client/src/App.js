
import logo from './logo.svg';
import './App.css';
import {Routes, Route, useParams} from 'react-router-dom'; 
import Home from './components/shared/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NoMatch from './components/shared/NoMatch';
import Navbar from './components/shared/Navbar';
import HomeClass from './components/shared/HomeClass';
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchUser from './components/shared/FetchUser';
import ProtectedRoute from './components/shared/ProtectRoute';
import MyFriends from './components/shared/MyFriends';


//Fetch User: going to see if the user is logged in(valid user?)
//before we render our routes, it's going to check for user.
//prevents routes from getting rendered until check is done 

//if fetchUser is in progress of checking App returns null; 
//it doesn't care whether we have a user or not, it's just checking
//after done checking it will proceed with render 

function App() {
  return (
    <div>
      <Navbar/>
      {/* when our app first mounts, FetchUser runs */}
      <FetchUser>
      <>
      <Routes>
      {/* unprotected - */}
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        
        {/* protected  routes inside here need to be logged in
        otherwise, you go to the login page */}
      <Route element= {<ProtectedRoute />}> 
        <Route path='/home' element={<HomeClass yo={'yoyo'}/>}/> 
        <Route path='/' element={<Home />}/>
        <Route path='/my_friends' element={<MyFriends />}/>
        </Route>
        <Route path='*' element={<NoMatch />}/>
      </Routes>
      </>
      </FetchUser>
      </div>
  );
}

export default App;