import React, { useEffect } from "react";
import styles from "./feedback.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { fetchAdmins } from "../../redux/reducers/UserSlice";
interface AddFeedBackDTO {
  description: string;
  id_admin: number;
  reason: string;
}
const FeedBack = () => {
  const dispath = useAppDispatch();
  const admins = useAppSelector((state) => state.users.users);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFeedBackDTO>();

  const onSubmit: SubmitHandler<AddFeedBackDTO> = (data) => {
    console.log(data);
    console.log("errors", errors);
    console.log({ ...data });
    // dispath(addFeedBack({ ...data }));
  };
  useEffect(() => {
    dispath(fetchAdmins());
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.feedback}>
        <h2>Отзыв для администратора</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.container}>
            <div className={styles.input_box}>
              <label>Выбирите родительскую категорию:</label>
              {admins && admins.length > 0 ? (
                <select {...register("id_admin", { required: true })}>
                  <>
                    {admins.map((item) => (
                      <option
                        className={styles.option}
                        key={item.id}
                        value={item.id}
                      >
                        {item.email} [ADMIN]
                      </option>
                    ))}
                  </>
                </select>
              ) : (
                <span style={{ color: "red", margin: "20px 0" }}>
                  Нет доступных админов для выбора
                </span>
              )}
            </div>
            <div className={styles.input_box}>
              <label>Заголовок:</label>
              <input
                type="text"
                placeholder=""
                {...register("reason", { required: true, maxLength: 100 })}
              />
            </div>
            <div className={styles.input_box}>
              <label>Подробное описание:</label>
              <textarea
                {...register("description", {
                  required: true,
                  maxLength: 700,
                })}
              />
            </div>
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};
export default FeedBack;
