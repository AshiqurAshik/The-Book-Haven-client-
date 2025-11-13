import React, { useEffect, useState } from 'react';
import {
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  UsersIcon,
  GlobeIcon,
  RocketIcon,
  MusicIcon,
  FilmIcon,
} from 'lucide-react';
import axios from 'axios';

const genreStyles = {
  Fiction: {
    icon: <BookOpenIcon className="w-10 h-10 text-blue-600" />,
    gradient: 'from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800',
  },
  Mystery: {
    icon: <UsersIcon className="w-10 h-10 text-green-600" />,
    gradient:
      'from-green-100 to-green-50 dark:from-green-900 dark:to-green-800',
  },
  'Sci-Fi': {
    icon: <RocketIcon className="w-10 h-10 text-purple-600" />,
    gradient:
      'from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800',
  },
  Romance: {
    icon: <HeartIcon className="w-10 h-10 text-red-600" />,
    gradient: 'from-red-100 to-red-50 dark:from-red-900 dark:to-red-800',
  },
};

const GenreSection = () => {
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    const fetchTopGenres = async () => {
      try {
        const res = await axios.get('http://localhost:3000/books');
        const books = res.data;

        const genreCount = {};
        books.forEach((book) => {
          if (genreStyles[book.genre]) {
            genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
          }
        });

        const sortedGenres = Object.entries(genreCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([name]) => name);

        const defaultGenres = Object.keys(genreStyles).filter(
          (g) => !sortedGenres.includes(g)
        );
        const finalGenres = [...sortedGenres, ...defaultGenres].slice(0, 8);

        setTopGenres(finalGenres);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchTopGenres();
  }, []);

  return (
    <section className="py-16 bg-[#F8F4E8] dark:bg-[#3B2A23] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-[#3B2C24] dark:text-[#F8F4E8] transition-colors duration-500">
          Top Genres
        </h2>

        {/* Grid with 2 rows */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
          {topGenres.map((genre) => (
            <div
              key={genre}
              className={`w-full h-44 bg-gradient-to-br ${genreStyles[genre].gradient} rounded-3xl flex flex-col items-center justify-center shadow-lg dark:shadow-gray-800 hover:shadow-2xl dark:hover:shadow-gray-700 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
            >
              <div className="mb-3">{genreStyles[genre].icon}</div>
              <h3 className="text-lg font-semibold text-[#3B2C24] dark:text-[#F8F4E8]">
                {genre}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
