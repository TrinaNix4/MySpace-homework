import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

// this page should show unliked friends for a logged in user
const Home = () => {
  const auth = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // load friends on mount
  useEffect(() => {
    getFriends();
  }, []);

  // axios call to get Friends
  const getFriends = async () => {
    try {
      let res = await axios.get("/api/friends");
      setFriends(res.data);
      console.log(res.data);
    } catch (err) {
      setError(err);
    }
  };

  //gets a random friend from our friends state
  const sample = () => {
    if (friends.length) {
      // come up with whole number 0 - friends.length -1
      const index = Math.floor(Math.random() * friends.length);
      const index2 = Math.floor(Math.random() * friends.length);
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
  if (!auth.user) {
    return (
      <>
        <p>message: {message}</p>
        <p>Please log in to meet some friends!</p>
      </>
    );
  }
  if (friend) {
    return (
      <>
        <Link to="/my_friends">
          <Button className="btn.spacing" variant="dark">
            My Friends
          </Button>
        </Link>

        <p>message: {message}</p>
        <br />
        <h1>MySpace </h1>
        <br />
        <Container>
          <Row>
            <Col md={3}>
              <Card bg="light" className="mb-3">
                <Image src={friend.avatar} className="card-img-top" fluid />
                <Card.Body>
                  <Card.Title>{friend.name}</Card.Title>
                  <Card.Text>
                    <p>Age: {friend.age}</p>
                    <p>Location: {friend.location}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="light" className="mb-3">
                <Image src={friend.avatar} className="card-img-top" fluid />
                <Card.Body>
                  <Card.Title>{friend.name}</Card.Title>
                  <Card.Text>
                    <p>Age: {friend.age}</p>
                    <p>Location: {friend.location}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div key={friend.id}>
          <section></section>
          <section>
            <Button
              className="btn-spacing"
              variant="primary"
              onClick={() => removeFriendFromUI(friend.id)}
            >
              thumbs down
            </Button>
            <Button
              className="btn-spacing"
              variant="primary"
              onClick={() => upVote(friend.id)}
            >
              thumbs up
            </Button>
          </section>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Sorry, no More Friends!</h1>;
        <Link to="my_friends">
          <Button variant="dark">My Friends</Button>
        </Link>
      </>
    );
  }
};
export default Home;
