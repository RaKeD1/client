import {FC, useLayoutEffect, useState} from "react";
import styles from "./login.module.scss";
import {useAppDispatch} from "../../../redux/hooks/redux";
import {loginAccount} from "../../../redux/reducers/AccountSlice";

interface LoginProps {
  setLogin: (value: boolean) => void ;
  login?: boolean;
}

export const Login: FC<LoginProps> = ({setLogin,login}) => {
  const [email, setEmail]=useState<string>('');
  const [password, setPassword]=useState<string>('');
  const dispatch = useAppDispatch();


  // useLayoutEffect(() => {
  //   console.log(login);
  //     setLogin(false);
  // }, [setLogin]);

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <span></span>
        <div className={styles.content}>
          <h2>Вход в аккаунт</h2>
          <div className={styles.inputs}>
            <div className={styles.oneInput}>
              <label>Логин</label>
              <input type="email"
                     onChange={e =>  setEmail(e.target.value)}// todo Исправть если что функцию
                     value={email}
                     className={styles.input} />
            </div>
            <div className={styles.oneInput}>
              <label>Пароль</label>
              <input type="password"
                     onChange={e => setPassword(e.target.value)}
                     value={password}
                     className={styles.input} />
            </div>
            <button type='submit' onClick={()=>
              dispatch(loginAccount({email,password}))
            }>Войти</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
