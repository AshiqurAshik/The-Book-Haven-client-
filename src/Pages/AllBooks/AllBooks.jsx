import React from 'react';

const AllBooks = () => {

  useEffect(() => {
      fetch('http://localhost:3000/books')
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

  return (
    <div>
      <h2>All Books</h2>
    </div>
  );
};

export default AllBooks;
