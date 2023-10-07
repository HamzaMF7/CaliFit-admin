import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Badge from "@mui/material/Badge";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { CloseOutlined } from "@ant-design/icons";
import { RiCouponLine } from "react-icons/ri";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Link, useNavigate, Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUSer, logout, resetState } from "../features/userSlice";
import { useStateContext } from "../context/ContextProvider";
const { Header, Sider, Content } = Layout;

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

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, setToken } = useStateContext();
  const [notification, setNotification] = useState(false);
  const [notificationOrder, setNotificationOrder] = useState([]);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    // Map orders to notification format and reverse the array
    if (orders.length > 0) {
      const mappedNotifications = orders
        .map((item) => ({
          id: item.id,
          date: dateConverter(item.created_at),
          amount: item.total_price,
        }))
        .reverse();

      // Set the mapped and reversed notifications in the state
      setNotificationOrder(mappedNotifications);
    }
  }, [orders]);

  console.log("orders :", orders);
  console.log("notification order :", notificationOrder);

  const clearOrderNotification = (orderID) => {
    console.log(orderID);
    const clearedNotification = notificationOrder.filter(
      (order) => order.id != orderID
    );
    setNotificationOrder(clearedNotification);
  };
  if (!token) {
    return <Navigate to="/" />;
  }

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => {
      setToken(null);
      dispatch(resetState());
    });
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{collapsed ? "CF" : "CaliFit"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else if (key == 1) {
              navigate("");
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "1",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "add-coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            // {
            //   key: "enquiries",
            //   icon: <FaClipboardList className="fs-4" />,
            //   label: "Enquiries",
            // },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: "#fff",
          }}
          className="d-flex justify-content-between"
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="profile d-flex gap-4 align-items-center mx-2">
            <div className="badge">
              <Badge
                className="badge-icon"
                color="secondary"
                overlap="circular"
                badgeContent={notificationOrder?.length}
                onClick={() => {
                  setNotification((prev) => !prev);
                }}
              >
                <IoIosNotifications className="fs-3" />
              </Badge>
              {notification ? (
                <div className="notification">
                  {notificationOrder.map((item) => (
                    <div className="notification-order" key={item.id}>
                      <span className="n-date">{item.date}</span>
                      <span
                        className="clear-btn"
                        onClick={() => {
                          const clearedNotification = notificationOrder.filter(
                            (order) => order.id != item.id
                          );
                          setNotificationOrder(clearedNotification);
                        }}
                      >
                        <CloseOutlined />
                      </span>
                      <span className="order-info">
                        <span
                          onClick={() =>
                            navigate("/admin/order-details/" + item.id)
                          }
                        >
                          Order N° #{item.id}
                        </span>{" "}
                        | amount: {item.amount} dh
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="d-flex gap-3 align-items-center ">
              <div className="user-info">
                <h5 className="mb-0 text-capitalize">
                  Hi, {localStorage.getItem("userName")} !
                </h5>
                <p className="mb-0 ">{localStorage.getItem("Email")}</p>
              </div>
              <div className="logout d-flex gap-2 align-items-center ">
                <LogoutOutlined className="fs-5" />
                <a className="onLogout" onClick={onLogout} href="#">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
