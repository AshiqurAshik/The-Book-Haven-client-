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

  // Fetch user's books
  const fetchBooks = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/books/by-email/${user.email}`
      );
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  // Delete book
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/books/${id}`,
            {
              method: 'DELETE',
            }
          );
          if (!res.ok) throw new Error('Failed to delete book');
          setBooks((prev) => prev.filter((book) => book._id !== id));
          toast.success('Book deleted successfully!');
        } catch (err) {
          console.error(err);
          toast.error('Failed to delete book!');
        }
      }
    });
  };

  // Update book
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!currentBook || !currentBook._id) return;

    const updatedFields = {};
    [
      'title',
      'author',
      'genre',
      'rating',
      'summary',
      'coverImage',
      'language',
      'publicationYear',
    ].forEach((key) => {
      if (
        currentBook[key] !== undefined &&
        currentBook[key] !== null &&
        currentBook[key] !== ''
      ) {
        updatedFields[key] =
          key === 'rating' || key === 'publicationYear'
            ? Number(currentBook[key])
            : currentBook[key];
      }
    });

    console.log('Updating book:', currentBook._id, updatedFields);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/books/${currentBook._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFields),
        }
      );
      if (!res.ok) throw new Error('Failed to update book');

      toast.success('Book updated successfully!');
      setModalOpen(false);
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update book!');
    }
  };

  if (loading) return <Loading />;

  if (error)
    return (
      <p className="text-red-600 text-center mt-10 font-semibold">{error}</p>
    );

  if (!books.length)
    return (
      <div className="h-100">
        <p className="text-center flex justify-center items-center text-gray-600 dark:bg-[#2A1F17] h-full font-medium">
          You haven't added any books yet.
        </p>
      </div>
    );

  return (
    <section className="py-10 px-5 w-full rounded-2xl transition-colors duration-500 bg-white dark:bg-[#2A1F17]">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-4xl font-extrabold mb-8 text-center text-[#4C3A2F] dark:text-[#FFF8F1]">
        My Books
      </h2>

      <div className="overflow-x-auto">
        <table className="w-11/12 mx-auto shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-[#2A1F17] transition-colors duration-500">
          <thead className="bg-[#F8F4E8] dark:bg-[#3B1F14]">
            <tr>
              {[
                '#',
                'Cover',
                'Title',
                'Author',
                'Genre',
                'Rating',
                'Actions',
              ].map((header) => (
                <th
                  key={header}
                  className="text-left px-6 py-3 text-gray-600 dark:text-[#F8F4E8] font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book._id}
                className="hover:bg-[#FFF5E0] dark:hover:bg-[#4C3A2F]/50 transition duration-200"
              >
                <td className="px-6 py-4 text-[#4C3A2F] dark:text-[#FFF8F1]">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-[#4C3A2F] dark:text-[#FFF8F1]">
                  {book.title}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-[#FFF8F1]">
                  {book.author}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-[#FFF8F1]">
                  {book.genre}
                </td>
                <td className="px-6 py-4 text-yellow-400 font-semibold">
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
          <div className="modal-box w-11/12 max-w-xl dark:bg-[#2A1F17] transition-colors duration-500">
            <h3 className="font-bold text-2xl mb-4 text-[#4C3A2F] dark:text-[#FFF8F1]">
              Update Book
            </h3>
            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-3">
              {[
                'title',
                'author',
                'genre',
                'rating',
                'summary',
                'coverImage',
                'language',
                'publicationYear',
              ].map((field) =>
                field === 'summary' ? (
                  <textarea
                    key={field}
                    placeholder="Summary"
                    value={currentBook.summary || ''}
                    onChange={(e) =>
                      setCurrentBook({
                        ...currentBook,
                        summary: e.target.value,
                      })
                    }
                    className="textarea textarea-bordered w-full dark:bg-[#3B1F14] dark:text-[#FFF8F1]"
                  />
                ) : (
                  <input
                    key={field}
                    type={
                      field === 'rating' || field === 'publicationYear'
                        ? 'number'
                        : 'text'
                    }
                    step={field === 'rating' ? '0.1' : undefined}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={currentBook[field] || ''}
                    onChange={(e) =>
                      setCurrentBook({
                        ...currentBook,
                        [field]:
                          field === 'rating' || field === 'publicationYear'
                            ? Number(e.target.value)
                            : e.target.value,
                      })
                    }
                    className="input input-bordered w-full dark:bg-[#3B1F14] dark:text-[#FFF8F1]"
                  />
                )
              )}
              <div className="modal-action mt-2">
                <button
                  type="button"
                  className="btn btn-ghost text-[#4C3A2F] dark:text-[#FFF8F1]"
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
    </section>
  );
};

export default MyBook;
