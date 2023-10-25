import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Goods from "../../../pages/Admin/Goods";
import Profile from "../../../pages/Profile";
import styles from "./adminpanel.module.scss";
import AdminHeader from "../AdminHeader";
const pages = [
  { id: 1, title: "Аналитика", path: "analytics" },
  { id: 2, title: "Пользователи", path: "profile" },
  { id: 3, title: "Товары", path: "goods" },
  { id: 4, title: "Заявки", path: "requests" },
  { id: 5, title: "Категории", path: "categories" },
  { id: 6, title: "Бренды", path: "brands" },
];
const AdminPanel = () => {
  const location = useLocation();
  const isActive = (path: any) => location.pathname === "/admin/" + path;
  return (
    <>
      <AdminHeader />
      <div className={styles.page}>
        <nav>
          <ul>
            {pages.map((page) => (
              <li className={isActive(page.path) ? styles.active : ""}>
                <Link key={page.id} to={page.path}>
                  {page.title}
                </Link>
              </li>
            ))}
            <li>
              <Link className={styles.exit} to={"/profile"}>
                Выход
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.main}>
          <Routes>
            <Route path="goods" element={<Goods />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
