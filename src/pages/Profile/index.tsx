import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { logoutAccount } from "../../redux/reducers/AccountSlice";
import { IAccount } from "../../models/IAccount";
import styles from "./profile.module.scss";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";

export const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.account);
  console.log("loGin", user);
  const dispatch = useAppDispatch();
  if (!user) {
    return (
      <>
        <Link to={"/login"}>Войти в аккаунт</Link>
      </>
    );
  }
  return (
    <>
      {user?.roles.find((role) => role.name === "ADMIN") ? (
        <AdminProfile email={user.email} id={user.id} roles={user.roles} />
      ) : (
        <UserProfile email={user.email} id={user.id} />
      )}

      <button onClick={() => dispatch(logoutAccount())}>Выход</button>
    </>
  );
};
export default Profile;
