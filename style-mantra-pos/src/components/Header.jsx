import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userRole);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">POS Dashboard</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          {userRole === "admin" && (
            <li>
              <Link to="/reports" className="hover:text-gray-300">
                Reports
              </Link>
            </li>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
