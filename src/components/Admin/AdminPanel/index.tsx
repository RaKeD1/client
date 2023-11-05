import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Goods from "../../../pages/Admin/Goods";
import Profile from "../../../pages/Profile";
import styles from "./adminpanel.module.scss";
import AdminHeader from "../AdminHeader";
import TableTypes from "../../../pages/Admin/Types/TableTypes";
import AddType from "../../../pages/Admin/Types/AddType";
import AddBrand from "../../../pages/Admin/Brands/AddBrand";
import TableBrands from "../../../pages/Admin/Brands";
import AddGood from "../../../pages/Admin/Goods/AddGood";
import AddSliderHome from "../../../pages/Admin/SliderHome/addSlider";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null,
  type?: "group" | null,
  danger?: boolean,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    danger,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Аналитика", "analytics", null),

  getItem("Пользователи", "sub2", null, [
    getItem("Все пользователи", "5"),
    getItem("Админы", "6"),
  ]),

  getItem("Товары", "sub3", null, [
    getItem("Список товаров", "goods"),
    getItem("Добавление товара", "goods/add"),
  ]),

  getItem("Бренды", "sub4", null, [
    getItem("Список брендов", "brands"),
    getItem("Добавление бренда", "brands/add"),
  ]),

  getItem("Категории", "sub5", null, [
    getItem("Список категорий", "types"),
    getItem("Добавление категории", "types/add"),
  ]),

  getItem("Слайдеры", "sub6", null, [
    getItem("Список слайдов", "slider"),
    getItem("Добавление слайда", "slider/add"),
  ]),

  getItem("Заявки", "sub7", null, [getItem("Список заявок", "requests")]),
  getItem("Выход", "exit", null),
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "exit") {
      navigate("/profile");
    } else {
      navigate("/admin/" + e.key);
    }
    console.log("click ", e);
    console.log(window.location.pathname);
  };
  return (
    <>
      <AdminHeader />

      <div
        className={styles.page}
        style={{ display: "flex", margin: "40px 0" }}
      >
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                colorPrimary: "#f0b7a5",
                itemSelectedBg: "#ffdbd2",
              },
            },
          }}
        >
          <Menu
            onClick={onClick}
            style={{ width: 350, marginLeft: 20, marginRight: 20 }}
            defaultSelectedKeys={[
              window.location.pathname.replace("/admin/", ""),
            ]}
            defaultOpenKeys={[window.location.pathname.replace("/admin/", "")]}
            mode="vertical"
            items={items}
          />
        </ConfigProvider>

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
            <Route path="slider">
              <Route path="" element={""} />
              <Route path="add" element={<AddSliderHome />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
