import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

const CustomCarousel = () => {
  const navigate = useNavigate();

  const handleViewEvents = () => {
    navigate("/events"); // Redirect to the event list page
  };

  const handleBookEvent = (eventId) => {
    navigate(`/login?redirect=/events/${eventId}`); // Redirect to login with the intended event booking page as a query param
  };

  return (
    <>
      {/* Carousel Section */}
      <section className="min-h-screen relative">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          transitionTime={1500}
          className="h-full"
          renderArrowPrev={(clickHandler, hasPrev) =>
            hasPrev && (
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                onClick={clickHandler}
              >
                ❮
              </button>
            )
          }
          renderArrowNext={(clickHandler, hasNext) =>
            hasNext && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                onClick={clickHandler}
              >
                ❯
              </button>
            )
          }
        >
          {/* Event 1 */}
          <div className="relative h-screen">
            <img
              src="/images/event1.jpg"
              alt="Event 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 flex flex-col items-center justify-center text-center px-4">
              <p className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
                Marriage and Wedding Events
              </p>
              <div className="flex space-x-4">
                <button
                  className="bg-white text-black px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-200 transition-all duration-300"
                  onClick={handleViewEvents}
                >
                  View All Events
                </button>
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  onClick={() => handleBookEvent("event1")}
                >
                  Book This Event
                </button>
              </div>
            </div>
          </div>

          {/* Event 2 */}
          <div className="relative h-screen">
            <img
              src="/images/event2.jpg"
              alt="Event 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 flex flex-col items-center justify-center text-center px-4">
              <p className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
                Music Fest 2025
              </p>
              <div className="flex space-x-4">
                <button
                  className="bg-white text-black px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-200 transition-all duration-300"
                  onClick={handleViewEvents}
                >
                  View All Events
                </button>
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  onClick={() => handleBookEvent("event2")}
                >
                  Book This Event
                </button>
              </div>
            </div>
          </div>

          {/* Event 3 */}
          <div className="relative h-screen">
            <img
              src="/images/event3.jpg"
              alt="Event 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 flex flex-col items-center justify-center text-center px-4">
              <p className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
                Startup Pitching Event
              </p>
              <div className="flex space-x-4">
                <button
                  className="bg-white text-black px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-200 transition-all duration-300"
                  onClick={handleViewEvents}
                >
                  View All Events
                </button>
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  onClick={() => handleBookEvent("event3")}
                >
                  Book This Event
                </button>
              </div>
            </div>
          </div>
        </Carousel>
      </section>
    </>
  );
};

export default CustomCarousel;
