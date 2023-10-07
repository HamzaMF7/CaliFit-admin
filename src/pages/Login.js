import React, { useEffect } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetState } from "../features/userSlice";
import { useStateContext } from "../context/ContextProvider";

const Login = (props) => {
  const { setToken, setUser } = useStateContext();
  const dispatch = useDispatch();
  const { token, errorMsg, isError, isLoading } = useSelector(
    (state) => state.user
  );

  // console.log("token changes :", token);

  const onFinish = (values: any) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    dispatch(login(payload)).then(({ payload: { user, token } }) => {
      localStorage.setItem("userName" , user.name);
      localStorage.setItem("Email" , user.email);
      setToken(token);
    });
  };

  console.log(isError);
  return (
    <div className="login">
      <h2>welcome back</h2>
      {isError && <p className="login-error">{errorMsg}</p>}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={isLoading ? true : false}
          >
            Log in
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
