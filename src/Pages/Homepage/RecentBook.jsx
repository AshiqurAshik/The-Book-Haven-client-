import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Loading from '../../Components/Loading/Loading';

const RecentBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/recentBook')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching recent books:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Loading></Loading> 
    );
  }

  if (books.length === 0) {
    return (
      <p className="text-center mt-10 text-[#3B2C24] font-medium">
        No recent books found.
      </p>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="w-11/12 mx-auto">
        {/* Page Heading */}
        <h2 className="text-4xl font-bold mb-10 text-center text-[#3B2C24]">
          Recent Books
        </h2>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {books.map((book) => (
            <div
              key={book._id}
              className="w-full bg-[#FAF9F6] text-[#3B2C24] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              {/* Book Image */}
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-auto max-h-64 object-contain rounded-t-2xl bg-[#FAF9F6]"
              />

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl font-bold mb-3">{book.title}</h3>

                {/* Author */}
                <p className="text-sm mb-3 font-medium text-[#3B2C24]">
                  by {book.author}
                </p>

                {/* Genre + Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#D17E5E] text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {book.genre}
                  </span>
                  <span className="font-bold text-yellow-500">
                    ⭐ {book.rating}
                  </span>
                </div>

                {/* Card Button */}
                <button className="mt-auto bg-[#4C3A2F] text-white py-2 rounded-xl hover:bg-[#3B2C24] transition font-semibold">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-10">
          <Link to="/all-books" className="bg-[#4C3A2F] text-white px-6 py-3 rounded-xl hover:bg-[#3B2C24] transition font-semibold">
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentBook;
