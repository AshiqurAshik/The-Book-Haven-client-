import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';

const SingleBook = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch book details
  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Book not found');
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching book:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Fetch comments for the book
  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Add new comment
  const handleAddComment = () => {
    if (!comment.trim() || !user) return;

    const newComment = {
      name: user.displayName || 'Anonymous',
      photo: user.photoURL || '',
      comment,
      createdAt: new Date(),
    };

    fetch(`http://localhost:3000/books/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then(() => {
        setComments((prev) => [newComment, ...prev]);
        setComment('');
      })
      .catch((err) => console.error(err));
  };

  if (loading)
    return <p className="text-center mt-10 text-[#3B2C24]">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  if (!book)
    return <p className="text-center mt-10 text-[#3B2C24]">No book found.</p>;

  return (
    <div className="p-10 w-full bg-[#FAF9F6] rounded-2xl shadow-lg flex flex-col items-center">
      {/* Book Info */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="md:w-1/3">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full max-h-96 object-contain rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="md:w-2/3 flex flex-col justify-start text-[#3B2C24]">
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <p className="text-lg font-medium mb-2">Author: {book.author}</p>
          <p className="mb-2 font-semibold">Genre: {book.genre}</p>
          <p className="text-yellow-500 font-semibold mb-4">
            ⭐ Rating: {book.rating}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Language:</span> {book.language}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Publication Year:</span>{' '}
            {book.publicationYear}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Uploaded by:</span> {book.userEmail}
          </p>
          <p className="mt-4 leading-relaxed">
            <span className="font-semibold">Summary:</span> {book.summary}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10 w-full max-w-5xl">
        <h3 className="text-2xl font-bold mb-4">Comments</h3>

        {/* Add Comment */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder={user ? 'Add a comment...' : 'Login to comment'}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!user}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D17E5E]"
          />
          <button
            onClick={handleAddComment}
            disabled={!user}
            className={`px-4 py-2 rounded-xl transition font-semibold ${
              user
                ? 'bg-[#4C3A2F] text-white hover:bg-[#3B2C24]'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>

        {/* Comments List */}
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
            {comments.map((c, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
              >
                <img
                  src={c.photo || 'https://i.pravatar.cc/40'}
                  alt={c.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#3B2C24]">{c.name}</p>
                    <p className="text-xs text-gray-400">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleString()
                        : ''}
                    </p>
                  </div>
                  <p className="text-gray-700 mt-1">{c.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBook;
