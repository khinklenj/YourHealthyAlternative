import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [searchData, setSearchData] = useState({
    serviceType: "",
    location: "",
    insurance: ""
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.serviceType && searchData.serviceType !== "All Services") {
      params.append("serviceType", searchData.serviceType);
    }
    if (searchData.location) {
      params.append("location", searchData.location);
    }
    if (searchData.insurance === "Accepts Insurance") {
      params.append("acceptsInsurance", "true");
    }
    
    setLocation(`/providers?${params.toString()}`);
  };

  return (
    <section className="bg-gradient-to-br from-primary-custom to-secondary-custom text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Find Trusted Alternative Medicine Providers Near You
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Connect with verified acupuncturists, naturopaths, chiropractors, and wellness practitioners. Book appointments instantly and take control of your natural healing journey.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Service Type</Label>
                  <Select value={searchData.serviceType} onValueChange={(value) => setSearchData(prev => ({ ...prev, serviceType: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Services">All Services</SelectItem>
                      <SelectItem value="Acupuncture">Acupuncture</SelectItem>
                      <SelectItem value="Naturopathy">Naturopathy</SelectItem>
                      <SelectItem value="Chiropractic">Chiropractic</SelectItem>
                      <SelectItem value="Massage Therapy">Massage Therapy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Location</Label>
                  <Input 
                    type="text" 
                    placeholder="City, State or ZIP" 
                    value={searchData.location}
                    onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Insurance</Label>
                  <Select value={searchData.insurance} onValueChange={(value) => setSearchData(prev => ({ ...prev, insurance: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Insurance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Insurance">All Insurance</SelectItem>
                      <SelectItem value="Accepts Insurance">Accepts Insurance</SelectItem>
                      <SelectItem value="Cash Only">Cash Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={handleSearch}
                className="w-full bg-primary-custom text-white hover:bg-primary-custom/90"
              >
                <i className="fas fa-search mr-2"></i>Find Providers
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Serene wellness center interior" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
