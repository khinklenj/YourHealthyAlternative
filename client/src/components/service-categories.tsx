import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type ServiceCategory } from "@shared/schema";

// Import generated service category images
import acupunctureImg from "@assets/generated_images/Acupuncture_treatment_scene_4cb01807.png";
import naturopathyImg from "@assets/generated_images/Naturopathy_herbs_and_oils_0af5d03b.png";
import massageImg from "@assets/generated_images/Massage_therapy_session_1d833de8.png";
import chiropracticImg from "@assets/generated_images/Chiropractic_spine_care_d1eeb1bd.png";
import ayurvedaImg from "@assets/generated_images/Ayurvedic_healing_setup_0d3dbaaa.png";
import reikiImg from "@assets/generated_images/Reiki_energy_healing_99bec1da.png";
import herbalImg from "@assets/generated_images/Herbal_medicine_collection_ab5335e5.png";
import homeopathyImg from "@assets/generated_images/Homeopathy_remedy_bottles_8eac6690.png";
import reflexologyImg from "@assets/generated_images/Reflexology_foot_therapy_08f9bd8f.png";
import aromatherapyImg from "@assets/generated_images/Aromatherapy_oils_setup_ef0241b9.png";
import meditationImg from "@assets/generated_images/Meditation_mindfulness_practice_96edd41f.png";
import craniosacralImg from "@assets/generated_images/Craniosacral_therapy_session_33572845.png";

// Category ID to image mapping
const categoryImages: Record<string, string> = {
  acupuncture: acupunctureImg,
  naturopathy: naturopathyImg,
  massage: massageImg,
  chiropractic: chiropracticImg,
  ayurveda: ayurvedaImg,
  reiki: reikiImg,
  herbalmedicine: herbalImg,
  homeopathy: homeopathyImg,
  reflexology: reflexologyImg,
  aromatherapy: aromatherapyImg,
  meditation: meditationImg,
  craniosacral: craniosacralImg,
};

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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-center animate-pulse border border-gray-100">
                <div className="w-20 h-20 bg-gray-300 rounded-lg mx-auto mb-4"></div>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer border border-gray-100 overflow-hidden"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden">
                <img 
                  src={categoryImages[category.id] || categoryImages.acupuncture} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
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
