import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';
import Loading from '../../Components/Loading/Loading';
import ErrorPage from '../../Components/Error page/ErrorPage';
import { toast, Toaster } from 'react-hot-toast';

const SingleBook = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${API_URL}/books/${id}`);
        if (!res.ok) throw new Error('Book not found');
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, API_URL]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_URL}/books/${id}/comments`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [id, API_URL]);

  const handleAddComment = async () => {
    if (!comment.trim() || !user) return;

    const newComment = {
      name: user.displayName || 'Anonymous',
      photo: user.photoURL || '',
      comment,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${API_URL}/books/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (!res.ok) throw new Error('Failed to add comment');

      setComments((prev) => [newComment, ...prev]);
      setComment('');
      toast.success('Comment added!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add comment');
    }
  };

  if (loading) return <Loading />;
  if (error || !book) return <ErrorPage />;

  return (
    <div className="p-10 w-full bg-[#FAF9F6] dark:bg-[#3B2A23] rounded-2xl shadow-lg flex flex-col items-center transition-colors duration-500">
      <Toaster position="top-right" />

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full max-h-96 object-contain rounded-xl"
          />
        </div>

        <div className="md:w-2/3 flex flex-col justify-start text-[#3B2C24] dark:text-[#F8F4E8] transition-colors duration-500">
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

      <div className="mt-10 w-full max-w-5xl">
        <h3 className="text-2xl font-bold mb-4 text-[#3B2C24] dark:text-[#F8F4E8] transition-colors duration-500">
          Comments
        </h3>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder={user ? 'Add a comment...' : 'Login to comment'}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!user}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D17E5E] bg-white dark:bg-[#2A221D] text-[#3B2C24] dark:text-[#F8F4E8] transition-colors duration-500"
          />
          <button
            onClick={handleAddComment}
            disabled={!user}
            className={`px-4 py-2 rounded-xl transition font-semibold ${
              user
                ? 'bg-[#4C3A2F] text-white hover:bg-[#3B2C24] dark:bg-[#D17E5E] dark:text-[#1E1A17] dark:hover:bg-[#B35B3B]'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>

        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 transition-colors duration-500">
            No comments yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
            {comments.map((c, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white dark:bg-[#2A221D] border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-md transition-colors duration-500"
              >
                <img
                  src={c.photo || 'https://i.pravatar.cc/40'}
                  alt={c.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#3B2C24] dark:text-[#F8F4E8] transition-colors duration-500">
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-500">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleString()
                        : ''}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-1 transition-colors duration-500">
                    {c.comment}
                  </p>
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
