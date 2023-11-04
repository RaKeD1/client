import { FC, useState } from "react";
import styles from "./login.module.scss";
import { useAppDispatch } from "../../../redux/hooks/redux";
import { loginAccount } from "../../../redux/reducers/AccountSlice";

interface LoginProps {
  setComponent: (value: string) => void;
}

export const Login: FC<LoginProps> = ({ setComponent }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  // useLayoutEffect(() => {
  //   console.log(login);
  //     setLogin(false);
  // }, [setLogin]);
  const openRegisrModal = () => setComponent("registration");
  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <span></span>
        <div className={styles.content}>
          <h2>Вход в аккаунт</h2>
          <div className={styles.inputs}>
            <div className={styles.oneInput}>
              <label>Логин</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.input}
              />
            </div>
            <div className={styles.oneInput}>
              <label>Пароль</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={styles.input}
              />
            </div>
            <div className={styles.link_box}>
              <button className={styles.link} onClick={() => openRegisrModal()}>
                Зарегестрироваться
              </button>
            </div>
            <button
              className={styles.link}
              type="submit"
              onClick={() => dispatch(loginAccount({ email, password }))}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
