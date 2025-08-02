import { useContext } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../utilis/context";
import apiRequest from "../utilis/Request";
function Menu2(){
   const {currentUser,updateUser} = useContext(AuthContext)
    const [first, setfirst] = useState("")
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
      return () => {
       
        setfirst(params)
      }
    }, [location])
    const handlelogout = async()=>{
        try {
            const p = await apiRequest.get("/api/v1/mentor/logout")
            sessionStorage.removeItem("user");
            updateUser(null)
            navigate("/login")
        } catch (error) {
             console.log(error)
        }
    }
    const params = location.pathname.split("/")[2];
    return <>
<div className="bg-black w-72 text-white h-screen fixed top-0 left-0 overflow-hidden bottom-2">
<div className="h-screen overflow-y-auto scrollbar-hide flex flex-col gap-2 mt-3 pb-1">
               <div className="flex justify-center">
                <Link to = "/"> <img src="/logo.png" alt="" className="w-32"/></Link> 
               </div>
           <Link to = "/"> <div>
                  ScholarsBoost
               </div></Link>   
               <div className="flex justify-center">
               <div className="flex gap-3 bg-white text-black rounded-full pt-1 pb-1 justify-center items-center w-52 pr-3">
                  <div>
                     <img src={currentUser.img? currentUser.img: "/profile2.png"} alt="" className="w-10 object-cover rounded-full"/>
                  </div>
                  <div className="flex flex-col text-[10px]">
                     <div className="font-bold text-[15px]">
                        {currentUser.name}
                     </div>
                  <Link to = {`/mentors/profile/${currentUser._id}`}><div className="text-[12px] text-start">
                        Profile | {currentUser.exam} Mentor
                     </div></Link>   
                  </div>
               </div>
               </div>
               <div className="flex-col gap-2 flex items-start font-bold">
          <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16 ${params === "dashboard"? "bg-red-600": "bg-black"}`}>
          <Link to= {`/mentors/dashboard/${currentUser._id}`}>     <div>
                     <img src="/mentos1.png" alt="" className="w-7"/>
                  </div></Link> 
                  <Link to= {`/mentors/dashboard/${currentUser._id}`}>        <div className="text-[13px]">
                     DashBoard
                  </div></Link> 
                  <div className={`absolute left-[276px] ${params !== "dashboard"? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
                  
               </div>
               
             <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16 h-12  ${params === "availability"? "bg-red-600": "bg-black"}`}>
             <Link to= {`/mentors/availability/${currentUser._id}`}>          <div>
                     <img src="/mentos2.png" alt="" className="w-7"/>
                  </div></Link>
                  <Link to= {`/mentors/availability/${currentUser._id}`}>     <div className="text-[13px]">
                     Availability
                  </div></Link>
                  <div className={`absolute left-[276px] ${params !== "availability"? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
               </div>
                
               <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16  ${params === "meeting"? "bg-red-600": "bg-black"}`}>
               <Link to= {`/mentors/meeting/${currentUser._id}`}>            <div>
                     <img src="/mentos3.png" alt="" className="w-7"/>
                  </div></Link>
                  <Link to= {`/mentors/meeting/${currentUser._id}`}>      <div className="text-[13px]">
                     All Meetings
                  </div></Link>
                  <div className={`absolute left-[276px] ${params !== "meeting"? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
               </div>
               <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16 ${params === "ai"? "bg-red-600": "bg-black"}`}>
               <Link to= {`/mentors/ai/${currentUser._id}`}>       <div>
                     <img src="/mentos4.png" alt="" className="w-7"/>
                  </div></Link>
                  <Link to= {`/mentors/ai/${currentUser._id}`}>      <div className="text-[13px]">
                     AI ScholarsBost Pro
                  </div></Link>
                  <div className={`absolute left-[276px] ${params !== "ai"? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
               </div>
               <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16 ${params === "session"? "bg-red-600": "bg-black"}`}>
               <Link to= {`/mentors/session/${currentUser._id}`}>      <div>
                     <img src="/mentos5.png" alt="" className="w-7"/>
                  </div></Link>
                  <Link to= {`/mentors/session/${currentUser._id}`}>   <div className="text-[13px]">
                     Your Sessions
                  </div></Link>
                  <div className={`absolute left-[276px] ${params !== "session"? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
               </div>
               
               <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16  ${params === "certificates"? "bg-red-600": "bg-black"}`}>
               <Link to= {`/mentors/certificates/${currentUser._id}`}>      <div>
                     <img src="/mentos7.png" alt="" className="w-7"/>
                  </div></Link>
                  <Link to= {`/mentors/certificates/${currentUser._id}`}>       <div className="text-[13px]">
                     Certificates
                  </div></Link>
                  <div className={`absolute left-[276px] ${params !== "certificates"? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
               </div>
               <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16  ${params === "alerts"? "bg-red-600": "bg-black"}`}>
               <Link to= {`/mentors/alerts/${currentUser._id}`}>          <div>
                     <img src="/mentos8.png" alt="" className="w-7"/>
                  </div></Link>
                  <Link to= {`/mentors/alerts/${currentUser._id}`}>         <div className="text-[13px]">
                     Alerts
                  </div></Link>
                  <div className={`absolute left-[276px] ${params !== "alerts"? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
               </div>
               <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16  ${params === "support"? "bg-red-600": "bg-black"}`}>
               <Link to= {`/mentors/support/${currentUser._id}`}>       <div>
                     <img src="/support.png" alt="" className="w-7"/>
                  </div></Link>
                  <Link to= {`/mentors/support/${currentUser._id}`}>      <div className="text-[13px]">
                     Support
                  </div></Link>
                  <div className={`absolute left-[276px] ${params !== "support"? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
               </div>
            <Link to ={`/mentors/payout/${currentUser._id}`}> <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16 ${params === ""? "bg-red-600": "bg-black"}`}>
                     <div>
                     <img src="/wallet.png" alt="" className="w-7"/>
                  </div>
                   <div className="text-[13px]">
                     Mentor_payout
                  </div>
                  <div className={`absolute left-[276px] ${params !== ""? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
               </div>
               </Link>  
               <div className={`flex gap-6 justify-start items-center w-full p-2 pl-16 ${params === ""? "bg-red-600": "bg-black"}`} onClick={handlelogout}>
                     <div>
                     <img src="/mentos9.png" alt="" className="w-7"/>
                  </div>
                   <div className="text-[13px]">
                     Log Out
                  </div>
                  <div className={`absolute left-[276px] ${params !== ""? "hidden": "visible"}`}>
                     <img src="/triangle.png" alt="" className="w-3 flex "/>
                  </div>
               </div>
             
               </div>
               
             </div>
        </div>
    </>
}
export default Menu2