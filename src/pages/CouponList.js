import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Modal } from "antd";
import moment from "moment";
import { deleteCoupon, getCoupons, resetState } from "../features/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const CouponList = () => {
  const { isLoading, coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getCoupons()).then(() => {
      dispatch(resetState());
    });
  }, []);

  useEffect(() => {
    if (coupons.length > 0) {
      const newData = coupons.map((coupon) => ({
        key: coupon.id,
        code: coupon.code,
        discount: coupon.discount,
        expiration_date: coupon.expiration_date,
      }));
      setData(newData);
    }
  }, [coupons]);

  const handleDeleteCoupon = (couponId) => {
    confirm({
      title: "Are you sure to delete this coupon?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteCoupon(couponId))
          .then(() => dispatch(getCoupons()))
          .catch((error) => console.error("Error deleting coupon:", error));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "Coupon Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount * 100}%`,
    },
    {
      title: "Expiration Date",
      dataIndex: "expiration_date",
      key: "expiration_date",
    },
    {
      title: "Status",
      key: "status",
      render: ({ expiration_date }) => {
        const currentDate = moment();
        const expirationDate = moment(expiration_date);
        const isExpired = expirationDate.isBefore(currentDate);

        return (
          <Tag color={isExpired ? "red" : "green"}>
            {isExpired ? "Expired" : "Active"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          className="fs-3 text-danger pt-0 d-flex align-items-center justify-content-center"
          onClick={() => handleDeleteCoupon(record.key)}
          type="solid"
        >
          <AiFillDelete />
        </Button>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} loading={isLoading} />;
};

export default CouponList;
