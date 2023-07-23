import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from './header.module.scss';

import SearchBar from '../SearchBar';
import classNames from 'classnames';

const pages = [
  { id: 1, title: 'Проекты', path: '/projects' },
  { id: 2, title: 'О нас', path: '/about' },
  { id: 3, title: 'Где купить', path: '/shops' },
  { id: 4, title: 'Бренды', path: '/brands' },
  { id: 5, title: 'Контакты', path: '/contacts' },
];
const Header = (login: any) => {
  const location = useLocation();
  const item = 33;
  const [isOpen, setIsOpen] = React.useState(false);
  console.log('login', login);

  const isActive = (path: any) => location.pathname === path;
  return (
    <header>
      <div>
        <Link to='/'>Logo</Link>
      </div>
      <div className={styles.menu}>
        {pages.map((page) => (
          <Link
            key={page.id}
            color='primary'
            className={isActive(page.path) ? styles.active : ''}
            to={page.path}>
            {page.title}
          </Link>
        ))}
      </div>
      <SearchBar />
      <div className={styles.box}>
        {login.login ? (
          <div className={classNames(styles.login, styles.box__item)}>
            <Link to='/login'>Войти</Link>
          </div>
        ) : (
          <div className={classNames(styles.login, styles.box__item)}>
            <Link className={location.pathname === '/profile' ? styles.active : ''} to='/profile'>
              Профиль
            </Link>
          </div>
        )}

        <div className={classNames(styles.box__item, styles.cart)}>
          <Link className={location.pathname === '/cart' ? styles.active : ''} to='/cart'>
            Корзина
          </Link>
          <span className={styles.alert}>{item}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
