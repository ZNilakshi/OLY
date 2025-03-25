import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("seller");

  
  const sellerContent = [
    { img: "/list.webp", title: "LIST IT", text: "Closet full of clothes you never wear? Snap a photo, price it, and list it in less than 60 seconds—right from your phone!" },
    { img: "/share.jpg", title: "SHARE IT",  text: "Share listings with your followers and use daily themed parties to help shoppers discover your listings! More sharing = more sales." },
    { img: "/earn.webp", title: "EARN CASH", text: "Shipping is easy with our prepaid labels, and you’ll earn cash once the item is delivered!" },
  ];

  const buyerContent = [
    { img: "/find.jpg", title: "FIND YOUR STYLE", text: "Discover a wide selection of items across thousands of brands, styles, sizes, and trends—at prices up to 70% off." },
    { img: "/follow.jpg", title: "FOLLOW + LIKE", text: "Be the first to see what’s new by following your favorite closets and brands. Like listings to save them and get notified of special offers and discounts." },
    { img: "/score.webp", title: "SCORE DEALS", text: "There are so many new deals to uncover every day. Make an offer and name your price, or join the fun and place a bid on a live show auction—starting as low as $3!" },
  ];
  const content = activeTab === "seller" ? sellerContent : buyerContent;

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">HOW IT WORKS</h2>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`pb-2 border-b-2 ${activeTab === "seller" ? "border-pink-500 font-semibold" : "border-transparent"}`}
          onClick={() => setActiveTab("seller")}
        >
          I AM A SELLER
        </button>
        <button
          className={`pb-2 border-b-2 ${activeTab === "buyer" ? "border-pink-500 font-semibold" : "border-transparent"}`}
          onClick={() => setActiveTab("buyer")}
        >
          I AM A BUYER
        </button>
      </div>

     
      <div className="md:hidden px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          {content.map((item, index) => (
            <SwiperSlide key={index} className="text-center">
              <img src={item.img} alt={item.title} className="rounded-lg mx-auto w-50 h-60 object-cover" />
              <h3 className="font-bold mt-2 mb-4">{item.title}</h3>
              <p className="text-sm mt-2">{item.text}</p>
              <br></br>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

     
      <div className="hidden md:grid md:grid-cols-3 gap-8 px-4">
        {content.map((item, index) => (
          <div key={index} className="text-center">
            <img src={item.img} alt={item.title} className="rounded-lg mx-auto w-full object-cover" />
            <h3 className="font-bold mt-4">{item.title}</h3>
            <p className="text-sm mt-2">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;