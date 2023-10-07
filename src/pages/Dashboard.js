import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Table, Spin } from "antd";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./Orders";
import { getOrders, isRecentOrders } from "../features/orderSlice";
import {DashboardOutlined} from "@ant-design/icons" ;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders, isSuccess, isError, isLoading } = useSelector(
    (state) => state.order
  );
  useEffect(() => {
    dispatch(getOrders());
    dispatch(isRecentOrders());
    console.log("orders :", orders);
  }, []);

  const totalSales = () => {
    let total = 0;
    orders?.forEach((item) => {
      total += +item.total_price;
    });
    return total;
  };

  // useEffect(() => {
  //   orders?.forEach((item) => setTotalSales((prev) => prev + (+item.total_price)));
  // }, []);
  // console.log(totalSales);
  return (
    <div>
      <h3 className="mb-4 title d-flex align-items-center gap-2"><DashboardOutlined /> Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="bg-white p-3 roudned-3">
          <div style={{ width: "200px", height: "65px" }}>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center h-100 ">
                <Spin size="small" />
              </div>
            ) : (
              <>
                <p className="desc">Total Sales</p>
                <h4 className="mb-0 sub-title text-end">
                  {orders.length > 0 && totalSales()}DH
                </h4>
              </>
            )}
          </div>
          {/* <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div> */}
        </div>
        {/* <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div> */}
      </div>
      <div className="mt-4">
        <Orders />
      </div>
    </div>
  );
};

export default Dashboard;
