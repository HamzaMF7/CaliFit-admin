import React, { useEffect, useMemo } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getOrders, restESL } from '../features/orderSlice';
import { AiFillDelete } from "react-icons/ai";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";

const { confirm } = Modal;

const columns = [
    {
      title: "Number",
      dataIndex: "key",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "Products Amount",
      dataIndex: "products_amount",
    },
    {
      title: "Shipping Address",
      dataIndex: "shipping_address",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];


const Orders = () => {
  const dispatch = useDispatch();
  const {orders , isSuccess, isError, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const handleDeleteOrder = (OrderId) => {
    confirm({
      title: "Are you sure delete this Order?",
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        console.log(OrderId);
        dispatch(deleteOrder(OrderId))
          .then(() => dispatch(getOrders()))
          .catch((error) => console.error("Error deleting Order:", error));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const data1 = useMemo(() => {
    const data = [];
    for (let i = 0; i < orders.length; i++) {
      data.push({
        key: i + 1,
        first_name: orders[i].first_name,
        last_name: orders[i].last_name,
        email: orders[i].email,
        phone_number: orders[i].phone_number,
        products_amount: orders[i].products_amount,
        shipping_address: orders[i].shipping_address,
        city: orders[i].city,
        total_amount: orders[i].total_amount,
        action: (
          // <div className="d-flex">
            <Button
              className=" fs-3 text-danger pt-0 d-flex align-items-center justify-content-center"
              onClick={() => handleDeleteOrder(orders[i].id)}
              type="solid"
            >
              <AiFillDelete  />
            </Button>
          // </div>
        ),
      });
    }
    return data;
  }, [orders]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(restESL());
    }
  }, [isSuccess]);

      return (
        <div className="mt-4">
        <h3 className="mb-5 title"> Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} loading={isLoading} />
        </div>
      </div>
      )
}

export default Orders ;