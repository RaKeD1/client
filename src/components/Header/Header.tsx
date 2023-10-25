import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import styles from "./header.module.scss";

import SearchBar from "../SearchBar";
import classNames from "classnames";
import { useAppSelector } from "../../redux/hooks/redux";
import Modal from "../Modal";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

const pages = [
  { id: 1, title: "Каталог", path: "/catalog" },
  { id: 2, title: "Проекты", path: "/projects" },
  { id: 3, title: "О нас", path: "/about" },
  { id: 4, title: "Где купить", path: "/shops" },
  { id: 5, title: "Бренды", path: "/brands" },
  { id: 6, title: "Контакты", path: "/contacts" },
];
const Header = (login: any, setLogin: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const location = useLocation();
  const itemCart = 33;
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(false);
  const [isOpen, setIsOpen] = useState(false); // todo Нужен ли?
  const [component, setComponent] = useState("login");
  const newIsAuth = useAppSelector((state) => state.account.isAuth);
  useEffect(() => {}, [showModal]);
  useEffect(() => {
    console.log("Сменился isAuth", isAuth);
    setIsAuth(newIsAuth);
    console.log(newIsAuth);
  }, [newIsAuth]);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= 1600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);
  const isActive = (path: any) => location.pathname === path;
  const onClickEdit = () => {
    setShowModal(true);
    console.log("showModal");
  };

  return (
    <header>
      <div>
        <Link to="/">Logo</Link>
      </div>
      <div className={styles.menu}>
        {pages.map((page) => (
          <Link
            key={page.id}
            color="primary"
            className={isActive(page.path) ? styles.active : ""}
            to={page.path}
          >
            {page.title}
          </Link>
        ))}
      </div>
      {isSmallScreen ? <SearchBar /> : ""}
      <div className={styles.box}>
        <div className={classNames(styles.login, styles.box__item)}>
          {isAuth ? (
            <Link
              className={location.pathname === "/profile" ? styles.active : ""}
              to="/profile"
            >
              Профиль
            </Link>
          ) : (
            <button onClick={() => onClickEdit()}>Войти</button>
          )}
        </div>

        <div className={classNames(styles.box__item, styles.cart)}>
          <Link
            className={location.pathname === "/cart" ? styles.active : ""}
            to="/cart"
          >
            Корзина
          </Link>
          <span className={styles.alert}>{itemCart}</span>
        </div>
      </div>
      <Modal isActive={showModal} setIsActive={setShowModal}>
        {component === "login" ? (
          <Login setComponent={setComponent} />
        ) : (
          <Registration setComponent={setComponent} />
        )}
      </Modal>
    </header>
  );
};

export default Header;
