import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const brands = [
  { name: "PURSE", image: "/purse.webp" },
  { name: "SHOES", image: "/shoes.jpg" },
  { name: "HEELS", image: "/heels.webp" },
  { name: "SAREE", image: "/sarees.webp" },
  { name: "CLOTHS", image: "/cloths.jpg" },
  { name: "BAGS", image: "/bags.jpg" },
];

const PopularBrands = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">POPULAR ON OLY</h1>
      <Swiper
        spaceBetween={20}
        slidesPerView={2} // Default: 2 slides visible
        breakpoints={{
          768: { slidesPerView: 3 }, // On larger screens (≥768px), show 3 slides
        }}
        autoplay={{ delay: 2000 }} // Auto-slide every 2 sec
        loop={true} // Infinite loop
        modules={[Autoplay]}
        className="w-full"
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-64 object-cover"
              />
              <p className="text-center font-medium py-3">{brand.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularBrands;
