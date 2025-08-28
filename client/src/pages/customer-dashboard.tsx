import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Phone, User, FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  appointmentDate: string;
  status: string;
  notes?: string;
  createdAt: string;
  provider: {
    id: string;
    name: string;
    specialty: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  service: {
    id: string;
    name: string;
    price: string;
    duration: number;
  };
}

export default function CustomerDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<{ appointments: Appointment[] }>({
    queryKey: ["/api/dashboard/customer"],
    enabled: isAuthenticated && user?.userType === 'customer',
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.userType !== 'customer')) {
      toast({
        title: "Access Denied",
        description: "Please sign in as a customer to access this page.",
        variant: "destructive",
      });
      setLocation('/');
    }
  }, [isAuthenticated, user, isLoading, setLocation, toast]);

  if (isLoading || isDashboardLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-custom mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.userType !== 'customer') {
    return null;
  }

  const appointments = dashboardData?.appointments || [];
  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) > new Date() && apt.status === 'scheduled'
  );
  const pastAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) <= new Date() || apt.status !== 'scheduled'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your appointments and health journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Overview */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-primary-custom" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                    <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {appointments.filter(apt => apt.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled appointments with healthcare providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No upcoming appointments</p>
                    <Button onClick={() => setLocation('/providers')}>
                      Find Providers
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-gray-900">
                                {appointment.provider.name}
                              </h3>
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {appointment.service.name} • {appointment.service.duration} minutes
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(appointment.appointmentDate)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatTime(appointment.appointmentDate)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.provider.address}, {appointment.provider.city}, {appointment.provider.state}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              ${appointment.service.price}
                            </p>
                            <Button variant="outline" size="sm" className="mt-2">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => setLocation('/providers')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Find New Providers
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => setLocation('/providers')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  disabled
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Health Records
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            {pastAppointments.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pastAppointments.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-center gap-3 text-sm">
                        <Badge className={getStatusColor(appointment.status)} variant="secondary">
                          {appointment.status}
                        </Badge>
                        <div className="flex-1">
                          <p className="font-medium">{appointment.provider.name}</p>
                          <p className="text-gray-600">{formatDate(appointment.appointmentDate)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}