import React, { useEffect, useMemo } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer, getCustomers, restESL } from '../features/customerSlice';
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
      title: "Action",
      dataIndex: "action",
    },
  ];


const Customers = () => {
  const dispatch = useDispatch();
  const {customers , isSuccess, isError, isLoading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const handleDeleteCustomer = (customerId) => {
    confirm({
      title: "Are you sure delete this customer?",
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        console.log(customerId);
        dispatch(deleteCustomer(customerId))
          .then(() => dispatch(getCustomers()))
          .catch((error) => console.error("Error deleting customer:", error));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const data1 = useMemo(() => {
    const data = [];
    for (let i = 0; i < customers.length; i++) {
      data.push({
        key: i + 1,
        first_name: customers[i].first_name,
        last_name: customers[i].last_name,
        email: customers[i].email,
        phone_number: customers[i].phone_number,
        action: (
          // <div className="d-flex">
            <Button
              className=" fs-3 text-danger pt-0 d-flex align-items-center justify-content-center"
              onClick={() => handleDeleteCustomer(customers[i].id)}
              type="solid"
            >
              <AiFillDelete  />
            </Button>
          // </div>
        ),
      });
    }
    return data;
  }, [customers]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(restESL());
    }
  }, [isSuccess]);

      return (
        <div className="mt-4">
        <h3 className="mb-5 title"> customers</h3>
        <div>
          <Table columns={columns} dataSource={data1} loading={isLoading} />
        </div>
      </div>
      )
}

export default Customers ;