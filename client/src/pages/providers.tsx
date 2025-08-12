import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchFilters from "@/components/search-filters";
import ProviderCard from "@/components/provider-card";
import { type Provider } from "@shared/schema";

export default function Providers() {
  const [filters, setFilters] = useState({
    serviceType: "all",
    location: "",
    acceptsInsurance: false,
    newPatientsWelcome: false,
    telehealthAvailable: false,
    eveningHours: false
  });

  const { data: providers = [], isLoading } = useQuery<Provider[]>({
    queryKey: ["/api/providers", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value.toString());
        }
      });
      
      const response = await fetch(`/api/providers?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch providers");
      }
      return response.json();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Provider</h1>
          <p className="text-lg text-warm-gray">Advanced search and filtering to match your specific needs</p>
        </div>

        <SearchFilters filters={filters} onFiltersChange={setFilters} />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="animate-pulse">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 mt-8">
            {providers.length > 0 ? (
              providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No providers found</h3>
                <p className="text-warm-gray">Try adjusting your search filters to find more providers in your area.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
