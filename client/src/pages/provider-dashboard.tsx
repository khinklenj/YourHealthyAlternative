import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Eye, Users, TrendingUp, MapPin, Phone, Mail, FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface ProviderAppointment {
  id: string;
  appointmentDate: string;
  status: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
  createdAt: string;
  service: {
    id: string;
    name: string;
    price: string;
    duration: number;
  };
}

interface ProfileViewAnalytics {
  totalViews: number;
  viewsLast30Days: number;
}

interface AppointmentAnalytics {
  totalAppointments: number;
  scheduledAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}

interface RecentView {
  id: string;
  viewedAt: string;
  source?: string;
}

interface DashboardData {
  appointments: ProviderAppointment[];
  analytics: {
    profileViews: ProfileViewAnalytics;
    appointments: AppointmentAnalytics;
    recentViews: RecentView[];
  };
}

export default function ProviderDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard/provider"],
    enabled: isAuthenticated && user?.userType === 'provider',
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.userType !== 'provider')) {
      toast({
        title: "Access Denied",
        description: "Please sign in as a provider to access this page.",
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

  if (!isAuthenticated || user?.userType !== 'provider') {
    return null;
  }

  const appointments = dashboardData?.appointments || [];
  const analytics = dashboardData?.analytics;
  
  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) > new Date() && apt.status === 'scheduled'
  );
  const todaysAppointments = appointments.filter(apt => {
    const today = new Date();
    const aptDate = new Date(apt.appointmentDate);
    return aptDate.toDateString() === today.toDateString() && apt.status === 'scheduled';
  });

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
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
            Provider Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, Dr. {user.firstName}! Manage your practice and patients.
          </p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-primary-custom" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics?.profileViews.totalViews || 0}
                  </p>
                  <p className="text-xs text-gray-500">
                    {analytics?.profileViews.viewsLast30Days || 0} this month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics?.appointments.totalAppointments || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics?.appointments.scheduledAppointments || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Patients</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todaysAppointments.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>
                    Appointments scheduled for today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {todaysAppointments.length === 0 ? (
                    <div className="text-center py-6">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No appointments today</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {todaysAppointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-medium text-gray-900">
                                  {appointment.patientName}
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
                                  <Clock className="h-4 w-4" />
                                  <span>{formatTime(appointment.appointmentDate)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Phone className="h-4 w-4" />
                                  <span>{appointment.patientPhone}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ${appointment.service.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    Your next scheduled appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-6">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No upcoming appointments</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {upcomingAppointments.slice(0, 5).map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 mb-1">
                                {appointment.patientName}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {appointment.service.name}
                              </p>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(appointment.appointmentDate)}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{formatTime(appointment.appointmentDate)}</span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Performance</CardTitle>
                  <CardDescription>
                    How patients are finding and viewing your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Profile Views</span>
                      <span className="text-2xl font-bold">
                        {analytics?.profileViews.totalViews || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Views This Month</span>
                      <span className="text-2xl font-bold text-green-600">
                        {analytics?.profileViews.viewsLast30Days || 0}
                      </span>
                    </div>
                    <div className="pt-4">
                      <h4 className="text-sm font-medium mb-3">Recent Profile Views</h4>
                      {analytics?.recentViews && analytics.recentViews.length > 0 ? (
                        <div className="space-y-2">
                          {analytics.recentViews.slice(0, 5).map((view) => (
                            <div key={view.id} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">
                                {view.source ? `From ${view.source}` : 'Direct view'}
                              </span>
                              <span className="text-gray-500">
                                {formatDateTime(view.viewedAt)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No recent views</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Statistics</CardTitle>
                  <CardDescription>
                    Overview of your appointment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Scheduled</span>
                      </div>
                      <span className="text-lg font-bold">
                        {analytics?.appointments.scheduledAppointments || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                      <span className="text-lg font-bold">
                        {analytics?.appointments.completedAppointments || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">Cancelled</span>
                      </div>
                      <span className="text-lg font-bold">
                        {analytics?.appointments.cancelledAppointments || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>
                  Update your professional profile and service information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={() => setLocation('/join-provider')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Update Profile Information
                  </Button>
                  <Button variant="outline" disabled>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Manage Services & Pricing
                  </Button>
                  <Button variant="outline" disabled>
                    <Calendar className="h-4 w-4 mr-2" />
                    Set Availability
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}