import React, { FC } from "react";
import styles from "./profile.module.scss";
import { IAccount, IRoles } from "../../models/IAccount";
import { Link } from "react-router-dom";

export interface ProfileProps {
  email: string;
  roles?: IRoles[];
  id: number;
}

const AdminProfile: FC<ProfileProps> = ({ email, roles }) => {
  return (
    <>
      <div className={styles.container_info}>
        <label>Email:</label>
        <div>{email}</div>
      </div>
      <div className={styles.container_info}>
        {roles?.map((role, index) => (
          <div key={index} className={styles.role_item}>
            <label>Роль {index + 1}:</label>
            <div>{role.name}</div>
            <label>Описание роли:</label>
            <div>{role.description}</div>
          </div>
        ))}
      </div>
      <Link to={"/admin"}>Админ панель</Link>
    </>
  );
};

export default AdminProfile;
