import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <div>Админа панель</div>
      <Link to={"/admin/goods"}>Товары</Link>
    </>
  );
};

export default Admin;
