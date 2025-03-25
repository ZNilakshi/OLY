import React from 'react';
import { FaRecycle, FaLeaf, FaUsers, FaHandsHelping, FaHeart } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';
import { BsShop } from 'react-icons/bs';

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-50 to-teal-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Making Pre-Loved <span className="text-teal-600">Stylish</span> and <span className="text-green-600">Sustainable</span>
              </h1>
              <p className="text-xl  text-gray-600 mb-8">
                At StyleCycle, we're on a mission to make buying, selling, or renting pre-loved items your first choice. Join our community of fashion-forward, eco-conscious individuals.
              </p>
              <a 
                href="http://localhost:3000/" 
                className="inline-block text-xl bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Join the Movement
              </a>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Vintage clothing" 
                  className="rounded-lg shadow-lg object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Sustainable fashion" 
                  className="rounded-lg shadow-lg object-cover h-64 w-full mt-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Second hand shopping" 
                  className="rounded-lg shadow-lg object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Fashion community" 
                  className="rounded-lg shadow-lg object-cover h-64 w-full mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              One Vision, <span className="text-teal-600">Countless Stories</span>
            </h2>
            <div className="mt-4 h-1 w-20 bg-teal-500 mx-auto"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-stretch gap-8">
            <div className="lg:w-1/2 h-full">
              <img 
                src="/2.jpg" 
                alt="Our story" 
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">From a Simple Idea</h3>
              <p className="text-xl text-gray-600 mb-6">
                Our journey began with a simple belief: quality items deserve a second life. What started as a small initiative to connect people with stylish pre-loved items has grown into a vibrant platform where every item tells a story and every transaction supports a sustainable future.
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 mt-10">To a Thriving Community</h3>
              <p className="text-xl text-gray-600">
                Today, StyleCycle connects buyers, sellers, and renters from diverse backgrounds, united by a shared love for great style and conscious living. With a passionate team working behind the scenes, we're creating a marketplace that blends fashion with purpose.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              More Than Just <span className="text-green-600">Fashion</span>
            </h2>
            <div className="mt-4 h-1 w-20 bg-green-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <div className="text-green-500 mb-4">
                <GiClothes className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Curated Selection</h3>
              <p className="text-gray-600">
                From everyday essentials to luxury finds, our platform features a wide range of pre-loved items carefully selected for quality and style.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <div className="text-green-500 mb-4">
                <FaRecycle className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Circular Economy</h3>
              <p className="text-gray-600">
                By extending the lifecycle of fashion items, we're reducing waste and promoting a more sustainable approach to consumption.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <div className="text-green-500 mb-4">
                <FaLeaf className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Eco-Friendly Impact</h3>
              <p className="text-gray-600">
                Each pre-loved purchase saves significant resources, making a real difference for our planet's future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Better Choices for a <span className="text-teal-600">Better Planet</span>
            </h2>
            <div className="mt-4 h-1 w-20 bg-teal-500 mx-auto"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Environmental Commitment</h3>
              <p className="text-xl text-gray-600 mb-6">
                We believe pre-loved is not only better for your wardrobe and wallet but also for the planet. By choosing pre-loved, you're making a statement that style can be both sustainable and affordable.
              </p>
              <p className="text-xl text-gray-600 mb-6">
                The fashion industry is one of the largest polluters globally. By extending the life of clothing by just 9 months, we can reduce its carbon, water, and waste footprints by 20-30% each.
              </p>
              <p className="text-gray-600 font-medium">
                Together, we can make a difference, one item at a time.
              </p>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Sustainable impact" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our <span className="text-teal-600">Team</span>
            </h2>
            <div className="mt-4 h-1 w-20 bg-teal-500 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              StyleCycle is powered by a team of dedicated professionals and supported by a growing community of users who share our passion for pre-loved fashion and sustainable living.
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
  {[
    { 
      name: "Nilakshi Samarasekara", 
      role: "Founder", 
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Software Engineering undergraduate from SUSL "
    },
    { 
      name: "Malshika Insari", 
      role: "Founder", 
      img: "https://randomuser.me/api/portraits/women/63.jpg",
      bio: "Software Engineering undergraduate from SUSL"
    }
  ].map((member, index) => (
    <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="md:w-1/3">
        <img 
          src={member.img} 
          alt={member.name} 
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
      
      {/* Content Section */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-teal-600 font-medium">{member.role}</p>
          </div>
          
          <p className="text-gray-600 mb-4">{member.bio}</p>
        
        </div>
        
        <div className="flex items-center justify-end border-t pt-4">
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            Connect
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
            Ready to Join the <span className="text-yellow-200">StyleCycle</span> Community?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Discover the joy of buying, selling, or renting stylish pre-loved items and be part of a movement that's changing how we consume fashion.
          </p>
          <p className="mt-10 text-teal-100 flex items-center justify-center">
            <FaHeart className="mr-2" /> At StyleCycle, we're more than just a marketplace—we're a community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;