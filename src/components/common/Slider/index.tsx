import React from "react";
import styles from "./slider.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { FC } from "react";
interface SliderInfoHome {
  id: number;
  active: boolean;
  img: string;
  title: string;
  content?: string;
  url?: string;
}
interface SliderProps {
  SliderInfo: SliderInfoHome | any; //todo добавить другой тип для другого слайдера (если будет)
  urlOf: string | null; //для того чтобы знать откуда брать файл на бэкенде (из какой папки)
}

export const Slider: FC<SliderProps> = ({ SliderInfo, urlOf }) => {
  return (
    <Swiper
      // @ts-ignore
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className={classNames("mySwiper", styles.slider)}
    >
      {SliderInfo.map((slide: SliderInfoHome) => (
        <SwiperSlide className={styles.item} key={slide.id}>
          <img
            src={`${process.env.REACT_APP_API_URL}/${urlOf}/${slide.img}`}
            alt="Картинка к слайдеру"
          />
          {/* // Нужно будет исправить */}
          <div className={styles.info}>
            <h3>{slide.title}</h3>
            <p>{slide.content}</p>
            {slide.url ? (
              <Link className="button" to={slide.url}>
                Подробнее
              </Link>
            ) : (
              ""
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Slider;
