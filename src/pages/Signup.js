import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { signup } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../context/ContextProvider";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Signup = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {setToken , setUser} = useStateContext();

  const { token , user } = useSelector((state) => state.user);

  const onFinish = (values) => {
    console.log("clicked");
    const payload = {
      name: values.userName,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirm,
    };
    console.log("Received values of form: ", payload);
    dispatch(signup(payload)).then(({payload : {user , token}}) => {
      localStorage.setItem("userName" , user.name);
      localStorage.setItem("Email" , user.email);
      setToken(token);
    });
  };

  return (
    <div className="register">
      <h2>Create a membership account</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        className="signup-form"
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input className="signup-input" label="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password className="signup-input" />
        </Form.Item>
        <div className="password-desc">
          <span
            style={{
              color: "#0000008f",
              fontSize: ".9em",
              display: "block",
              width: "300px",
              marginLeft: "auto",
              marginBottom: "24px",
            }}
          >
            password must be 8 characters minimum. must contain at least 1
            letter, 1 symbol, 1 number.
          </span>
        </div>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password className="signup-input" />
        </Form.Item>

        <Form.Item
          name="userName"
          label="UserName"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your userName!",
              whitespace: true,
            },
          ]}
        >
          <Input className="signup-input" />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Signup;
