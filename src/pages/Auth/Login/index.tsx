import { FC, useLayoutEffect } from "react";
import styles from "./login.module.scss";

interface LoginProps {
  setLogin: (value: boolean) => void;
  login?: boolean;
}

export const Login: FC<LoginProps> = ({ setLogin }) => {
  useLayoutEffect(() => {
    setLogin(false);
  }, [setLogin]);

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <span></span>
        <div className={styles.content}>
          <h2>Вход в аккаунт</h2>
          <div className={styles.inputs}>
            <div className={styles.oneInput}>
              <label>Логин</label>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.oneInput}>
              <label>Пароль</label>
              <input type="text" className={styles.input} />
            </div>
            <button>Авторизация</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
