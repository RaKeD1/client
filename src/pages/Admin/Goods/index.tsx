import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Table } from "antd";
import { deleteGood, fetchGoods } from "../../../redux/reducers/GoodsSlice";
import { IGood } from "../../../models/IGood";
import { IBrand } from "../../../models/IBrand";
import { ICategories } from "../../../models/ICategories";
export interface GoodInfo {
  id: number;
  name: string;
  main_img: string;
  price: number;
  description: string;
  secret: boolean;
  article: string;
  storage: number;
  brandName: string;
  brand: IBrand;
  imgs: string[];
  typeName: string;
}
const TableGoods: FC = () => {
  const dispatch = useAppDispatch();
  const goods = useAppSelector((state) => state.goods.goods);
  const [data, setData] = useState<GoodInfo[]>([]);
  const columns: ColumnsType<GoodInfo | IGood> = [
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

      key: "typeId",
      dataIndex: "typeName",
    },
    {
      title: "Бренда товара",
      key: "brandId",
      dataIndex: "brandName",
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
    dispatch(deleteGood({ id: Number(key) }));

    data && setData(data.filter((good) => good.id != Number(key)));
  };

  useEffect(() => {
    dispatch(fetchGoods());
  }, []);

  useEffect(() => {
    if (goods) {
      setData(
        goods.map((good) => ({
          ...good,
          brandName: good.brand.brand_name,
          typeName: good.type.type_name,
        })),
      );
    }
  }, [goods]);

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableGoods;
