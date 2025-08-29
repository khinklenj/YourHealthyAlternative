import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { type Provider, type Service } from "@shared/schema";
import { User, Shield, Lock } from "lucide-react";

interface BookingWidgetProps {
  provider: Provider;
  services: Service[];
  onAuthRequired?: (mode?: 'login' | 'register') => void;
}

export default function BookingWidget({ provider, services, onAuthRequired }: BookingWidgetProps) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Format phone number helper
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  // Pre-populate form with user information when logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User data in booking widget:", user);
      // Handle nested user object structure
      const userData = user.user || user;
      setPatientName(`${userData.firstName || ''} ${userData.lastName || ''}`.trim());
      setPatientEmail(userData.email || "");
      setPatientPhone(formatPhoneNumber(userData.phone || ""));
    } else {
      // Clear form when not authenticated
      setPatientName("");
      setPatientEmail("");
      setPatientPhone("");
    }
  }, [isAuthenticated, user]);

  const bookingMutation = useMutation({
    mutationFn: async (appointmentData: any) => {
      return apiRequest("POST", "/api/appointments", appointmentData);
    },
    onSuccess: () => {
      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been successfully scheduled. You will receive a confirmation email shortly.",
      });
      // Reset form (but keep user info if logged in)
      setSelectedService("");
      setSelectedDate("");
      setSelectedTime("");
      if (!isAuthenticated || !user) {
        setPatientName("");
        setPatientEmail("");
        setPatientPhone("");
      }
      queryClient.invalidateQueries({ queryKey: ["/api/providers"] });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleBooking = () => {
    // Force authentication before booking
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account to book an appointment.",
        variant: "destructive",
      });
      onAuthRequired?.('login');
      return;
    }

    if (!selectedService || !selectedDate || !selectedTime || !patientName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to book your appointment.",
        variant: "destructive",
      });
      return;
    }

    // Require either phone or email
    if (!patientEmail && !patientPhone) {
      toast({
        title: "Contact Information Required",
        description: "Please provide either an email address or phone number.",
        variant: "destructive",
      });
      return;
    }

    const appointmentDate = new Date(`${selectedDate}T${selectedTime}`);
    
    bookingMutation.mutate({
      providerId: provider.id,
      serviceId: selectedService,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate: appointmentDate.toISOString(),
      status: "scheduled"
    });
  };

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Book an Appointment</h3>
      

      
      <div className="space-y-4">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Select Service</Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Select Date</Label>
          <Input 
            type="date" 
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Available Times</Label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className={selectedTime === time ? "bg-primary-custom text-white" : ""}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {isAuthenticated && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Your Information</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Full Name</Label>
                <Input 
                  type="text" 
                  placeholder=""
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full"
                  readOnly={true}
                  disabled={true}
                  data-testid="input-patient-name"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
                <Input 
                  type="email" 
                  placeholder=""
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full"
                  readOnly={true}
                  disabled={true}
                  data-testid="input-patient-email"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Phone</Label>
                <Input 
                  type="tel" 
                  placeholder={patientPhone || "Add phone number in your profile"}
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full"
                  readOnly={true}
                  disabled={true}
                  data-testid="input-patient-phone"
                />
              </div>
            </div>
          </div>
        )}
        
        {!isAuthenticated ? (
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Authentication Required</h4>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                To book an appointment, you need to sign in or create an account. This helps us:
              </p>
              <ul className="text-xs text-blue-700 list-disc list-inside space-y-1 mb-3">
                <li>Securely store your appointment information</li>
                <li>Send appointment confirmations and reminders</li>
                <li>Allow you to manage your bookings</li>
              </ul>
              <div className="space-y-2">
                <Button
                  onClick={() => onAuthRequired?.('login')}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  data-testid="button-sign-in"
                >
                  Sign In
                </Button>
                <div className="text-center">
                  <button 
                    onClick={() => onAuthRequired?.('register')}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                    data-testid="link-create-account"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Button 
            onClick={handleBooking}
            disabled={bookingMutation.isPending || (!patientEmail && !patientPhone)}
            className="w-full bg-primary-custom text-white hover:bg-primary-custom/90"
            data-testid="button-book-appointment"
          >
            {bookingMutation.isPending ? "Booking..." : "Book Appointment"}
          </Button>
        )}
        
        {isAuthenticated && !patientEmail && !patientPhone && (
          <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Contact information required:</strong> Please add either an email address or phone number in your profile settings to complete the booking.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
