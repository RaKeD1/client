import React, { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Goods from "../../../pages/Admin/Goods";
import Profile from "../../../pages/Profile";
import styles from "./adminpanel.module.scss";
import AdminHeader from "../AdminHeader";
import TableTypes from "../../../pages/Admin/Types/TableTypes";
import AddType from "../../../pages/Admin/Types/AddType";
import AddBrand from "../../../pages/Admin/Brands/AddBrand";
import TableBrands from "../../../pages/Admin/Brands";
import AddGood from "../../../pages/Admin/Goods/AddGood";
import { useAppSelector } from "../../../redux/hooks/redux";
import { Alert } from "antd";
const pages = [
  { id: 1, title: "Аналитика", path: "analytics" },
  { id: 2, title: "Пользователи", path: "profile" },
  { id: 3, title: "Товары", path: "goods/add" },
  { id: 4, title: "Заявки", path: "requests" },
  { id: 5, title: "Категории", path: "types/add" },
  { id: 6, title: "Бренды", path: "brands/add" },
];
const AdminPanel = () => {
  const location = useLocation();
  const { message, status } = useAppSelector((state) => state.categories);
  useEffect(() => {}, [message, status]);
  const isActive = (path: any) => location.pathname === "/admin/" + path;
  return (
    <>
      {message !== "" ? <Alert message={message} type={status} /> : ""}
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
            <Route path="goods">
              <Route path="" element={<Goods />} />
              <Route path="add" element={<AddGood />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="categories" />
            <Route path="types">
              <Route path="" element={<TableTypes />} />
              <Route path="add" element={<AddType />} />
            </Route>
            <Route path="brands">
              <Route path="" element={<TableBrands />} />
              <Route path="add" element={<AddBrand />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
