import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import Loading from '../../Components/Loading/Loading';
import Swal from 'sweetalert2';
import { toast, Toaster } from 'react-hot-toast';

const MyBook = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const fetchBooks = () => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`http://localhost:3000/books/by-email/${user.email}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' })
          .then((res) => res.json())
          .then(() => {
            setBooks((prev) => prev.filter((book) => book._id !== id));
            toast.success('Book deleted successfully!');
          })
          .catch((err) => toast.error('Failed to delete book!'));
      }
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!currentBook) return;

    const updatedFields = {};
    if (currentBook.title) updatedFields.title = currentBook.title;
    if (currentBook.author) updatedFields.author = currentBook.author;
    if (currentBook.genre) updatedFields.genre = currentBook.genre;
    if (currentBook.rating) updatedFields.rating = currentBook.rating;
    if (currentBook.summary) updatedFields.summary = currentBook.summary;
    if (currentBook.coverImage)
      updatedFields.coverImage = currentBook.coverImage;
    if (currentBook.language) updatedFields.language = currentBook.language;
    if (currentBook.publicationYear)
      updatedFields.publicationYear = currentBook.publicationYear;

    fetch(`http://localhost:3000/books/${currentBook._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success('Book updated successfully!');
        setModalOpen(false);
        fetchBooks();
      })
      .catch((err) => toast.error('Failed to update book!'));
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <p className="text-red-600 text-center mt-10 font-semibold">{error}</p>
    );
  if (books.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600 font-medium">
        You haven't added any books yet.
      </p>
    );

  return (
    <div className="py-10 px-5 max-w-7xl mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-4xl font-extrabold mb-8 text-center text-[#4C3A2F]">
        My Books
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          <thead className="bg-[#F8F4E8]">
            <tr>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                #
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                Cover
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                Title
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                Author
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                Genre
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                Rating
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book._id}
                className="hover:bg-[#FFF5E0] transition duration-200"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-[#3B2C24]">
                  {book.title}
                </td>
                <td className="px-6 py-4 text-gray-700">{book.author}</td>
                <td className="px-6 py-4 text-gray-700">{book.genre}</td>
                <td className="px-6 py-4 text-yellow-500 font-semibold">
                  ⭐ {book.rating}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentBook(book);
                      setModalOpen(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-semibold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {modalOpen && currentBook && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-xl">
            <h3 className="font-bold text-2xl mb-4">Update Book</h3>
            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={currentBook.title || ''}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, title: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={currentBook.author || ''}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, author: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                placeholder="Genre"
                value={currentBook.genre || ''}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, genre: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                value={currentBook.rating || ''}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, rating: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Summary"
                value={currentBook.summary || ''}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, summary: e.target.value })
                }
                className="textarea textarea-bordered w-full"
              />
              <input
                type="text"
                placeholder="Cover Image URL"
                value={currentBook.coverImage || ''}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, coverImage: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Language"
                value={currentBook.language || ''}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, language: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <input
                type="number"
                placeholder="Publication Year"
                value={currentBook.publicationYear || ''}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    publicationYear: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />
              <div className="modal-action mt-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBook;
