import React, { useState } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {
  let userDataLength = null;
  const [userData, setUserData] = useState("");
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);
  const { loading, data } = useQuery(GET_ME);
  // setUserData(data);

  // Supposed to use this instead of Auth.getProfile??
  // const { _id, username } = useParams();

  // use this to determine if `useEffect()` hook needs to run again
  if (data) {
    userDataLength = 1;
  }

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const user = Auth.getProfile();

  //       const response = await me(user.data.username, user.data._id);

  //       if (!response.ok) {
  //         throw new Error("something went wrong!");
  //       }

  //       console.log("THIS IS WHAT YOU ARE RETURNING");
  //       console.log(response);

  //       // const user = await response.json();
  //       setUserData(response);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removeBook({ variables: { bookId } });

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {data.me.savedBooks.length
            ? `Viewing ${data.me.savedBooks.length} saved ${
                data.me.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {data.me.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
