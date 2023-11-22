import React, { useEffect } from "react";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { deleteBrand, fetchBrands } from "../../../redux/reducers/BrandsSlice";
import { IBrand } from "../../../models/IBrand";

interface DataType {
  id: number;
  brand_name: string;
  description: string;
  url: string;
  brand_logo: string;
  createdAt: string;
  updatedAt: string;
}

const TableBrands = () => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brands.brands);
  const columns: ColumnsType<IBrand> = [
    {
      title: "Название бренда",
      dataIndex: "brand_name",
      key: "brand_name",
      fixed: "left",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Логотип",
      dataIndex: "brand_logo",
      key: "brand_logo",
    },
    {
      title: "Ссылка на ресурс",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Дата создания",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "Дата обновления",
      key: "updatedAt",
      dataIndex: "updatedAt",
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
    dispatch(deleteBrand({ id: Number(key) }));
    console.log("DELETE", key);
  };

  useEffect(() => {
    dispatch(fetchBrands());
  }, [handleDelete]);
  let data: IBrand[] = [];
  if (brands) {
    data = brands;
  }
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableBrands;
