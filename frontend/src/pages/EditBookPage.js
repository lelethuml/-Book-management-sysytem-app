import React from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';

function EditBookPage() {
  const { id } = useParams();

  return (
    <div className="page">
      <h2>Edit Book</h2>
      <BookForm bookId={id} />
    </div>
  );
}

export default EditBookPage;
