"use client";

import { BlogPostSummary } from "@/types/blog-post-summary.interface";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BlogPostCard } from "./blog-post-card";

import "swiper/css";
import "swiper/css/navigation";

type BlogPostCardListProps = {
  posts: BlogPostSummary[];
};

export const BlogPostCardList: React.FC = () => {
  return (
    <div className=" mt-10">
      {/* {posts?.map?.((post) => (
        <BlogPostCard key={`course-${post.slug}`} {...post} />
      ))} */}
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        dir="rtl"
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        //   rewind={true}Q
        loop={true}
        navigation={true}
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
