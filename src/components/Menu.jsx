import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../utilis/context";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

function Menu() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [first, setFirst] = useState("");
  const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle

  const params = location.pathname.split("/")[1];

  useEffect(() => {
    setFirst(params);
  }, [location]);

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="md:hidden fixed top-2 left-2 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-black p-2 rounded-md"
        >
          {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-black text-white w-72 h-screen fixed top-0 left-0 overflow-hidden transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-screen overflow-y-auto scrollbar-hide flex flex-col gap-2 mt-3 pb-1">
          <div className="flex justify-center">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src="/logo.png" alt="" className="w-32" />
            </Link>
          </div>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <div className="text-center font-semibold mb-">ScholarsBoost</div>
          </Link>

          {/* Profile */}
          <div className="flex justify-center mb-3">
            <div className="flex gap-3 bg-white text-black rounded-full pt-1 pb-1 justify-center items-center w-52 pr-3">
            <Link to={`/profile/${currentUser._id}`}><img src={currentUser.img? currentUser.img: "/profile1.png"} alt="" className="w-10 object-cover rounded-full" /></Link>  
              <div className="flex flex-col text-[10px]">
                <div className="font-bold text-[15px]">
                  {currentUser.firstName} <span className="text-tahiti-100">{currentUser.lastName}</span>
                </div>
                <Link to={`/profile/${currentUser._id}`} onClick={() => setIsOpen(false)}>
                  <div className="text-[12px] text-start">
                    Profile | {currentUser.exam}
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-col gap-2 flex items-start font-bold">
            {[
              { name: "DashBoard", path: "dashboard", icon: "dashboard.png" },
              { name: "Mentors Cell", path: "mentors", icon: "mentors_cell.png" },
              { name: "Chief Mentors", path: "chief_mentors", icon: "chief_mentors.png" },
              { name: "Study Resources", path: "resources", icon: "study_resouces.png" },
              { name: "Calendar", path: "calendar", icon: "calendar.png" },
              { name: "Your Sessions", path: "sessions", icon: "sessions.png" },
              { name: "AI ScholarsBot Pro", path: "ai", icon: "AI.png" },
              { name: "Test Series", path: "test", icon: "Test_Series.png", external: true, link: "https://candidate.speedexam.net/signin.aspx?site=scholarsboost" },
              { name: "Dcc (Doubt Clearing Cell)", path: "dcc", icon: "support.png" },
              { name: "Support", path: "support", icon: "DCC.png" },
            ].map((item) => {
              const isActive = params === item.path;
              const linkPath = item.external
                ? item.link
                : `/${item.path}/${currentUser._id}`;

              return (
                <div
                  key={item.path}
                  className={`flex gap-6 justify-start items-center w-full p-2 pl-16 relative ${isActive ? "bg-red-600" : "bg-black"}`}
                >
                  <Link to={linkPath} onClick={() => setIsOpen(false)} target={item.external ? "_blank" : "_self"}>
                    <img src={`/${item.icon}`} alt={item.name} className="w-7" />
                  </Link>
                  <Link to={linkPath} onClick={() => setIsOpen(false)} target={item.external ? "_blank" : "_self"}>
                    <div className="text-[13px]">{item.name}</div>
                  </Link>
                  {isActive && (
                    <div className="absolute left-[276px]">
                      <img src="/triangle.png" alt="" className="w-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
