export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HealNaturally</h3>
            <p className="text-gray-400 mb-4">
              Connecting you with trusted alternative medicine providers for your natural healing journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Patients</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Find Providers</a></li>
              <li><a href="#" className="hover:text-white">Book Appointments</a></li>
              <li><a href="#" className="hover:text-white">Patient Reviews</a></li>
              <li><a href="#" className="hover:text-white">Health Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Providers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Join Our Network</a></li>
              <li><a href="#" className="hover:text-white">Provider Dashboard</a></li>
              <li><a href="#" className="hover:text-white">Practice Management</a></li>
              <li><a href="#" className="hover:text-white">Marketing Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HealNaturally. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
