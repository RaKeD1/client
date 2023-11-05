import React, { FC } from "react";
import styles from "./goodcard.module.scss";

interface GoodCardPromise {
  name: string;
  main_img: string;
  price: number;
}

const GoodCard: FC<GoodCardPromise> = ({ main_img, name, price }) => {
  return (
    <>
      <div className={styles.box}>
        {/*<div>{imgs.map((img)=>(*/}
        {/*    <img src={`${$api}/goods/${img}`} alt={'Photo'}/>*/}
        {/*    ))}*/}
        {/* </div>*/}
        <div>
          <img
            className={styles.img}
            src={process.env.REACT_APP_API_URL + "/good/" + main_img}
            alt={"GoodPhoto"}
          />
        </div>
        <p className={styles.title}>{name}</p>
        <p className={styles.price}>{price} ₽</p>
      </div>
    </>
  );
};

export default GoodCard;
