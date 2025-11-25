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

const ProductGallery = ({ imageUrl }: { imageUrl: string }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const images = [imageUrl, imageUrl, imageUrl];

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
        {images.map((img, idx) => (
          <SwiperSlide key={`main-${idx}`}>
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
        {images.map((img, idx) => (
          <SwiperSlide key={`thumb-${idx}`}>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductGallery;
