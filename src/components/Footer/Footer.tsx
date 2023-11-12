import React, { FC } from "react";
import logo from "../../assets/photo/logo.png";
import styles from "./footer.module.scss";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.box}>
          <Link to={"/catalog"}>
            <img src={logo} alt="LOGO" />
          </Link>

          <p style={{ color: "#fff" }}>© 2010 - 2023</p>
        </div>
        <div className={styles.box}>
          <h3>Компания</h3>
          <Link to={"/catalog"}>Каталог</Link>
          <Link to={"/brands"}>Бренды</Link>
          <Link to={"/projects"}>Проекты</Link>
          <Link to={"/feedback"}>Связаться с нами</Link>
          <Link to={"/about"}>О нас</Link>
        </div>
        <div className={styles.box}>
          <h3>Информация</h3>
          <Link to={"/about"}>Доставка</Link>
          <Link to={"/about"}>Сервис</Link>
        </div>
        <div className={styles.box}>
          <h3>Контакты</h3>
          <a type="tel">8 903 111 11 11</a>
          <Link to={"/about"}>8 800 333 68 29</Link>
          <Link to={"/about"}>Звонок по РФ бесплатный</Link>
          <Link to={"/about"}>info@dealer-center.ru</Link>
          <Link to={"/about"}>info@dealer-center.ru</Link>
          <a>125364, г. Москва, ул. Свободы, 50/3</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
