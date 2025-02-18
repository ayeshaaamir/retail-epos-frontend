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
      <div>
        <h1 className="text-2xl font-bold">POS Dashboard</h1>
        <p className="text-lg font-semibold text-white-400 mt-1">
          Role: <span className="uppercase">{userRole || "User"}</span>
        </p>
      </div>
      <nav>
        <ul className="flex space-x-4 items-center">
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-red-600 transition-all"
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
