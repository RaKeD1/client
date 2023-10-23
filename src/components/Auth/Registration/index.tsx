import { FC, useLayoutEffect, useState } from "react";
import styles from "./registration.module.scss";
import { useAppDispatch } from "../../../redux/hooks/redux";
import { registrAccount } from "../../../redux/reducers/AccountSlice";

interface RegistrProps {
  setComponent: (value: string) => void;
}

export const Registration: FC<RegistrProps> = ({ setComponent }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const dispatch = useAppDispatch();

  // useLayoutEffect(() => {
  //   console.log(login);
  //     setLogin(false);
  // }, [setLogin]);
  const OpenLogin = () => setComponent("login");

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <span></span>
        <div className={styles.content}>
          <h2>Регистрация</h2>
          <div className={styles.inputs}>
            <div className={styles.oneInput}>
              <label>Почта</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)} // todo Исправть если что функцию
                value={email}
                className={styles.input}
              />
            </div>
            <div className={styles.oneInput}>
              <label>Телефон</label>
              <input
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
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
            <div className={styles.oneInput}>
              <label>Повторите пароль</label>
              <input
                type="password"
                onChange={(e) => setPasswordCheck(e.target.value)}
                value={passwordCheck}
                className={styles.input}
              />
            </div>
            <div className={styles.link_box}>
              <button className={styles.link} onClick={() => OpenLogin()}>
                Войти
              </button>
            </div>
            <button
              type="submit"
              onClick={() => dispatch(registrAccount({ email, password }))}
            >
              Зарегестироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
