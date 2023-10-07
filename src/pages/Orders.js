import React, { useEffect, useMemo } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrders,
  isOrders,
  restESL,
  updateOrder,
} from "../features/orderSlice";
import { AiFillDelete } from "react-icons/ai";
import { ExclamationCircleFilled, EyeOutlined } from "@ant-design/icons";
import { FaClipboardList } from "react-icons/fa";
import { Button, Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, isSuccess, isError, isLoading, recentOrder } = useSelector(
    (state) => state.order
  );

  const handleStatusChange = (OrderId, value) => {
    console.log(`Order ${OrderId} status changed to: ${value}`);
    dispatch(updateOrder({ id: OrderId, statusValue: value }));
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "key",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.key, value)}
          options={[
            { value: "pending", label: "pending" },
            { value: "processing", label: "processing" },
            { value: "shipped", label: "shipped" },
            { value: "delivered", label: "delivered" },
            { value: "cancelled", label: "cancelled" },
          ]}
        />
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  useEffect(() => {
    dispatch(getOrders());
    dispatch(isOrders());
  }, []);
  console.log(orders);

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
  };

  const dateConverter = (datetoconvert) => {
    let date = new Date(datetoconvert);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let newDate = `${year}-${month}-${day}   ${hours}:${minutes}:${seconds}`;
    return newDate;
  };

  const data1 = useMemo(() => {
    const data = [];
    for (let i = 0; i < orders.length; i++) {
      data.push({
        key: orders[i].id,
        order_date: dateConverter(orders[i].created_at),
        status: orders[i].status,
        total: orders[i].total_price,
        action: (
          <div className="d-flex gap-2">
            <Button
              className="fs-5 p-0 d-flex align-items-center justify-content-center border-0"
              onClick={() => navigate("/admin/order-details/" + orders[i].id)}
            >
              <EyeOutlined />
            </Button>
            <Button
              className=" fs-3 text-danger p-0 d-flex align-items-center justify-content-center"
              onClick={() => handleDeleteOrder(orders[i].id)}
              type="solid"
            >
              <AiFillDelete />
            </Button>
          </div>
        ),
      });
    }
    // Sort the data array based on order_date in descending order
    if (recentOrder)
      data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

    return data;
  }, [orders]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(restESL());
    }
  }, [isSuccess]);

  return (
    <div className="mt-4">
      <h3 className="mb-5 title d-flex align-items-center gap-2"><FaClipboardList/>{recentOrder ? "Recent" : ""} Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} loading={isLoading} />
      </div>
    </div>
  );
};

export default Orders;
