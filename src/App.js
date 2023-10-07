import "./App.css";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import Category from "./pages/Category";
import CategoryList from "./pages/CategoryList";
import Customers from "./pages/Customers";
import GuestLayout from "./components/GuestLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Coupon from "./pages/Coupon";
import CouponList from "./pages/CouponList";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="list-product" element={<ProductList />} />
          <Route path="category" element={<Category />} /> 
          <Route path="list-category" element={<CategoryList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="add-coupon" element={<Coupon />} />
          <Route path="coupon-list" element={<CouponList />} />
          <Route path="order-details/:orderId" element={<OrderDetails />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
