import React from "react";

const notifications = [

];

const PoshmarkSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#fdfaf4] p-10">
     
      <div className="relative w-full md:w-1/2 flex flex-col items-center">
       
        <div className="relative w-80 h-80">
          <img
            src="/girls1.webp"
            alt="Posh Show"
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          />
        </div>

       
        <div className="absolute top-24 left-5 w-52 h-52 bg-white rounded-lg shadow-lg">
          <img
            src="/girls2.avif"
            alt="Closet"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="absolute top-48 left-42 w-40 h-40 bg-white rounded-lg shadow-lg">
          <img
            src="/girls3.avif"
            alt="Delivery"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

       
        <div className="absolute bottom-[-20px] left-[-10px] w-60">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow-md mb-2 flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-sm">
                  <span className="font-semibold">{note.user}</span> {note.text}
                </p>
                <p className="text-xs text-gray-500">{note.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start mb-0">
          <span className="text-yellow-500 text-9xl font-bold">*</span>
        </div>
        <h2 className="text-3xl font-bold mb-4">
          OLY connects you to people and closets
        </h2>
        <p className="text-gray-900 text-xl">
        Discover a vibrant community where you can buy, sell, or rent stylish pre-loved items with ease! Connect with university friends to find unique fashion pieces, trendy accessories, and must-have beauty products. No middlemen, no shipping—just simple, social, and sustainable shopping 
        through personal meetups. Start exploring today!
        </p>
      </div>
    </div>
  );
};

export default PoshmarkSection;
