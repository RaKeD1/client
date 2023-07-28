import React from 'react';
import styles from './slider.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import photo from '../../assets/photo/1.jpg';

export const Slider = (props) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className={classNames('mySwiper', styles.slider)}>
      {props.SliderInfo.map((slide) => (
        <SwiperSlide className={styles.item} key={slide.id}>
          <img src={photo} alt='Картинка к слайдеру' /> {/* // Нужно будет исправить */}
          <div className={styles.info}>
            <h3>{slide.title}</h3>
            <p>{slide.discription}</p>
            <Link className='button' to='/'>
              Подробнее
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Slider;
