import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

const TopBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/books');
        const sortedBooks = res.data
          .sort((a, b) => b.rating - a.rating) 
          .slice(0, 3); 
        setBooks(sortedBooks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching top books:', err);
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, []);

  if (loading) return <Loading />;

  if (books.length === 0)
    return (
      <p className="text-center mt-10 text-[#3B2C24] font-medium">
        No top rated books found.
      </p>
    );

  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#3B2C24]">
          Top Rated Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center">
          {books.map((book) => (
            <div
              key={book._id}
              className="w-full bg-[#FAF9F6] text-[#3B2C24] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-64 object-contain rounded-t-2xl bg-[#FAF9F6]"
              />

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-sm mb-2 font-medium text-[#3B2C24]">
                  by {book.author}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#D17E5E] text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {book.genre}
                  </span>
                  <span className="font-bold text-yellow-500">
                    ⭐ {book.rating}
                  </span>
                </div>

                <NavLink
                  to={`/books/${book._id}`}
                  className="mt-auto bg-[#4C3A2F] text-white py-2 rounded-xl hover:bg-[#3B2C24] transition font-semibold text-center"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBooks;
