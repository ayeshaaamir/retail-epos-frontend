import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const colorMap = {
  red: "bg-red-500 hover:bg-red-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  teal: "bg-teal-500 hover:bg-teal-600",
};

const Dashboard = () => {
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <>
      <Header />
      <div className="flex flex-wrap justify-center items-center min-h-screen p-6 gap-6 bg-gray-100">
        {userRole === "admin" && (
          <>
            <DashboardCard
              to="/category-management"
              title="Category Management"
              color="green"
            />
            <DashboardCard
              to="/product-management"
              title="Product Management"
              color="blue"
            />
            <DashboardCard
              to="/inventory-management"
              title="Inventory Management"
              color="red"
            />

            <DashboardCard
              to="/employee"
              title="Employee Management"
              color="yellow"
            />
          </>
        )}
        <DashboardCard to="/billing" title="Billing Management" color="teal" />
      </div>
    </>
  );
};

import PropTypes from "prop-types";

const DashboardCard = ({ to, title, color }) => {
  return (
    <div
      className={`w-64 h-40 flex items-center justify-center rounded-lg shadow-xl transition-all ${
        colorMap[color] || "bg-gray-500 hover:bg-gray-600"
      }`}
    >
      <Link
        to={to}
        className="text-white text-xl font-semibold text-center w-full h-full flex items-center justify-center"
      >
        {title}
      </Link>
    </div>
  );
};
DashboardCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Dashboard;
