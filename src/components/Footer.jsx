import { useState } from "react";
import { Link } from "react-router-dom";
// import apiRequest from "../utilis/Request"; // Commented out since not available
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleClick = async () => {
    try {
      if (!name || !email) return toast.error("Please fill all the details");
      if (!/^[a-zA-Z ]+$/.test(name)) return toast.error("Enter a valid name");
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Enter a valid email");

      // If backend is not ready, simulate success
      // await apiRequest.post("/api/create", { name, email });
      console.log("Submitted data:", { name, email });

      toast.success("Thank you! We'll get in touch soon.");
      setEmail("");
      setName("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <>
      <div className="bg-black text-white font-sans py-6 px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Contact Form */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Stay Connected</h2>
            <input
              type="text"
              placeholder="Your Name"
              className="p-2 text-black rounded w-64"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 text-black rounded w-64"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              className="bg-green-600 hover:bg-green-700 p-2 rounded text-white"
              onClick={handleClick}
            >
              Submit
            </button>
          </div>

          {/* Info & Links */}
          <div>
            <h2 className="text-xl font-semibold">Contact Info</h2>
            <p>📞 +91 73029 25785</p>
            <p>📧 support@civictracker.com</p>
            <div className="flex gap-4 mt-3">
              <Link to="https://www.instagram.com/"><img src="/insta.png" alt="Instagram" className="w-6 h-6" /></Link>
              <Link to="https://www.linkedin.com/"><img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" /></Link>
              <Link to="https://x.com/"><img src="/twitter.png" alt="Twitter" className="w-6 h-6" /></Link>
              <Link to="https://www.youtube.com/"><img src="/you.png" alt="YouTube" className="w-6 h-6" /></Link>
            </div>
            <div className="mt-4 text-sm">
              &copy; {new Date().getFullYear()} CivicTracker. All rights reserved.
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Footer;
