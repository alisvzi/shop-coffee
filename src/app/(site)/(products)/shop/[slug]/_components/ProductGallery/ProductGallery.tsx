"use client";
import { useState } from "react";
import type { CSSProperties } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const images = [
    "https://set-coffee.com/wp-content/uploads/2020/12/Gold-DG-700x700.jpg",
    "https://set-coffee.com/wp-content/uploads/2020/12/Gold-box-DG--150x150.jpg",
  ];

  return (
    <section style={{ width: "36%" }}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        } as CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        {images.map((img) => (
          <SwiperSlide key={Math.random()}>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-slider-2"
      >
        {images.map((img) => (
          <SwiperSlide key={Math.random()}>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductGallery;
