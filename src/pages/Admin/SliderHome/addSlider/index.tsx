import React from "react";
import { useAppDispatch } from "../../../../redux/hooks/redux";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "../../Goods/AddGood/addgood.module.scss";
import { createSlideHome } from "../../../../redux/reducers/SliderSlice";

export interface CreateSliderHomeDto {
  active: boolean;
  img: File[];
  title: string;
  content?: string;
  url?: string;
}

const AddSliderHome = () => {
  const dispath = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSliderHomeDto>();
  const onSubmit: SubmitHandler<CreateSliderHomeDto> = (data) => {
    console.log("dataSlider", data);
    console.log("errors", errors);

    dispath(createSlideHome({ ...data }));
  };
  return (
    <>
      <h2 className={styles.h2}>Добавление слайдера</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className={styles.container}>
          <div className={styles.input_box}>
            <label>Заголовок на слайдере:</label>
            <input
              type="text"
              {...register("title", { required: true, maxLength: 40 })}
            />
          </div>
          <div className={styles.input_box}>
            <label>Фоновое изображение:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("img", { required: true })}
            />
          </div>
          <div className={styles.input_box}>
            <label>Ссылка на вшений источник (при нажатии на кнопку)</label>
            {/*  Если ссылки нет,то кнопка не появляется*/}
            <input type="text" {...register("url", {})} />
          </div>
          <div className={styles.input_box}>
            <label>Отображается ли у пользователей?</label>
            <label htmlFor="activeCheckbox">
              <input
                className={styles.check_box}
                type="checkbox"
                defaultChecked={true}
                {...register("active", {})}
              />
              да
            </label>
          </div>
          <div className={styles.input_box}>
            <label>Описание:</label>
            <textarea
              placeholder="Текст слайдера"
              {...register("content", {
                required: false,
                maxLength: 400,
              })}
            />
          </div>
        </div>
        <button type="submit">Создать</button>
      </form>
      {/*<h3 className={styles.h3}>Отображение слайдера</h3>*  todo сделать по возможности */}
    </>
  );
};

export default AddSliderHome;
