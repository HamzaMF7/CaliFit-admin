import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route  index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="list-product" element={<ProductList />} />
          <Route path="category" element={<Category />} />
          <Route path="list-category" element={<CategoryList />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
