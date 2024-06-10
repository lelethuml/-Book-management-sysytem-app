import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries';
import { DELETE_BOOK } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Book List</h1>
      <Link to="/add" className="btn btn-primary mb-4">Add Book</Link>
      <ul className="list-group">
        {data.books.map((book) => (
          <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{book.title}</h5>
              <p>{book.author}</p>
              <p>{book.description}</p>
            </div>
            <div>
              <Link to={`/edit/${book.id}`} className="btn btn-secondary me-2">Edit</Link>
              <button
                className="btn btn-danger"
                onClick={() => deleteBook({ variables: { id: book.id } })}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
