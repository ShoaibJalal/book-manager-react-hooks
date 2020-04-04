import React, { useState, useEffect, useRef } from "react";
import { MDBCol, MDBIcon } from "mdbreact";

const Search = React.memo((props) => {
  const { onFetchedBooks } = props;
  const [enteredFilter, setEnteredFilter] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="name"&equalTo="${enteredFilter}"`;
        fetch(
          "https://react-hooks-books-manager.firebaseio.com/books.json" + query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const fetchedBooks = [];
            for (const key in responseData) {
              fetchedBooks.push({
                id: key,
                author: responseData[key].author,
                name: responseData[key].name,
              });
            }
            onFetchedBooks(fetchedBooks);
            localStorage.setItem("fetchedBooks", JSON.stringify(fetchedBooks));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, onFetchedBooks]);

  return (
    <MDBCol md="6">
      <form className="form-inline mt-4 mb-4">
        <MDBIcon icon="search" />
        <input
          className="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="Search by book name"
          aria-label="Search"
          ref={inputRef}
          value={enteredFilter}
          onChange={(event) => setEnteredFilter(event.target.value)}
        />
      </form>
    </MDBCol>
  );
});

export default Search;
