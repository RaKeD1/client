import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./addbrand.module.scss";
import { useAppDispatch } from "../../../../redux/hooks/redux";
import { addBrand } from "../../../../redux/reducers/BrandsSlice";

interface AddBrandDTO {
  brand_name: string;
  brand_logo?: string;
  description?: string;
  url?: string;
  img?: File[];
}
const AddBrand = () => {
  const dispath = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBrandDTO>();

  const onSubmit: SubmitHandler<AddBrandDTO> = (data) => {
    console.log(data);
    console.log("errors", errors);
    dispath(addBrand({ ...data }));
  };

  return (
    <>
      <h2 className={styles.h2}>Добавление бренда</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <div className={styles.input_box}>
            <label>Название бренда:</label>
            <input
              type="text"
              placeholder="Например: NVIDIA"
              {...register("brand_name", { required: true, maxLength: 60 })}
            />
          </div>
          <div className={styles.input_box}>
            <label>Ссылка на бренд:</label>
            <input
              type="text"
              placeholder="https://www.nvidia.com"
              {...register("url", { required: false, maxLength: 120 })}
            />
          </div>
          <div className={styles.input_box}>
            <label>Фоновое изображение:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("brand_logo", { required: false })}
            />
          </div>
          <div className={styles.input_box}>
            <label>Описание бренда:</label>
            <textarea
              placeholder="Описание"
              {...register("description", { required: false, maxLength: 600 })}
            />
          </div>
        </div>

        <button type="submit">Создать</button>
      </form>
    </>
  );
};

export default AddBrand;
