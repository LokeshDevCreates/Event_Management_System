import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h4 className="text-xl font-semibold">Event Booking Management</h4>
            <p className="text-gray-400 mt-2">
              Simplifying event management for organizers and attendees.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h5 className="text-lg font-bold">Company</h5>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:underline">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold">Support</h5>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/help" className="hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold">Legal</h5>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold">Social</h5>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-gray-500 text-sm">
            &copy; 2025 Event Booking Management. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer