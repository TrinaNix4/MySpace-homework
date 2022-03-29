import axios from 'axios'
import {useState, useEffect } from 'react'


const MyFriends = () => {
  const [friends, setFriends] = useState([])
  useEffect(()=>{
    getFriends()
  }, [])

  const getFriends = async()=> {
    let res = await axios.get('/api/my_friends')
    setFriends(res.data)
  }; //TODO: error handling 

  return(
    <>
      {friends.map((friend) => {
          return(
            <div key={friend.id}>
              <img src={friend.avatar} />
              <h2>{friend.name}</h2>
              <p>{friend.id}</p>
            </div>
          );
        })}
    </>
  );
};
export default MyFriends; 