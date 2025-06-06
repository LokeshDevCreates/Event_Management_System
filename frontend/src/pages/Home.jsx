import { Link } from "react-router-dom";
import CustomCarousel from "../components/Carousel";
import HomeRoles from "../components/HomeRoles";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews";
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Event Booking Management</h1>
        <div>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md font-semibold hover:bg-gray-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-md font-semibold hover:bg-purple-700"
          >
            Sign Up
          </Link>
        </div>
      </header>

        {/* Welcome Message */}
        <section
          className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
          style={{
            backgroundImage: `url('/images/bg.jpg')`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Transform How You Manage Events
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Simplify the process of discovering, booking, and organizing events with our intuitive platform.
            </p>
            <Link to="/login">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Book Now
              </button>
            </Link>
          </div>
        </section>
        <HomeRoles />
        <CustomCarousel />
        <Reviews />
      <Footer />
    </div>
  );
};
export default Home;
