import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import GoodCard from "../../components/GoodCard";
import { fetchGoods } from "../../redux/reducers/GoodsSlice";
import styles from "./catalog.module.scss";
export const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGoods());
  }, []);

  const goods = useAppSelector((state) => state.goods.goods);
  console.log("goods: ", goods);
  const goodCards = useMemo(
    () =>
      goods?.map((good) => (
        <GoodCard
          key={good.id}
          name={good.name}
          main_img={good.main_img}
          price={good.price}
        />
      )),
    [goods],
  );
  return (
    <>
      <div className={styles.cards}>{goodCards}</div>
    </>
  );
};
export default Catalog;
