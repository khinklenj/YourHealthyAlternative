import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { type Provider } from "@shared/schema";

export default function FeaturedProviders() {
  const { data: providers = [], isLoading } = useQuery<Provider[]>({
    queryKey: ["/api/providers/featured"],
    queryFn: async () => {
      const response = await fetch("/api/providers/featured");
      if (!response.ok) {
        throw new Error("Failed to fetch featured providers");
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Top-Rated Providers</h2>
              <p className="text-lg text-warm-gray">Highly recommended by patients in your area</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top-Rated Providers</h2>
            <p className="text-lg text-warm-gray">Highly recommended by patients in your area</p>
          </div>
          <Link href="/providers" className="text-primary-custom font-semibold hover:text-primary-custom/80">
            View All Providers <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300">
              <img 
                src={provider.imageUrl || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"} 
                alt={`${provider.name}, ${provider.specialty}`} 
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-sm"></i>
                      ))}
                    </div>
                    <span className="text-warm-gray text-sm ml-1">{provider.rating} ({provider.reviewCount})</span>
                  </div>
                </div>
                
                <p className="text-secondary-custom font-medium text-sm mb-2">{provider.specialty}</p>
                <p className="text-warm-gray text-sm mb-4">{provider.experience}</p>
                
                <div className="flex items-center text-sm text-warm-gray mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>{provider.address}, {provider.city}, {provider.state}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-warm-gray">Next available:</span>
                    <span className="font-medium text-gray-900 ml-1">{provider.nextAvailable}</span>
                  </div>
                  <Link href={`/provider/${provider.id}`}>
                    <Button className="bg-primary-custom text-white hover:bg-primary-custom/90">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
