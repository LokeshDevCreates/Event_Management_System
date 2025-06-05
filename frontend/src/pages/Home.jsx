import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../components/Footer";
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
            backgroundImage: `url('/images/welcome-bg.jpg')`, // Replace with your background image
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
      {/* Carousel Section */}
        <section className="min-h-screen relative">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={5000}
            transitionTime={1000} // Smooth transition effect
            className="h-full"
            renderArrowPrev={(clickHandler, hasPrev) =>
              hasPrev && (
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-lg"
                  onClick={clickHandler}
                >
                  ❮
                </button>
              )
            }
            renderArrowNext={(clickHandler, hasNext) =>
              hasNext && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-lg"
                  onClick={clickHandler}
                >
                  ❯
                </button>
              )
            }
          >
            <div className="relative h-screen">
              <img
                src="/images/event1.jpg"
                alt="Event 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-4xl md:text-5xl font-bold text-white">
                  Tech Conference 2025
                </p>
              </div>
            </div>
            <div className="relative h-screen">
              <img
                src="/images/event2.jpg"
                alt="Event 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-4xl md:text-5xl font-bold text-white">
                  Music Fest 2025
                </p>
              </div>
            </div>
            <div className="relative h-screen">
              <img
                src="/images/event3.jpg"
                alt="Event 3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-4xl md:text-5xl font-bold text-white">
                  Startup Pitching Event
                </p>
              </div>
            </div>
          </Carousel>
        </section>
          {/* Event Organizer and Attendee Section */}
        <section className="py-16 bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-800">
                Choose Your Role
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Whether you're organizing an event or attending one, we've got you covered.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
              {/* Organizer Section */}
              <div className="relative bg-white shadow-lg rounded-xl p-8 transition-transform hover:scale-105 hover:shadow-2xl h-[420px] max-w-md">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17v2a4 4 0 004 4h4a4 4 0 004-4v-2M6 13V7a4 4 0 014-4h4a4 4 0 014 4v6M6 13l-2 2m16-2l2 2M9 17h6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-purple-600 mb-6 mt-14">
                  Organize Your Event
                </h3>
                <p className="text-gray-600 mb-8">
                  Host and manage events with our powerful tools. Simplify registrations, scheduling, and tracking in one place.
                </p>
                <Link to="/login">
                  <button className="mt-10 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300">
                    Get Started as Organizer
                  </button>
                </Link>
              </div>

              {/* Attendee Section */}
              <div className="relative bg-white shadow-lg rounded-xl p-8 transition-transform hover:scale-105 hover:shadow-2xl h-[420px] max-w-md">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-2.667 0-8 1.333-8 4v1h16v-1c0-2.667-5.333-4-8-4zm0 0V4m0 4v4m-6 8h12M6 18l2 2m10-2l-2 2"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-6 mt-14">
                  Explore and Book Events
                </h3>
                <p className="text-gray-600 mb-8">
                  Discover amazing events near you and book your spot with ease.
                </p>
                <Link to="/login">
                  <button className="mt-12 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                    Find Events
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
     {/* Reviews Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
              {/* Section Heading */}
              <div className="mb-12">
                <h2 className="text-4xl font-extrabold text-gray-800">
                  What Our Users Say
                </h2>
                <p className="text-lg text-gray-600 mt-4">
                  Hear from our satisfied organizers and attendees.
                </p>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Review 1 */}
                <div className="relative bg-gradient-to-br from-purple-100 to-purple-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 11V5a1 1 0 011-1h3M16 11V5a1 1 0 011-1h3M7 19a1 1 0 01-1-1v-6m12 7a1 1 0 001-1v-6"
                    />
                  </svg>
                  <p className="text-xl text-gray-800 italic mb-6">
                    "Organizing my events has never been easier. The tools are intuitive and powerful!"
                  </p>
                  <h4 className="text-lg font-bold text-gray-700">- Jane, Event Organizer</h4>
                </div>

                {/* Review 2 */}
                <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 11V5a1 1 0 011-1h3M16 11V5a1 1 0 011-1h3M7 19a1 1 0 01-1-1v-6m12 7a1 1 0 001-1v-6"
                    />
                  </svg>
                  <p className="text-xl text-gray-800 italic mb-6">
                    "I love how easy it is to book and keep track of my favorite events!"
                  </p>
                  <h4 className="text-lg font-bold text-gray-700">- John, Attendee</h4>
                </div>

                {/* Review 3 */}
                <div className="relative bg-gradient-to-br from-teal-100 to-teal-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 11V5a1 1 0 011-1h3M16 11V5a1 1 0 011-1h3M7 19a1 1 0 01-1-1v-6m12 7a1 1 0 001-1v-6"
                    />
                  </svg>
                  <p className="text-xl text-gray-800 italic mb-6">
                    "The payment and notification system is top-notch. Highly recommend!"
                  </p>
                  <h4 className="text-lg font-bold text-gray-700">- Sarah, Frequent Attendee</h4>
                </div>
              </div>
            </div>
          </section>
      <Footer />
    </div>
  );
};
export default Home;
