import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ServiceCategories from "@/components/service-categories";
import FeaturedProviders from "@/components/featured-providers";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <ServiceCategories />
      <FeaturedProviders />
      
      {/* Trust and Safety Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Safety & Trust Matter</h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">All providers on HealNaturally are verified, licensed professionals committed to your wellbeing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-certificate text-primary text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Verified Credentials</h3>
              <p className="text-warm-gray">All providers undergo thorough background checks and credential verification before joining our platform.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-secondary text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Secure Booking</h3>
              <p className="text-warm-gray">Your personal information and payment details are protected with bank-level security encryption.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-accent text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Patient Reviews</h3>
              <p className="text-warm-gray">Read authentic reviews from verified patients to make informed decisions about your care.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
