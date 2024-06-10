import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BOOK, EDIT_BOOK } from '../graphql/mutations';
import { GET_BOOK, GET_BOOKS } from '../graphql/queries';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookForm() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const isEdit = !!bookId;

  const { data, loading } = useQuery(GET_BOOK, {
    variables: { id: bookId },
    skip: !isEdit,
  });

  useEffect(() => {
    if (data && data.book) {
      setTitle(data.book.title);
      setAuthor(data.book.author);
      setDescription(data.book.description);
    }
  }, [data]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const [editBook] = useMutation(EDIT_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEdit) {
        editBook({ variables: { id: bookId, title, author, description } }).then(() => navigate('/'));
      } else {
        addBook({ variables: { title, author, description } }).then(() => navigate('/'));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = 'Title is required';
    if (!author) errors.author = 'Author is required';
    if (!description) errors.description = 'Description is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          className={`form-control ${errors.author ? 'is-invalid' : ''}`}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <div className="invalid-feedback">{errors.author}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        {isEdit ? 'Update' : 'Add'} Book
      </button>
    </form>
  );
}

export default BookForm;
