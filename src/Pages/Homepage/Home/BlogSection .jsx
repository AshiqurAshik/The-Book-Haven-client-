import React from 'react';

const BlogSection = () => {
  return (
    <section className='mb-16'>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-[#3B2C24] mb-4">
          Latest Articles
        </h2>
        <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Stay updated with our curated articles, book reviews, and tips from
          the reading community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=60"
              alt="5 Must-Read Fiction Books"
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-xl text-[#3B2C24] mb-2">
                5 Must-Read Fiction Books of 2025
              </h3>
              <p className="text-gray-500 text-sm mb-4 flex-grow">
                Explore our handpicked fiction books that captivated readers
                this year.
              </p>
              <span className="text-xs text-gray-400 mb-3">
                By Jane Doe | 11/10/2025
              </span>
              <a
                href="#"
                className="mt-auto text-indigo-600 font-semibold hover:underline"
              >
                Read More
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=60"
              alt="Top Tips for Building a Reading Habit"
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-xl text-[#3B2C24] mb-2">
                Top Tips for Building a Reading Habit
              </h3>
              <p className="text-gray-500 text-sm mb-4 flex-grow">
                Learn simple and effective ways to read more books consistently.
              </p>
              <span className="text-xs text-gray-400 mb-3">
                By John Smith | 11/08/2025
              </span>
              <a
                href="#"
                className="mt-auto text-indigo-600 font-semibold hover:underline"
              >
                Read More
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col">
            <img
              src="https://images.ctfassets.net/3s5io6mnxfqz/1bagzWwicpBbwB9DmL23g3/d63178e10b414da72d37fd746586a067/AdobeStock_104556077.jpeg?w=1920"
              alt="The Evolution of Fantasy Literature"
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-xl text-[#3B2C24] mb-2">
                The Evolution of Fantasy Literature
              </h3>
              <p className="text-gray-500 text-sm mb-4 flex-grow">
                Dive into the world of fantasy and see how it has transformed
                over the years.
              </p>
              <span className="text-xs text-gray-400 mb-3">
                By Alice Johnson | 11/05/2025
              </span>
              <a
                href="#"
                className="mt-auto text-indigo-600 font-semibold hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
