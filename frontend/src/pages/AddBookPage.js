// components/AddBook.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $description: String!) {
    addBook(title: $title, author: $author, description: $description) {
      id
      title
      author
      description
    }
  }
`;

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [addBook] = useMutation(ADD_BOOK);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ variables: { title, author, description } });
    setTitle('');
    setAuthor('');
    setDescription('');
  };

  return (
    <div>
      <h2 className="mb-4">Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
