import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import Spinner from "../UI/Spinner";

const AddBookForm = props => {
  const initialFormState = { id: null, name: "", author: "" };
  const [book, setBook] = useState(initialFormState);

  const handleInputChange = event => {
    const { id, value } = event.target;

    setBook({ ...book, [id]: value });
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (!book.name || !book.author) return;

    props.addBook(book);

    setBook(initialFormState);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="name" className="grey-text">
        Book name
      </label>
      <input
        type="text"
        id="name"
        value={book.name}
        className="form-control"
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="author" className="grey-text">
        Authur
      </label>
      <input
        type="text"
        id="author"
        value={book.author}
        className="form-control"
        onChange={handleInputChange}
      />

      <div className="text-center mt-4">
        <MDBBtn outline color="primary" type="submit">
          Add new book
        </MDBBtn>
        <div className="text-center mt-4">{props.loading && <Spinner />}</div>
      </div>
    </form>
  );
};

export default AddBookForm;
