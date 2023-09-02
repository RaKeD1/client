import styles from './brandSlider.module.scss';
import photo from '../../assets/photo/1.jpg';
import { Link } from 'react-router-dom';
export const BrandsSlider = () => {
  // На будущее для получения массива и разделения его на две части
  // var half_length = Math.ceil(arrayName.length / 2);

  // var leftSide = arrayName.slice(0, half_length);
  return (
    <section id={styles.brandsSlider}>
      <span className={styles.gradient}></span>
      <div className={styles.brands}>
        <div className={styles.titles}>
          <h2>Бренды</h2>
          <Link to='/brands'>Посмотреть все</Link>
        </div>
        <div className={styles.infinite}>
          <div className={styles.row1}>
            <span>
              <img src={photo} alt='' />
              <img src={photo} alt='' />
              <img src={photo} alt='' />
              <img src={photo} alt='' />
            </span>
            <span>
              <img src={photo} alt='' />
              <img src={photo} alt='' />
              <img src={photo} alt='' />
              <img src={photo} alt='' />
            </span>
          </div>
        </div>
        <div className={styles.infiniteReverse}>
          <div className={styles.row2}>
            <span>
              <img src={photo} alt='' />
              <img src={photo} alt='' />
              <img src={photo} alt='' />
              <img src={photo} alt='' />
            </span>
            <span>
              <img src={photo} alt='' />
              <img src={photo} alt='' />
              <img src={photo} alt='' />
              <img src={photo} alt='' />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSlider;
