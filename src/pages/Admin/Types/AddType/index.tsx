import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./addtype.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/redux";
import {
  addCategories,
  fetchCategories,
} from "../../../../redux/reducers/CategoriesSlice";
interface AddCatigoriesDTO {
  type_name: string;
  parent?: number;
  img?: string;
}
const AddType = () => {
  const dispath = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCatigoriesDTO>();
  useEffect(() => {
    dispath(fetchCategories());
  }, []);
  const categories = useAppSelector((state) => state.categories.categories);
  console.log("categories", categories);
  const onSubmit: SubmitHandler<AddCatigoriesDTO> = (data) => {
    console.log(data);
    console.log("errors", errors);
    console.log({ ...data });
    dispath(addCategories({ ...data }));
  };

  return (
    <>
      <h2>Добавление категории</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <div className={styles.input_box}>
            <label>Название категории:</label>
            <input
              type="text"
              placeholder="Например: Видеокарты"
              {...register("type_name", { required: true, maxLength: 60 })}
            />
          </div>
          <div className={styles.input_box}>
            <label>Выбирите родительскую категорию:</label>
            <select {...register("parent", { required: false })}>
              <>
                {categories && categories.length > 0 ? (
                  <>
                    <option selected value={undefined}>
                      Нет
                    </option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.type_name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option disabled selected>
                    Нет доступных категорий для выбора
                  </option>
                )}
              </>
            </select>
          </div>
        </div>

        <button type="submit">Создать</button>
      </form>
    </>
  );
};

export default AddType;