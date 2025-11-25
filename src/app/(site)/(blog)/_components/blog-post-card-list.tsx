"use client";

import { BlogPostSummary } from "@/types/blog-post-summary.interface";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BlogPostCard } from "./blog-post-card";

import "swiper/css";
import "swiper/css/navigation";

type BlogPostCardListProps = {
  posts: BlogPostSummary[];
};

export const BlogPostCardList: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className=" mt-10">
      {/* {posts?.map?.((post) => (
        <BlogPostCard key={`course-${post.slug}`} {...post} />
      ))} */}
      <Swiper
        dir="rtl"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        navigation={!isMobile}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper articles_slider"
      >
        <SwiperSlide>
          <BlogPostCard />
        </SwiperSlide>
        <SwiperSlide>
          <BlogPostCard />
        </SwiperSlide>
        <SwiperSlide>
          <BlogPostCard />
        </SwiperSlide>
        <SwiperSlide>
          <BlogPostCard />
        </SwiperSlide>
        <SwiperSlide>
          <BlogPostCard />
        </SwiperSlide>
        <SwiperSlide>
          <BlogPostCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
