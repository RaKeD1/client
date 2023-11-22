import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Table } from "antd";
import {
  deleteCategory,
  fetchCategories,
} from "../../../redux/reducers/CategoriesSlice";
import { ICategories } from "../../../models/ICategories";

const TableTypes = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const [data, setData] = useState<ICategories[]>([]);

  const columns: ColumnsType<ICategories> = [
    {
      title: "Заголовок категории",
      dataIndex: "type_name",
      key: "type_name",
      fixed: "left",
    },
    {
      title: "Родительская категория",
      dataIndex: "parent",
      key: "description",
    },
    {
      title: "Изображение",
      key: "img",
      dataIndex: "img",
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
    dispatch(deleteCategory({ id: Number(key) }));

    categories &&
      setData(categories.filter((category) => category.id != Number(key)));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (categories) {
      setData(categories);
    }
  }, [categories]);

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableTypes;
