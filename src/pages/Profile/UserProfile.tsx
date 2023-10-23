import React, { FC } from "react";
import { ProfileProps } from "./AdminProfile";
import styles from "./profile.module.scss";

const UserProfile: FC<ProfileProps> = ({ email, id, roles }) => {
  return (
    <>
      <div className={styles.container_info}>
        <label>Email:</label>
        <div>{email}</div>
      </div>
    </>
  );
};

export default UserProfile;
