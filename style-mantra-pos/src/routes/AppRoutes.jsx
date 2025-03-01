import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import InventoryManagement from "../pages/InventoryManagement";
import ProductManagement from "../pages/ProductManagement";
import CategoryManagement from "../pages/CategoryManagement";
import EmployeeManagement from "../pages/EmployeeManagement";
import ReportsManagement from "../pages/ReportsManagement";
import BillingManagement from "../pages/BillingManagement";
import NotFound from "../pages/NotFound";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/category-management" element={<CategoryManagement />} />
        <Route path="/employee" element={<EmployeeManagement />} />
        <Route path="/reports" element={<ReportsManagement />} />
        <Route path="/billing" element={<BillingManagement />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
