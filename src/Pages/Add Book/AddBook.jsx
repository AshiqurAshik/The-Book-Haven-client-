import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { toast, Toaster } from 'react-hot-toast';

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
    if (!user?.email) {
      toast.error('Please login to add a book!');
      return;
    }

    const newBook = {
      ...book,
      userEmail: user.email,
      rating: Number(book.rating),
      publicationYear: Number(book.publicationYear),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (!res.ok) throw new Error('Failed to add book');

      toast.success('📚 Book added successfully!');

      // Reset form
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
    <div className="min-h-screen bg-[#FFF8F1] dark:bg-[#3B2A23] transition-colors duration-500 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-white/90 dark:bg-[#4C3A2F]/90 backdrop-blur-lg shadow-xl rounded-3xl p-10 border border-[#E9DAC1] dark:border-[#5A4638] transition-all hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-[#3B2C24] dark:text-[#F8F4E8] mb-8 tracking-wide">
          Add a New Book
        </h2>
        <p className="text-center text-[#6B5B50] dark:text-[#E8DCC2] mb-10 text-sm">
          Share your favorite books with the world 🌍
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'title',
              'author',
              'genre',
              'rating',
              'language',
              'publicationYear',
              'coverImage',
            ].map((field) => (
              <div
                key={field}
                className={
                  field === 'coverImage' || field === 'summary'
                    ? 'md:col-span-2'
                    : ''
                }
              >
                <label className="block text-[#3B2C24] dark:text-[#F8F4E8] font-medium mb-1 capitalize">
                  {field === 'coverImage'
                    ? 'Cover Image URL'
                    : field === 'publicationYear'
                    ? 'Publication Year'
                    : field}
                </label>
                <input
                  name={field}
                  value={book[field]}
                  onChange={handleChange}
                  placeholder={
                    field === 'rating'
                      ? 'e.g. 4.5'
                      : field === 'language'
                      ? 'e.g. English'
                      : `Enter ${field}`
                  }
                  type={
                    field === 'rating' || field === 'publicationYear'
                      ? 'number'
                      : 'text'
                  }
                  step={field === 'rating' ? '0.1' : undefined}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D17E5E] outline-none bg-white dark:bg-[#5A4638] text-[#3B2C24] dark:text-[#F8F4E8]"
                  required
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-[#3B2C24] dark:text-[#F8F4E8] font-medium mb-1">
                Uploaded by (Email)
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full border border-gray-200 dark:border-gray-500 rounded-xl px-4 py-3 bg-gray-100 dark:bg-[#4C3A2F] text-gray-600 dark:text-[#F8F4E8] cursor-not-allowed"
              />
            </div>
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

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddBook;
