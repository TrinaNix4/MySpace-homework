import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

// this page should show unliked friends for a logged in user
const Home = () => {
  const auth = useContext(AuthContext)
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); 

  // load friends on mount
  useEffect(() => {
    getFriends();
  }, []);

  // axios call to get Friends
  const getFriends = async () => {
    try {
      let res = await axios.get("/api/friends");
      setFriends(res.data);
    } catch (err) {
      setError(err);
    }
  };

//gets a random friend from our friends state 
  const sample = () => {
    if (friends.length) {
      // come up with whole number 0 - friends.length -1
      const index = Math.floor(Math.random() * friends.length);
      return friends[index];
    }
    return null;
  };
 
  //no interaction with the db; just a UI thing 
  const removeFriendFromUI = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id)); 
  };

  //will interact with DB (update method in friends controller)
  //calls the update method (.put)
  const upVote = async (id) => {
    //this call adds id to the linked_friends in user model
    let res = await axios.put(`api/friends/${id}`);
    //update UI 
    removeFriendFromUI(id);
  }; 
 
  if (error) return <p>{JSON.stringify(error)}</p>;
  
  const friend = sample();
  //grab the auth state; if auth.user, then get friends
  if(!auth.user){
    return (
      <>
      <p>message: {message}</p>
      <p>please log in to meet some friends!</p>
      </>
    )
  }
  if (friend) {
    return (
      <>
       <p>message: { message}</p>
        <br />
        <h1>MySpace </h1>
        <br />
        <div key={friend.id}>
          <img src={friend.avatar} />
          <section>
            <h3>{friend.name}</h3>
            <p>{friend.age}</p>
            <p>{friend.location}</p>
          </section>
          <section>
            <button onClick={() => removeFriendFromUI(friend.id)}>thumbs down</button>
            <button onClick={() => upVote(friend.id)}>thumbs up</button>
          </section>
        </div>
        <Link to="/my_friends">
          <button>My Friends</button>
        </Link>
      </>
    );
  } else {
    return (
    <>
<h1>No More Friends</h1>;
        <Link to="my_friends">
          <button>My Friends</button>
        </Link>
        </>
    );
  }
};
export default Home;