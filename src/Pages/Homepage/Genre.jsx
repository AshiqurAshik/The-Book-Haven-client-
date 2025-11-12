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
    gradient: 'from-blue-100 to-blue-50',
  },
  Mystery: {
    icon: <UsersIcon className="w-10 h-10 text-green-600" />,
    gradient: 'from-green-100 to-green-50',
  },
  'Sci-Fi': {
    icon: <RocketIcon className="w-10 h-10 text-purple-600" />,
    gradient: 'from-purple-100 to-purple-50',
  },
  Romance: {
    icon: <HeartIcon className="w-10 h-10 text-red-600" />,
    gradient: 'from-red-100 to-red-50',
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
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
          Top Genres
        </h2>

        {/* Grid with 2 rows */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
          {topGenres.map((genre) => (
            <div
              key={genre}
              className={`w-full h-44 bg-gradient-to-br ${genreStyles[genre].gradient} rounded-3xl flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
            >
              <div className="mb-3">{genreStyles[genre].icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{genre}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
