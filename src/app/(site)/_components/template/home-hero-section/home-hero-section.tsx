"use client";

// Import Swiper React components
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export const HomeHeroSection: React.FC = () => {
  return (
    <section className="max-w-[95vw] mx-auto h-[180px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-2xl mt-10">
      <Swiper
        rewind={true}
        navigation={true}
        autoplay={{ delay: 1500 }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper "
      >
        <SwiperSlide className="w-full">
          <img
            src="https://24ec4c9094095152f26c.cdn6.editmysite.com/uploads/b/24ec4c9094095152f26c4b4e05e7e4c5c3e8bae9a8cd83b6e8e66f7c86a04977/2021-09-13_19-32-49_1631576015.jpg?width=2400&optimize=medium&height=480&fit=cover&dpr=2.625"
            alt="first"
            className="w-full object-cover h-[180px] md:h-[300px] lg:h-[400px]"
          />
        </SwiperSlide>
        <SwiperSlide className="w-full">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/030/760/991/small_2x/morning-brew-with-a-view-coffee-cups-and-coffee-beans-amidst-mountain-majesty-generative-ai-photo.jpg"
            alt="first"
            className="w-full object-cover h-[180px] md:h-[300px] lg:h-[400px]"
          />
        </SwiperSlide>
        <SwiperSlide className="w-full">
          <img
            src="https://static.vecteezy.com/system/resources/previews/023/340/986/large_2x/coffee-banner-collage-photo.jpg"
            alt="first"
            className="w-full object-cover h-[180px] md:h-[300px] lg:h-[400px]"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
