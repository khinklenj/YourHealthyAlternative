import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { type Provider, type Service } from "@shared/schema";

interface BookingWidgetProps {
  provider: Provider;
  services: Service[];
}

export default function BookingWidget({ provider, services }: BookingWidgetProps) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Pre-populate form with user information when logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      setPatientName(`${user.firstName} ${user.lastName}`);
      setPatientEmail(user.email || "");
      // Note: phone is optional in user schema, so only set if available
      // setPatientPhone(user.phone || "");
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
    if (!selectedService || !selectedDate || !selectedTime || !patientName || !patientEmail || !patientPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to book your appointment.",
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
      
      {!isAuthenticated && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Sign in to automatically fill your contact information and manage your appointments.
          </p>
        </div>
      )}
      
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

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Your Information</h4>
            {isAuthenticated && user && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                Pre-filled from your account
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Full Name</Label>
              <Input 
                type="text" 
                placeholder="Enter your full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
              <Input 
                type="email" 
                placeholder="Enter your email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Phone</Label>
              <Input 
                type="tel" 
                placeholder="Enter your phone number"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleBooking}
          disabled={bookingMutation.isPending}
          className="w-full bg-primary-custom text-white hover:bg-primary-custom/90"
        >
          {bookingMutation.isPending ? "Booking..." : "Book Appointment"}
        </Button>
      </div>
    </div>
  );
}
