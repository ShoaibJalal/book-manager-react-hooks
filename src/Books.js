import React, { useState, useEffect, useCallback } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import BookTable from "./tables/BookTable";
import AddBookForm from "./forms/AddBookForm";
import EditBookForm from "./forms/EditBookForm";
import Search from "./forms/Search";
import ErrorModal from "../src/UI/ErrorModal";
import Notification from "../src/UI/Notification";

function Books() {
  const [books, setBooks] = useState([]);

  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: "", author: "" };
  const [currentBook, setCurrentBook] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [notify, setNotify] = useState("");

  const filteredBooksHandler = useCallback((filteredBooks) => {
    setBooks(filteredBooks);
  }, []);

  useEffect(() => {
    if (!navigator.onLine) {
      let offlineBooks = JSON.parse(localStorage.getItem("fetchedBooks"));
      setBooks(offlineBooks);
    }
  }, []);

  const editBook = (book) => {
    setEditing(true);
    setCurrentBook({ id: book.id, name: book.name, author: book.author });
  };

  const updateBook = (id, updatedBook) => {
    setEditing(false);

    fetch(`https://react-hooks-books-manager.firebaseio.com/books/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedBook),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setBooks((previousBooks) =>
          previousBooks.map((book) => (book.id === id ? updatedBook : book))
        );
      });
  };

  useEffect(() => {
    window.addEventListener("online", () => {
      setNotify("online");
    });

    window.addEventListener("offline", () => {
      setNotify("offline");
    });
    return () => {
      window.removeEventListener("online");
      window.removeEventListener("offline");
    };
  }, []);

  const addBook = (book) => {
    setIsLoading(true);
    fetch("https://react-hooks-books-manager.firebaseio.com/books.json", {
      method: "POST",
      body: JSON.stringify(book),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        setBooks((previousBooks) => [
          ...previousBooks,
          {
            ...book,
            id: responseData.name,
          },
        ]);
      });
  };

  const deleteBook = (id) => {
    setIsLoading(true);
    fetch(`https://react-hooks-books-manager.firebaseio.com/books/${id}.json`, {
      method: "DELETE",
    })
      .then((response) => {
        setIsLoading(false);
        setEditing(false);
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => {
        setError("Something went wrong!");
        setIsLoading(false);
      });
  };
  const clearError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <MDBContainer>
        <Notification notification={notify} />
        <h1 className="text-center my-3">Book Manager</h1>

        {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
        <MDBRow>
          <MDBCol>
            {editing ? (
              <>
                <h2>Edit Book</h2>
                <EditBookForm
                  editing={editing}
                  setEditing={setEditing}
                  currentBook={currentBook}
                  onUpdateBook={updateBook}
                />
              </>
            ) : (
              <>
                <h2>Add Book</h2>

                <AddBookForm addBook={addBook} loading={isLoading} />
              </>
            )}
          </MDBCol>
          <MDBCol>
            <h2>View Books</h2>
            <Search onFetchedBooks={filteredBooksHandler} />
            <BookTable
              propBooks={books}
              onEditBook={editBook}
              deleteBook={deleteBook}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
}

export default Books;
