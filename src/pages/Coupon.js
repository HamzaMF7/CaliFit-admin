import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon, resetState } from "../features/couponSlice";
import { ToastContainer, toast } from "react-toastify";
import CustomInput from "../components/CustomInput";


const Coupon = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {isSuccess , isError } = useSelector((state)=> state.coupon)
  
  console.log("success :", isSuccess);
  console.log("error :", isError);

  useEffect(() => {
    if(isSuccess)  toast.success("Coupon Created Successfullly!");
    if(isError)  toast.error("Coupon Already Exist!");

  }, [isSuccess, isError]);

  const onFinish = (values, actions) => {
    console.log(actions);
    const couponData = {
      code: values.code,
      discount: values.discount,
      expiration_date: values.expiration_date.toISOString().split("T")[0], // Convert to 'YYYY-MM-DD' format
    };
    console.log(couponData);
    dispatch(createCoupon(couponData)).then(() => {
      form.resetFields();
      dispatch(resetState());
    });
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item  name="code" rules={[{ required: true }]}>
        {/* <Input /> */}
        <CustomInput label="Coupon Code"/>
      </Form.Item>
      <Form.Item  name="discount" rules={[{ required: true }]}>
        {/* <Input  type="number" addonAfter="%" /> */}
        <CustomInput  type="text" label="Discount" pattern="[0]*([.][0-9]+)?" />
      </Form.Item>
      <Form.Item
        label="Expiration Date"
        name="expiration_date"
        rules={[{ required: true }]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={(current) => current && current < moment().endOf("day")}

        />
      </Form.Item>
      <Form.Item>
        <button
          className="addproduct btn btn-success rounded-3  my-3"
          type="primary"
          htmlType="submit"
        >
          Create coupon
        </button>
      </Form.Item>
      <ToastContainer autoClose={2000} />
    </Form>
  );
};

export default Coupon;
