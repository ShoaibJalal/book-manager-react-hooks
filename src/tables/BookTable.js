import React from "react";

const BookTable = props => (
  <table className="table table-striped table-responsive-md btn-table">
    <thead>
      <tr>
        <th>Book</th>
        <th>Author</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.propBooks.length > 0 ? (
        props.propBooks.map(book => (
          <tr key={book.id}>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>
              <button
                type="button"
                className="btn btn-outline-info btn-sm waves-effect"
                onClick={() => {
                  props.onEditBook(book);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm waves-effect"
                onClick={() => props.deleteBook(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No books</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default BookTable;
