import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col">
        {/* Navbar */}
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        {/* Page content */}
        <div className="flex-grow">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
