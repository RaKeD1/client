import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./header.module.scss";

import SearchBar from "../common/SearchBar";
import classNames from "classnames";
import { useAppSelector } from "../../redux/hooks/redux";
import Modal from "../common/Modal";
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

const StyledLink = memo((props: any) => {
  const { page, isActive } = props;
  return (
    <Link
      key={page.id}
      color="primary"
      className={isActive(page.path) ? styles.active : ""}
      to={page.path}
    >
      {page.title}
    </Link>
  );
});

const Header = (login: any, setLogin: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const location = useLocation();
  const itemCart = 0;
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(false);
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
          <StyledLink
            key={page.id}
            isActive={() => isActive(page.path)}
            page={page}
          />
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
const MemoizedHeader = memo(Header);

export default MemoizedHeader;
