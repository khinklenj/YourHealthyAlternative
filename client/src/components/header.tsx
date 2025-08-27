import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary-custom">
                Your Healthy Alternative
              </Link>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link 
                href="/providers" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location === "/providers" 
                    ? "text-primary-custom" 
                    : "text-warm-gray hover:text-primary-custom"
                }`}
              >
                Find Providers
              </Link>
              <a href="#" className="text-warm-gray hover:text-primary-custom px-3 py-2 text-sm font-medium">
                Services
              </a>
              <a href="#" className="text-warm-gray hover:text-primary-custom px-3 py-2 text-sm font-medium">
                About
              </a>
              <a href="#" className="text-warm-gray hover:text-primary-custom px-3 py-2 text-sm font-medium">
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-warm-gray hover:text-primary-custom text-sm font-medium">
              Sign In
            </button>
            <Button className="bg-primary-custom text-white hover:bg-primary-custom/90">
              Join as Provider
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
