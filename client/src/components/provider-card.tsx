import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { type Provider } from "@shared/schema";

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start space-x-4 mb-4 lg:mb-0">
            <img 
              src={provider.imageUrl || "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"} 
              alt={`${provider.name}, ${provider.specialty}`} 
              className="w-16 h-16 rounded-full object-cover"
            />
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{provider.name}, {provider.title}</h3>
              <p className="text-secondary-custom font-medium mb-2">{provider.specialty}</p>
              
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-sm"></i>
                  ))}
                </div>
                <span className="text-warm-gray text-sm">{provider.rating} ({provider.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-center text-sm text-warm-gray mb-2">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>{provider.address}, {provider.city}, {provider.state}</span>
                <span className="mx-2">•</span>
                <span>2.3 miles</span>
              </div>
              
              <p className="text-warm-gray text-sm">{provider.experience}</p>
            </div>
          </div>
          
          <div className="lg:text-right">
            <div className="mb-3">
              <p className="text-sm text-warm-gray">Next available:</p>
              <p className="font-semibold text-gray-900">{provider.nextAvailable}</p>
            </div>
            
            <div className="flex lg:flex-col gap-2">
              <Link href={`/provider/${provider.id}`} className="flex-1 lg:flex-none">
                <Button className="w-full bg-primary-custom text-white hover:bg-primary-custom/90">
                  Book Appointment
                </Button>
              </Link>
              <Link href={`/provider/${provider.id}`} className="flex-1 lg:flex-none">
                <Button variant="outline" className="w-full border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
