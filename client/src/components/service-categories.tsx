import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type ServiceCategory } from "@shared/schema";

export default function ServiceCategories() {
  const [, setLocation] = useLocation();
  
  const { data: categories = [], isLoading } = useQuery<ServiceCategory[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    }
  });

  const handleCategoryClick = (categoryName: string) => {
    setLocation(`/providers?serviceType=${encodeURIComponent(categoryName)}`);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Alternative Medicine Services</h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">Find the right natural healing approach for your wellness journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full mx-auto mb-3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Alternative Medicine Services</h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">Find the right natural healing approach for your wellness journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${category.icon} text-primary text-2xl`}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-warm-gray text-sm mb-3">{category.description}</p>
              <p className="text-primary font-medium text-sm">{category.providerCount} Providers</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
