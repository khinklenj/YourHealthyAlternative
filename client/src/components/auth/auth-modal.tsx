import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  // Update activeTab when defaultTab prop changes
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby="auth-dialog-description">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
          <div id="auth-dialog-description" className="sr-only">
            {activeTab === 'login' 
              ? 'Sign in to your account to access your dashboard and manage appointments' 
              : 'Create a new account to book appointments and access healthcare providers'
            }
          </div>
        </DialogHeader>
        
        {activeTab === 'login' ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={() => setActiveTab('register')}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setActiveTab('login')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}