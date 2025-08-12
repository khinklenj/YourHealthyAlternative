import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import hero images
import wellnessCenterImg from "@assets/generated_images/Wellness_center_interior_116b37e0.png";
import acupunctureSessionImg from "@assets/generated_images/Acupuncture_treatment_session_3ef6916d.png";
import naturopathicConsultImg from "@assets/generated_images/Naturopathic_consultation_11e21893.png";
import massageRoomImg from "@assets/generated_images/Massage_therapy_room_10486ab3.png";
import holisticCenterImg from "@assets/generated_images/Holistic_healing_center_c37428ae.png";

// Hero images array for rotation
const heroImages = [
  {
    src: wellnessCenterImg,
    alt: "Peaceful wellness center interior with natural lighting",
    title: "Modern Wellness Centers"
  },
  {
    src: acupunctureSessionImg,
    alt: "Professional acupuncture treatment session",
    title: "Expert Acupuncture Care"
  },
  {
    src: naturopathicConsultImg,
    alt: "Naturopathic doctor consultation",
    title: "Naturopathic Medicine"
  },
  {
    src: massageRoomImg,
    alt: "Serene massage therapy room",
    title: "Therapeutic Massage"
  },
  {
    src: holisticCenterImg,
    alt: "Holistic healing center environment",
    title: "Holistic Healthcare"
  }
];

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchData, setSearchData] = useState({
    serviceType: "all",
    location: "",
    insurance: ""
  });

  // Rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.serviceType && searchData.serviceType !== "All Services" && searchData.serviceType !== "all") {
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
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="Acupuncture">Acupuncture</SelectItem>
                      <SelectItem value="Naturopathy">Naturopathy</SelectItem>
                      <SelectItem value="Chiropractic">Chiropractic</SelectItem>
                      <SelectItem value="Massage Therapy">Massage Therapy</SelectItem>
                      <SelectItem value="Herbal Medicine">Herbal Medicine</SelectItem>
                      <SelectItem value="Reiki">Reiki</SelectItem>
                      <SelectItem value="Ayurveda">Ayurveda</SelectItem>
                      <SelectItem value="Homeopathy">Homeopathy</SelectItem>
                      <SelectItem value="Reflexology">Reflexology</SelectItem>
                      <SelectItem value="Aromatherapy">Aromatherapy</SelectItem>
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
          <div className="hidden lg:block relative">
            <div className="relative overflow-hidden rounded-lg shadow-xl bg-gray-200">
              {heroImages.map((image, index) => (
                <img 
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`absolute top-0 left-0 w-full h-[500px] object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold transition-opacity duration-500">
                  {heroImages[currentImageIndex].title}
                </h3>
              </div>
            </div>
            
            {/* Image indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
