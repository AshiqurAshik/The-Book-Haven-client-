import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    rating: '',
    summary: '',
    coverImage: '',
    language: '',
    publicationYear: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = { ...book, userEmail: user.email };

    try {
      const res = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (!res.ok) throw new Error('Failed to add book');

      toast.success(' Book added successfully!');
      setBook({
        title: '',
        author: '',
        genre: '',
        rating: '',
        summary: '',
        coverImage: '',
        language: '',
        publicationYear: '',
      });
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to add book');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F1] to-[#F7EBDD] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-10 border border-[#E9DAC1] transition-all hover:shadow-2xl">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-[#3B2C24] mb-8 tracking-wide">
          Add a New Book
        </h2>
        <p className="text-center text-[#6B5B50] mb-10 text-sm">
          Share your favorite books with the world 🌍
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#3B2C24] font-medium mb-1">
                Title
              </label>
              <input
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D17E5E] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#3B2C24] font-medium mb-1">
                Author
              </label>
              <input
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Author name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D17E5E] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#3B2C24] font-medium mb-1">
                Genre
              </label>
              <input
                name="genre"
                value={book.genre}
                onChange={handleChange}
                placeholder="e.g. Fiction, Mystery"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D17E5E] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#3B2C24] font-medium mb-1">
                Rating
              </label>
              <input
                name="rating"
                type="number"
                step="0.1"
                value={book.rating}
                onChange={handleChange}
                placeholder="e.g. 4.5"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D17E5E] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#3B2C24] font-medium mb-1">
                Language
              </label>
              <input
                name="language"
                value={book.language}
                onChange={handleChange}
                placeholder="e.g. English, Bengali"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D17E5E] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#3B2C24] font-medium mb-1">
                Publication Year
              </label>
              <input
                name="publicationYear"
                type="number"
                value={book.publicationYear}
                onChange={handleChange}
                placeholder="e.g. 1948"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D17E5E] outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#3B2C24] font-medium mb-1">
                Cover Image URL
              </label>
              <input
                name="coverImage"
                value={book.coverImage}
                onChange={handleChange}
                placeholder="Paste image link"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D17E5E] outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#3B2C24] font-medium mb-1">
                Uploaded by (Email)
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#3B2C24] font-medium mb-1">
              Summary
            </label>
            <textarea
              name="summary"
              value={book.summary}
              onChange={handleChange}
              placeholder="Write a short description of the book..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 h-28 focus:ring-2 focus:ring-[#D17E5E] outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!user}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-200 shadow-md ${
              user
                ? 'bg-[#4C3A2F] hover:bg-[#3B2C24] hover:shadow-lg'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {user ? 'Add Book' : 'Login to Add Book'}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default AddBook;
