import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, LogOut, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/auth-modal";

export default function Header() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

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
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2" data-testid="button-user-menu">
                      <User className="h-4 w-4" />
                      <span>{user?.firstName} {user?.lastName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={user?.userType === 'customer' ? '/dashboard/customer' : '/dashboard/provider'}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {user?.userType === 'customer' && (
                  <Link href="/join-provider">
                    <Button 
                      className="bg-primary-custom text-white hover:bg-primary-custom/90"
                      data-testid="button-join-provider"
                    >
                      Join as Provider
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <button 
                  onClick={() => openAuthModal('login')}
                  className="text-warm-gray hover:text-primary-custom text-sm font-medium"
                  data-testid="button-sign-in"
                >
                  Sign In
                </button>
                <Link href="/join-provider">
                  <Button 
                    className="bg-primary-custom text-white hover:bg-primary-custom/90"
                    data-testid="button-join-provider"
                  >
                    Join as Provider
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </header>
  );
}
