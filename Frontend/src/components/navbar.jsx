import { Search, MapPin, Calendar, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavbarLogic } from "../hooks/useNavbar";

const Navbar = () => {
  const { activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    selectedCinema,
    setSelectedCinema, loading, error, findMovies} = useNavbarLogic();

  const navItems = ["MOVIES", "EVENTS", "SPORTS", "PAGES", "BLOG", "CONTACT"];

  return (
    <div 
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        backgroundImage: `url('https://simg.zalopay.com.vn/zlp-website/assets/phim_viet_nam_chieu_rap_45_916112a3fa.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
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
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`transition-colors font-medium hover:text-gray-300 ${
                  activeTab === item ? "text-white border-b-2 border-white" : "text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all font-medium border border-white">
            <Link to="/signin">Sign In</Link>
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <header className="relative z-10 text-center mt-16 max-w-6xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          BOOK YOUR <br />
          TICKETS FOR <br />
          <span className="text-white bg-black px-2 border-2 border-white inline-block mt-2">MOVIES</span>
        </h1>
        <p className="text-gray-200 text-lg mb-12">
          Safe, secure, reliable ticketing. Your ticket to live entertainment!
        </p>

        {/* Search Box */}
        <div className="bg-white/95 text-black rounded-2xl p-8 shadow-2xl border-2 border-gray-300 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">WELCOME TO MOVTIC</h3>
          <h2 className="text-2xl font-bold mb-6 text-black">WHAT ARE YOU LOOKING FOR</h2>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {["MOVIES", "EVENTS", "SPORTS"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border-2 ${
                  activeTab === tab
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for Movies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            {/* City */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black appearance-none"
              >
                {["London", "New York", "Paris", "Tokyo"].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="date"
                defaultValue="2024-12-03"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            {/* Cinema */}
            <div className="relative">
              <Camera className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <select
                value={selectedCinema}
                onChange={(e) => setSelectedCinema(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black appearance-none"
              >
                {["Roudan", "Cinema City", "IMAX", "Vue"].map((cinema) => (
                  <option key={cinema} value={cinema}>
                    {cinema}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            <button  onClick={findMovies} className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 font-semibold shadow-lg border-2 border-black transition-all">
               {loading ? "Loading..." : "Search Movies"}
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { title: "24x7 Care", desc: "Round the clock customer support" },
          { title: "100% Assurance", desc: "Guaranteed booking confirmation" },
          { title: "Our Promise", desc: "Best prices and premium experience" },
        ].map((feat, idx) => (
          <div key={idx} className="bg-white/90 text-black p-6 rounded-lg border-2 border-gray-200 hover:shadow-lg transition-all backdrop-blur-sm">
            <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-xl">✓</span>
            </div>
            <h3 className="font-semibold mb-2 text-black">{feat.title}</h3>
            <p className="text-gray-600 text-sm">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer spacing */}
      <div className="mt-16 pb-8"></div>
    </div>
  );
};

export default Navbar;