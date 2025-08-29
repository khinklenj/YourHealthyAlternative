import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BookingWidget from "@/components/booking-widget";
import ReviewSection from "@/components/review-section";
import AuthModal from "@/components/auth/auth-modal";
import { type Provider, type Service } from "@shared/schema";
import { Button } from "@/components/ui/button";

export default function ProviderDetail() {
  const { id } = useParams();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const { data: provider, isLoading: providerLoading } = useQuery<Provider>({
    queryKey: ["/api/providers", id],
    queryFn: async () => {
      const response = await fetch(`/api/providers/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch provider");
      }
      return response.json();
    }
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/providers", id, "services"],
    queryFn: async () => {
      const response = await fetch(`/api/providers/${id}/services`);
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      return response.json();
    },
    enabled: !!id
  });

  if (providerLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-300 h-64"></div>
              <div className="p-8 space-y-4">
                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider Not Found</h1>
            <p className="text-warm-gray mb-8">The provider you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Provider Header */}
          <div className="bg-gradient-to-r from-primary-custom to-secondary-custom text-white p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <img 
                src={provider.imageUrl || "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"} 
                alt={`${provider.name} profile photo`} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
              
              <div>
                <h1 className="text-3xl font-bold mb-2">{provider.name}, {provider.title}</h1>
                <p className="text-xl text-gray-100 mb-2">{provider.specialty}</p>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <span className="text-gray-100">{provider.rating} ({provider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-gray-100">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>{provider.address}, {provider.city}, {provider.state} {provider.zipCode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {provider.name.split(' ')[1]}</h2>
                  <p className="text-warm-gray leading-relaxed mb-4">
                    {provider.bio}
                  </p>
                  {provider.philosophy && (
                    <p className="text-warm-gray leading-relaxed">
                      {provider.philosophy}
                    </p>
                  )}
                </div>

                {/* Services & Specialties */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Services & Specialties</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                        <p className="text-warm-gray text-sm mb-2">{service.description}</p>
                        <p className="font-medium text-primary-custom">${service.price} - {service.duration} minutes</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patient Reviews */}
                <ReviewSection providerId={provider.id} />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Booking Widget */}
                <BookingWidget 
                  provider={provider} 
                  services={services} 
                  onAuthRequired={(mode = 'login') => {
                    setAuthMode(mode);
                    setAuthModalOpen(true);
                  }}
                />

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="fas fa-phone text-primary-custom mr-3"></i>
                      <span className="text-warm-gray">{provider.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-envelope text-primary-custom mr-3"></i>
                      <span className="text-warm-gray">{provider.email}</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-map-marker-alt text-primary-custom mr-3 mt-1"></i>
                      <div>
                        <p className="text-warm-gray">{provider.address}</p>
                        <p className="text-warm-gray">{provider.city}, {provider.state} {provider.zipCode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
                  <div className="space-y-2">
                    {provider.officeHours?.map((schedule, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-warm-gray">{schedule.day}</span>
                        <span className="text-gray-900">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authMode}
      />
    </div>
  );
}
