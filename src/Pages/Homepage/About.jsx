import React from 'react';
import { BookOpenIcon, StarIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
  const features = [
    {
      icon: <BookOpenIcon className="w-12 h-12 text-indigo-600" />,
      title: 'Explore by Genre',
      desc: 'Discover books across Fiction, Mystery, Romance, Sci-Fi, Fantasy, and more.',
    },
    {
      icon: <StarIcon className="w-12 h-12 text-yellow-500" />,
      title: 'Top Rated Books',
      desc: 'Check out the highest-rated books recommended by readers worldwide.',
    },
    {
      icon: <ClockIcon className="w-12 h-12 text-red-500" />,
      title: 'Recent Arrivals',
      desc: 'Stay updated with the latest books added to our platform every week.',
    },
    {
      icon: <UsersIcon className="w-12 h-12 text-green-500" />,
      title: 'Community Picks',
      desc: 'Explore curated lists and reviews from our passionate book community.',
    },
  ];

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3B2C24] mb-6 leading-tight">
          Why Choose Book Haven
        </h2>
        <p className="text-lg md:text-xl text-[#3B2C24] max-w-3xl mx-auto mb-16 leading-relaxed">
          Book Haven is designed for book lovers who want to explore, discover,
          and share amazing stories. Our platform brings you the best books,
          top-rated picks, and a vibrant community of readers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-10 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-[#3B2C24]">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <Link
          to="/all-books"
          className="inline-block mt-16 mb-10 bg-[#4C3A2F] text-white py-3 px-10 rounded-full text-lg font-semibold hover:bg-[#3B2C24] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Explore Books
        </Link>
      </div>
    </section>
  );
};

export default About;
