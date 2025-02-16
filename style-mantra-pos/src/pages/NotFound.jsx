import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition-all"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
