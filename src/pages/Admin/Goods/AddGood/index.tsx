import React, { FC, useEffect } from "react";
import styles from "./addgood.module.scss";
import { CreateGoodDto } from "../../../../services/GoodService";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchCategories } from "../../../../redux/reducers/CategoriesSlice";
import { fetchBrands } from "../../../../redux/reducers/BrandsSlice";
import { createProduct } from "../../../../redux/reducers/GoodsSlice";
import ToolTipComponent from "../../../../components/common/ToolTipComponent";

const AddGood: FC = () => {
  const dispath = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const brands = useAppSelector((state) => state.brands.brands);
  const { status, error, res } = useAppSelector((state) => state.goods);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGoodDto>();
  const onSubmit: SubmitHandler<CreateGoodDto> = (data) => {
    console.log("adadata", data);
    console.log("errors", errors);
    console.log({ ...data });
    dispath(createProduct({ ...data }));
  };
  useEffect(() => {
    dispath(fetchCategories());
    dispath(fetchBrands());
  }, []);
  useEffect(() => {
    console.log("status", status);
  }, [status]);
  return (
    <>
      {status ? (
        <ToolTipComponent
          type={status}
          message={status !== "success" ? error : res}
        />
      ) : (
        ""
      )}
      <h2>Добавление товаров</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <div className={styles.input_box}>
            <label>Название товара:</label>
            <input
              placeholder="Например: Asus GeForce RTX 3060Ti OC 8Gb LHR V2 (DUAL-RTX3060TI-O8G-V2)"
              type="text"
              {...register("name", { required: true, maxLength: 60 })}
            />
          </div>
          <div className={styles.input_box}>
            <label>Категория:</label>
            {categories && categories.length > 0 ? (
              <select {...register("typeId", { required: true })}>
                <>
                  {categories && categories.length > 0 ? (
                    <>
                      {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.type_name}
                        </option>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </>
              </select>
            ) : (
              <span style={{ color: "red", margin: "20px 0" }}>
                Нет доступных категорий для выбора, сначала создайте категорию
              </span>
            )}
          </div>
          <div className={styles.input_box}>
            <label>Бренд:</label>
            <select {...register("brandId", { required: false })}>
              <>
                {brands && brands.length > 0 ? (
                  <>
                    {brands.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.brand_name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option disabled selected>
                    Нет доступных брендов для выбора
                  </option>
                )}
              </>
            </select>
          </div>
          <div className={styles.input_box}>
            <label>Цена:</label>
            <input
              placeholder="1200"
              type="number"
              {...register("price", { required: true, maxLength: 15 })}
            />
          </div>
          <div className={styles.input_box}>
            <label>Количество на складе:</label>
            <input
              placeholder="10"
              {...register("storage", { required: true, maxLength: 10 })}
            />
          </div>
          <div className={styles.input_box}>
            <label>Скрытый ли товар?</label>
            <label htmlFor="secretCheckbox">
              <input
                className={styles.check_box}
                type="checkbox"
                {...register("secret", {})}
              />
              да
            </label>
          </div>
          <div className={styles.input_box}>
            <label>Описание:</label>
            <textarea
              placeholder="Описание товара"
              {...register("description", { required: false, maxLength: 320 })}
            />
          </div>
        </div>
        <button type="submit">Создать</button>
      </form>
    </>
  );
};

export default AddGood;
