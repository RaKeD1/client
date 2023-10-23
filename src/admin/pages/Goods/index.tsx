import React, { FC, useState } from "react";
import styles from "../../admin.module.scss";
import { CreateGoodDto } from "../../../services/GoodService";
import { createProduct } from "./service/Good-service";

const Goods: FC = () => {
  const [good, setGood] = useState<CreateGoodDto>({
    name: "",
    img: "",
    price: "",
    storage: "",
    description: "",
    secret: false,
    brand: "",
    type: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setGood({
      ...good,
      [name]: value,
    });
    console.log(good);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Отправить данные на сервер:", good);
    createProduct(good);
  };

  return (
    <>
      <h2>Добавление товаров</h2>
      <form className={styles.form}>
        <label>Название товара:</label>
        <input
          className={styles.input}
          placeholder=""
          type="text"
          name="name"
          value={good.name}
          onChange={handleInputChange}
        />
        <label>Тип:</label>
        <input
          className={styles.input}
          placeholder=""
          type="text"
          name="type"
          value={good.type}
          onChange={handleInputChange}
        />
        <label>Бренд:</label>
        <input
          className={styles.input}
          placeholder=""
          name="brand"
          value={good.brand}
          onChange={handleInputChange}
        />
        <label>Цена:</label>
        <input
          className={styles.input}
          placeholder=""
          type="number"
          name="price"
          value={good.price}
          onChange={handleInputChange}
        />
        <label>Количество на складе:</label>
        <input
          className={styles.input}
          placeholder=""
          name="storage"
          value={good.storage}
          onChange={handleInputChange}
        />
        <label>Описание:</label>
        <input
          className={styles.input}
          placeholder=""
          name="description"
          value={good.description}
          onChange={handleInputChange}
        />
        <label>Скрытый ли товар?</label>
        <input
          className={styles.input}
          placeholder=""
          type="checkbox"
          name="secret"
          checked={good.secret}
          onChange={handleInputChange}
        />
        <button type="submit">Создать</button>
      </form>
    </>
  );
};

export default Goods;
