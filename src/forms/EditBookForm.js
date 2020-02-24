import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdbreact";

const EditBookForm = props => {
  const [book, setBook] = useState(props.currentBook);
  useEffect(() => {
    setBook(props.currentBook);
  }, [props]);

  const handleInputChange = event => {
    const { id, value } = event.target;

    setBook({ ...book, [id]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.onUpdateBook(book.id, book);
      }}
    >
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
          Update book
        </MDBBtn>
        <MDBBtn outline color="warning" onClick={() => props.setEditing(false)}>
          Cancel
        </MDBBtn>
      </div>
    </form>
  );
};

export default EditBookForm;
