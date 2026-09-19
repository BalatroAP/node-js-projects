import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Media, Row, Card, Container, Col } from "reactstrap";
import Image from "react-bootstrap/Image";

import MovieDataService from "../services/movies.js";

const Movie = (props) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/review"}>
                    Add review
                  </Link>
                )}
              </Card.Body>
            </Card>
          </Col>
          <h2>Reviews</h2>
          <br />
          {movie.reviews.map((review, index) => {
            return (
              <Media key={index}>
                <Media.Body>
                  <h5>{review.name + "reviewed on" + review.date}</h5>
                  <p>{review.review}</p>
                  {props.user && props.user.id === review.user_id && (
                    <Row>
                      <Col>
                        <Link
                          to={{
                            pathname: `/movies/${props.match.params.id}/review`,
                            state: { currentReview: review },
                          }}
                        >
                          Edit
                        </Link>
                      </Col>
                      <Col>
                        <Button variant="link">Delete</Button>
                      </Col>
                    </Row>
                  )}
                </Media.Body>
              </Media>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
