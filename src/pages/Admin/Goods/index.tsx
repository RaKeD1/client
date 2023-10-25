import React, { FC, useState } from "react";
import styles from "./goods.module.scss";
import { CreateGoodDto } from "../../../services/GoodService";
import { createProduct } from "../../../services/Good-service";

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
  console.log(good);

  return (
    <>
      <h2>Добавление товаров</h2>
      <form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.input_box}>
            <label>Название товара:</label>
            <input
              placeholder=""
              type="text"
              name="name"
              value={good.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.input_box}>
            <label>Тип:</label>
            <input
              placeholder="Например: Видеокарты"
              type="text"
              name="type"
              value={good.type}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.input_box}>
            <label>Бренд:</label>
            <input
              placeholder=""
              name="brand"
              value={good.brand}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.input_box}>
            <label>Цена:</label>
            <input
              placeholder=""
              type="number"
              name="price"
              value={good.price}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.input_box}>
            <label>Количество на складе:</label>
            <input
              placeholder=""
              name="storage"
              value={good.storage}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.input_box}>
            <label>Скрытый ли товар?</label>
            <label htmlFor="secretCheckbox">
              <input
                className={styles.check_box}
                type="checkbox"
                name="secret"
                id="secretCheckbox"
                checked={good.secret}
                onChange={(e) => setGood({ ...good, secret: e.target.checked })}
              />
              да
            </label>
          </div>
          <div className={styles.input_box}>
            <label>Описание:</label>
            <textarea
              placeholder="Описание товара"
              name="description"
              value={good.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit">Создать</button>
      </form>
    </>
  );
};

export default Goods;
