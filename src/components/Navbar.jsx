import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../utilis/context";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {path !== "login" && path !== "register" && (
        <div className="w-full bg-white shadow-md px-6 py-3 font-sans fixed top-0 z-50">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-10" />
              <h1 className="text-xl font-bold text-gray-800">
                Civic<span className="text-blue-600">Track</span>
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
              <Link
                to="/"
                className={`hover:text-blue-600 font-semibold ${
                  path === "" ? "text-blue-600 underline" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/report"
                className={`hover:text-blue-600 font-semibold ${
                  path === "report" ? "text-blue-600 underline" : ""
                }`}
              >
                Report Issue
              </Link>

              {currentUser ? (
                <Link
                  to={`/dashboard/${currentUser._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md font-semibold"
                >
                  {currentUser.name || currentUser.firstName}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md font-semibold"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <img
                src="/menu.png"
                alt="Menu"
                className="w-8 cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            </div>
          </div>

          {/* Mobile Slide-in Menu */}
          {menuOpen && (
            <motion.div
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-5"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Menu</h2>
                <span
                  className="text-2xl cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  ×
                </span>
              </div>
              <div className="flex flex-col gap-4 text-gray-800 font-medium">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/report" onClick={() => setMenuOpen(false)}>
                  Report Issue
                </Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
                {currentUser ? (
                  <Link
                    to={`/dashboard/${currentUser._id}`}
                    className="text-blue-600 font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="text-blue-600 font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
