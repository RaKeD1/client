import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Table } from "antd";
import { deleteGood, fetchGoods } from "../../../redux/reducers/GoodsSlice";
import { IGood } from "../../../models/IGood";

const TableGoods: FC = () => {
  const dispatch = useAppDispatch();
  const goods = useAppSelector((state) => state.goods.goods);
  const columns: ColumnsType<IGood> = [
    {
      title: "Название товара",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Кол-во на складе",
      key: "storage",
      dataIndex: "storage",
    },
    {
      title: "Цена (руб)",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Главная картинка",
      dataIndex: "main_img",
      key: "main_img",
    },
    {
      title: "Категория товара",
      dataIndex: "typeId",
      key: "typeId",
    },
    {
      title: "Бренда товара",
      key: "brandId",
      dataIndex: "brandId",
    },
    {
      title: "Секретный ли товар",
      key: "secret",
      dataIndex: "secret",
    },
    {
      title: "Действия",
      key: "actions",
      dataIndex: "actions",
      fixed: "right",
      render: (_, record: { id: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Вы уверены, что хотите удалить элемент?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a style={{ color: "red" }}>Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleDelete = (key: React.Key) => {
    //const newData = brands?.filter((item) => item.id !== key);
    dispatch(deleteGood({ id: Number(key) }));
    console.log("DELETE", key);
  };

  useEffect(() => {
    dispatch(fetchGoods());
  }, [handleDelete]);
  let data: IGood[] = [];
  if (goods) {
    data = goods;
  }
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableGoods;
