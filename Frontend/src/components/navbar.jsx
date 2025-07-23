import { Search, MapPin, Calendar, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavbarLogic } from "../hooks/useNavbar";
import { useEffect } from "react";

const Navbar = () => {
  const {
    activeTab,
    setActiveTab,
    handleAllMovies,
    isLogin,
    HandleLogout,
    setEvents,
    handleFindMovies,
  } = useNavbarLogic();

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleAllMovies();
      setEvents(data);
    };

    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        backgroundImage: `url('https://simg.zalopay.com.vn/zlp-website/assets/phim_viet_nam_chieu_rap_45_916112a3fa.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-5">
        {[
          "top-10 left-10 rotate-12",
          "top-20 right-20 -rotate-12",
          "bottom-32 left-20 rotate-6",
          "bottom-20 right-32 -rotate-6",
        ].map((pos, idx) => (
          <div
            key={idx}
            className={`absolute w-32 h-24 md:w-36 md:h-28 rounded border border-white/10 transform ${pos}`}
          ></div>
        ))}
      </div>

      {/* Navbar */}
      <nav className="relative z-10 px-6 py-4 border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="bg-white text-black px-4 py-2 rounded font-bold text-lg">
            Online Booking Ticket
          </div>
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => {
                setActiveTab("MOVIES");
                handleFindMovies();
              }}
              className={`transition-colors font-medium hover:text-gray-300 ${
                activeTab === "MOVIES"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}
            >
              MOVIES
            </button>
            <button
              onClick={() => setActiveTab("EVENTS")}
              className={`transition-colors font-medium hover:text-gray-300 ${
                activeTab === "EVENTS"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}
            >
              EVENTS
            </button>
          </div>

          {/* Sign In Button */}

          {isLogin ? (
            <button
              onClick={HandleLogout}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all font-medium border border-white"
            >
              Logout
            </button>
          ) : (
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all font-medium border border-white">
              <Link to="/signin">Sign In</Link>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
