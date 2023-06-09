import React from 'react'
import { Table } from "antd";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
  
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
const CategoryList = () => {
    const data1 = [];
  return (
    <div>
    <h3 className="mb-4 title">Product Categories</h3>
    <div>
      <Table columns={columns} dataSource={data1} />
    </div>
    {/* <CustomModal
      hideModal={hideModal}
      open={open}
      performAction={() => {
        deleteCategory(pCatId);
      }}
      title="Are you sure you want to delete this Product Category?"
    /> */}
  </div>
  )
}

export default CategoryList