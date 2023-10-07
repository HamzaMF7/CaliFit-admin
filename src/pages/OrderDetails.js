import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showOrder } from "../features/orderSlice";
import { LeftSquareOutlined } from "@ant-design/icons";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

import { Descriptions, Table, Skeleton } from "antd";
import { base_url } from "../utils/baseUrl";

const columns = [
  {
    title: "Product ID",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <img
        src={image && `${base_url}/storage/` + image}
        alt="Product Image"
        style={{ width: "100px" }}
      />
    ),
  },
  {
    title: "Product Name",
    dataIndex: "product_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Price",
    // className: 'column-money',
    dataIndex: "price",
    align: "right",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Total Price",
    dataIndex: "total_price",
  },
];

const OrderDetails = () => {
  const { orders, recentOrder , isLoading } = useSelector((state) => state.order);
  const { order, orderDetails, orderItems } = orders;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(showOrder(orderId));
    console.log("recent orders :", recentOrder);
  }, []);

  console.log("loading order :",isLoading);

  const data1 = useMemo(() => {
    const data = [];
    for (let i = 0; i < orderItems?.length; i++) {
      const input = orderItems[i].ImageURL;
      console.log(input);
      const inputR = input.replace(/[\[\]"\\]/g, "");
      const imageUrls = inputR.split(",");

      data.push({
        key: orderItems[i].id,
        image: imageUrls[0],
        product_name: orderItems[i].product_name,
        price: orderItems[i].price,
        quantity: orderItems[i].quantity,
        total_price: orderItems[i].total_price,
      });
    }
    return data;
  }, [orders]);

  const dateConverter = (datetoconvert) => {
    let date = new Date(datetoconvert);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let newDate = `${year}-${month}-${day}`;
    return newDate;
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-4">OrderDetails</h2>
        <BsFillArrowLeftSquareFill
          className="rollback-btn fs-3"
          onClick={() => {
            {
              recentOrder ? navigate("/admin") : navigate("/admin/orders");
            }
          }}
        />
      </div>
      {isLoading ? (
        <div className="d-flex gap-5 mb-4">
          <div className="skelton bg-white p-3 rounded custom-rounded flex-grow-1">
            <Skeleton
              active
              paragraph={{
                rows: 5,
                width: ["100%", "80%", "60%", "40%", "20%"],
              }}
            />
          </div>
          <div className="skelton bg-white p-3 rounded custom-rounded flex-grow-1">
            <Skeleton
              active
              paragraph={{
                rows: 5,
                width: ["100%", "80%", "60%", "40%", "20%"],
              }}
            />
          </div>
        </div>
      ) : (
        <div className="d-flex gap-5 mb-4">
          <Descriptions
            className="bg-white p-3 rounded custom-rounded "
            title="Order Details"
            column={1}
          >
            <Descriptions.Item label="Order id">{orderId}</Descriptions.Item>

            <Descriptions.Item label="Order Date">
              {dateConverter(order?.created_at)}
            </Descriptions.Item>
            <Descriptions.Item label="Shipping Address">
              {orderDetails?.shipping_address}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {order?.status}
            </Descriptions.Item>
            <Descriptions.Item label="Total Price">
              {order?.total_price} DH
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            className="bg-white p-3 rounded custom-rounded "
            title="Customer Info"
            column={1}
          >
            <Descriptions.Item label="Full Name">
              {orderDetails?.first_name + " " + orderDetails?.last_name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {orderDetails?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {orderDetails?.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {orderDetails?.city}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={data1}
        pagination={orderItems?.length < 8 ? false : true}
        bordered
        loading={isLoading}
        title={() => (
          <div className="custom-table-title">
            <h6>Order Items</h6>
          </div>
        )}
        // footer={() => (
        //   <div className="d-flex justify-content-end align-items-center">
        //     <span className="fs-6 bold">Total Price : </span>
        //     <span className="ms-1"> {order?.total_price}</span>
        //   </div>
        // )}
      />
    </>
  );
};

export default OrderDetails;
