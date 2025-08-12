import { 
  type ServiceCategory, 
  type InsertServiceCategory,
  type Provider, 
  type InsertProvider,
  type Service,
  type InsertService,
  type Review,
  type InsertReview,
  type Appointment,
  type InsertAppointment,
  type OfficeHours
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Service Categories
  getServiceCategories(): Promise<ServiceCategory[]>;
  getServiceCategory(id: string): Promise<ServiceCategory | undefined>;
  createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory>;

  // Providers
  getProviders(filters?: {
    serviceType?: string;
    location?: string;
    acceptsInsurance?: boolean;
    newPatientsWelcome?: boolean;
    telehealthAvailable?: boolean;
    eveningHours?: boolean;
  }): Promise<Provider[]>;
  getProvider(id: string): Promise<Provider | undefined>;
  createProvider(provider: InsertProvider): Promise<Provider>;
  getFeaturedProviders(): Promise<Provider[]>;

  // Services
  getServicesByProvider(providerId: string): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Reviews
  getReviewsByProvider(providerId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Appointments
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentsByProvider(providerId: string): Promise<Appointment[]>;
}

export class MemStorage implements IStorage {
  private serviceCategories: Map<string, ServiceCategory>;
  private providers: Map<string, Provider>;
  private services: Map<string, Service>;
  private reviews: Map<string, Review>;
  private appointments: Map<string, Appointment>;

  constructor() {
    this.serviceCategories = new Map();
    this.providers = new Map();
    this.services = new Map();
    this.reviews = new Map();
    this.appointments = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed service categories
    const categories: ServiceCategory[] = [
      {
        id: "acupuncture",
        name: "Acupuncture",
        description: "Traditional Chinese medicine technique using thin needles",
        icon: "fas fa-leaf",
        providerCount: 234
      },
      {
        id: "naturopathy",
        name: "Naturopathy",
        description: "Natural medicine focusing on the body's healing ability",
        icon: "fas fa-seedling",
        providerCount: 156
      },
      {
        id: "massage",
        name: "Massage Therapy",
        description: "Therapeutic manipulation of muscles and soft tissues",
        icon: "fas fa-hands",
        providerCount: 189
      },
      {
        id: "chiropractic",
        name: "Chiropractic",
        description: "Spinal adjustment and musculoskeletal treatment",
        icon: "fas fa-bone",
        providerCount: 298
      },
      {
        id: "herbalmedicine",
        name: "Herbal Medicine",
        description: "Plant-based remedies and botanical treatments",
        icon: "fas fa-spa",
        providerCount: 143
      },
      {
        id: "reiki",
        name: "Reiki",
        description: "Energy healing through gentle touch and meditation",
        icon: "fas fa-hand-sparkles",
        providerCount: 87
      },
      {
        id: "ayurveda",
        name: "Ayurveda",
        description: "Ancient Indian holistic healing system",
        icon: "fas fa-yin-yang",
        providerCount: 72
      },
      {
        id: "homeopathy",
        name: "Homeopathy",
        description: "Natural remedies using highly diluted substances",
        icon: "fas fa-vial",
        providerCount: 94
      },
      {
        id: "reflexology",
        name: "Reflexology",
        description: "Pressure point therapy focusing on feet and hands",
        icon: "fas fa-shoe-prints",
        providerCount: 65
      },
      {
        id: "aromatherapy",
        name: "Aromatherapy",
        description: "Essential oil therapy for wellness and relaxation",
        icon: "fas fa-burn",
        providerCount: 58
      },
      {
        id: "craniosacral",
        name: "Craniosacral Therapy",
        description: "Gentle manipulation of skull and spine",
        icon: "fas fa-head-side-brain",
        providerCount: 41
      },
      {
        id: "meditation",
        name: "Meditation & Mindfulness",
        description: "Mind-body practices for stress reduction and wellness",
        icon: "fas fa-peace",
        providerCount: 112
      }
    ];

    categories.forEach(category => {
      this.serviceCategories.set(category.id, category);
    });

    // Seed providers
    const sampleProviders: Provider[] = [
      {
        id: "provider-1",
        name: "Dr. Sarah Chen",
        specialty: "Licensed Acupuncturist",
        title: "LAc",
        bio: "Dr. Sarah Chen brings over 15 years of experience in Traditional Chinese Medicine and acupuncture. She specializes in pain management, stress reduction, and fertility support.",
        experience: "15+ years experience • Traditional Chinese Medicine",
        philosophy: "Her treatment philosophy combines ancient wisdom with modern understanding, creating personalized treatment plans that address the root cause of health issues while promoting overall wellness and balance.",
        phone: "(206) 555-0123",
        email: "info@sarahchenacupuncture.com",
        address: "Downtown Wellness Center, 123 Health Street, Suite 205",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        rating: "4.9",
        reviewCount: 127,
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        acceptsInsurance: true,
        newPatientsWelcome: true,
        telehealthAvailable: false,
        eveningHours: true,
        officeHours: [
          { day: "Monday", hours: "9:00 AM - 6:00 PM" },
          { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
          { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
          { day: "Thursday", hours: "9:00 AM - 8:00 PM" },
          { day: "Friday", hours: "9:00 AM - 5:00 PM" },
          { day: "Saturday", hours: "10:00 AM - 3:00 PM" },
          { day: "Sunday", hours: "Closed" }
        ],
        nextAvailable: "Today 2:30 PM"
      },
      {
        id: "provider-2",
        name: "Dr. Michael Torres",
        specialty: "Naturopathic Doctor",
        title: "ND",
        bio: "Dr. Michael Torres is a licensed naturopathic doctor with over 12 years of experience in functional medicine and natural healing.",
        experience: "12+ years experience • Functional Medicine",
        philosophy: "Focuses on treating the whole person and addressing root causes of illness through natural therapies.",
        phone: "(503) 555-0456",
        email: "info@naturalhealthpdx.com",
        address: "Natural Health Clinic, 456 Wellness Ave",
        city: "Portland",
        state: "OR",
        zipCode: "97201",
        rating: "4.8",
        reviewCount: 89,
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        acceptsInsurance: false,
        newPatientsWelcome: true,
        telehealthAvailable: true,
        eveningHours: false,
        officeHours: [
          { day: "Monday", hours: "8:00 AM - 5:00 PM" },
          { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
          { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
          { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
          { day: "Friday", hours: "8:00 AM - 4:00 PM" },
          { day: "Saturday", hours: "Closed" },
          { day: "Sunday", hours: "Closed" }
        ],
        nextAvailable: "Tomorrow 10:00 AM"
      },
      {
        id: "provider-3",
        name: "Lisa Wang",
        specialty: "Licensed Massage Therapist",
        title: "LMT",
        bio: "Lisa Wang is a licensed massage therapist specializing in deep tissue and Swedish massage techniques.",
        experience: "8+ years experience • Deep Tissue & Swedish",
        philosophy: "Believes in the healing power of therapeutic touch to restore balance and promote wellness.",
        phone: "(415) 555-0789",
        email: "lisa@tranquilspa.com",
        address: "Tranquil Spa, 789 Serenity Blvd",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        rating: "5.0",
        reviewCount: 64,
        imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        acceptsInsurance: true,
        newPatientsWelcome: true,
        telehealthAvailable: false,
        eveningHours: true,
        officeHours: [
          { day: "Monday", hours: "9:00 AM - 8:00 PM" },
          { day: "Tuesday", hours: "9:00 AM - 8:00 PM" },
          { day: "Wednesday", hours: "9:00 AM - 8:00 PM" },
          { day: "Thursday", hours: "9:00 AM - 8:00 PM" },
          { day: "Friday", hours: "9:00 AM - 6:00 PM" },
          { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
          { day: "Sunday", hours: "10:00 AM - 4:00 PM" }
        ],
        nextAvailable: "Today 4:00 PM"
      },
      {
        id: "provider-4",
        name: "Dr. Jennifer Martinez",
        specialty: "Chiropractic Doctor",
        title: "DC",
        bio: "Dr. Jennifer Martinez specializes in sports injuries, spinal adjustment, and preventive care with 10+ years experience.",
        experience: "10+ years experience • Sports Medicine",
        philosophy: "Focuses on restoring proper spinal alignment and movement to optimize overall health and performance.",
        phone: "(512) 555-0321",
        email: "info@spinehealthatx.com",
        address: "Spine Health Center, 321 Athletic Way",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        rating: "4.9",
        reviewCount: 156,
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        acceptsInsurance: true,
        newPatientsWelcome: true,
        telehealthAvailable: false,
        eveningHours: true,
        officeHours: [
          { day: "Monday", hours: "7:00 AM - 7:00 PM" },
          { day: "Tuesday", hours: "7:00 AM - 7:00 PM" },
          { day: "Wednesday", hours: "7:00 AM - 7:00 PM" },
          { day: "Thursday", hours: "7:00 AM - 7:00 PM" },
          { day: "Friday", hours: "7:00 AM - 5:00 PM" },
          { day: "Saturday", hours: "8:00 AM - 2:00 PM" },
          { day: "Sunday", hours: "Closed" }
        ],
        nextAvailable: "Today 3:15 PM"
      },
      {
        id: "provider-5",
        name: "Dr. Priya Sharma",
        specialty: "Ayurvedic Practitioner",
        title: "BAMS",
        bio: "Dr. Priya Sharma is a certified Ayurvedic practitioner with expertise in traditional Indian medicine, specializing in digestive health and stress management.",
        experience: "12+ years experience • Ayurveda & Panchakarma",
        philosophy: "Believes in balancing mind, body, and spirit through personalized Ayurvedic treatments and lifestyle modifications.",
        phone: "(303) 555-0654",
        email: "info@ayurvedawellness.com",
        address: "Holistic Health Center, 567 Wellness Drive",
        city: "Denver",
        state: "CO",
        zipCode: "80202",
        rating: "4.8",
        reviewCount: 73,
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        acceptsInsurance: false,
        newPatientsWelcome: true,
        telehealthAvailable: true,
        eveningHours: false,
        officeHours: [
          { day: "Monday", hours: "9:00 AM - 6:00 PM" },
          { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
          { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
          { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
          { day: "Friday", hours: "9:00 AM - 5:00 PM" },
          { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
          { day: "Sunday", hours: "Closed" }
        ],
        nextAvailable: "Tomorrow 11:00 AM"
      },
      {
        id: "provider-6",
        name: "Emily Rodriguez",
        specialty: "Reiki Master",
        title: "RMT",
        bio: "Emily Rodriguez is a certified Reiki Master and energy healer with training in multiple healing modalities including crystal therapy.",
        experience: "7+ years experience • Reiki & Energy Healing",
        philosophy: "Focuses on channeling universal life energy to promote healing, relaxation, and spiritual growth.",
        phone: "(619) 555-0987",
        email: "emily@energyhealingsd.com",
        address: "Serenity Healing Space, 890 Harmony Lane",
        city: "San Diego",
        state: "CA",
        zipCode: "92101",
        rating: "4.9",
        reviewCount: 42,
        imageUrl: "https://images.unsplash.com/photo-1506629905607-53e103a5cbab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        acceptsInsurance: false,
        newPatientsWelcome: true,
        telehealthAvailable: true,
        eveningHours: true,
        officeHours: [
          { day: "Monday", hours: "10:00 AM - 8:00 PM" },
          { day: "Tuesday", hours: "10:00 AM - 8:00 PM" },
          { day: "Wednesday", hours: "10:00 AM - 8:00 PM" },
          { day: "Thursday", hours: "10:00 AM - 8:00 PM" },
          { day: "Friday", hours: "10:00 AM - 6:00 PM" },
          { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
          { day: "Sunday", hours: "11:00 AM - 4:00 PM" }
        ],
        nextAvailable: "Today 6:00 PM"
      },
      {
        id: "provider-7",
        name: "Dr. James Thompson",
        specialty: "Homeopathic Doctor",
        title: "DHM",
        bio: "Dr. James Thompson specializes in classical homeopathy with over 15 years of experience treating chronic conditions naturally.",
        experience: "15+ years experience • Classical Homeopathy",
        philosophy: "Treats the whole person using individualized homeopathic remedies to stimulate the body's natural healing response.",
        phone: "(503) 555-0321",
        email: "info@portlandhomeopathy.com",
        address: "Natural Medicine Clinic, 432 Holistic Way",
        city: "Portland",
        state: "OR",
        zipCode: "97205",
        rating: "4.7",
        reviewCount: 98,
        imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        acceptsInsurance: true,
        newPatientsWelcome: true,
        telehealthAvailable: true,
        eveningHours: false,
        officeHours: [
          { day: "Monday", hours: "8:00 AM - 5:00 PM" },
          { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
          { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
          { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
          { day: "Friday", hours: "8:00 AM - 4:00 PM" },
          { day: "Saturday", hours: "Closed" },
          { day: "Sunday", hours: "Closed" }
        ],
        nextAvailable: "Tomorrow 2:00 PM"
      }
    ];

    sampleProviders.forEach(provider => {
      this.providers.set(provider.id, provider);
    });

    // Seed services
    const sampleServices: Service[] = [
      {
        id: "service-1",
        providerId: "provider-1",
        name: "Traditional Acupuncture",
        description: "Classical needle therapy for pain, stress, and wellness",
        price: "120.00",
        duration: 90,
        categoryId: "acupuncture"
      },
      {
        id: "service-2",
        providerId: "provider-1",
        name: "Cupping Therapy",
        description: "Ancient technique for muscle tension and circulation",
        price: "80.00",
        duration: 60,
        categoryId: "acupuncture"
      },
      {
        id: "service-3",
        providerId: "provider-1",
        name: "Herbal Consultation",
        description: "Personalized herbal medicine prescriptions",
        price: "150.00",
        duration: 75,
        categoryId: "acupuncture"
      },
      {
        id: "service-4",
        providerId: "provider-1",
        name: "Fertility Support",
        description: "Specialized acupuncture for reproductive health",
        price: "140.00",
        duration: 90,
        categoryId: "acupuncture"
      },
      {
        id: "service-5",
        providerId: "provider-2",
        name: "Naturopathic Consultation",
        description: "Comprehensive health assessment and natural treatment plan",
        price: "200.00",
        duration: 90,
        categoryId: "naturopathy"
      },
      {
        id: "service-6",
        providerId: "provider-3",
        name: "Deep Tissue Massage",
        description: "Therapeutic massage for muscle tension and pain relief",
        price: "130.00",
        duration: 90,
        categoryId: "massage"
      },
      {
        id: "service-7",
        providerId: "provider-4",
        name: "Chiropractic Adjustment",
        description: "Spinal manipulation to restore proper alignment",
        price: "85.00",
        duration: 30,
        categoryId: "chiropractic"
      },
      {
        id: "service-8",
        providerId: "provider-5",
        name: "Ayurvedic Consultation",
        description: "Comprehensive health assessment based on Ayurvedic principles",
        price: "180.00",
        duration: 90,
        categoryId: "ayurveda"
      },
      {
        id: "service-9",
        providerId: "provider-5",
        name: "Panchakarma Detox",
        description: "Traditional Ayurvedic detoxification and rejuvenation therapy",
        price: "300.00",
        duration: 120,
        categoryId: "ayurveda"
      },
      {
        id: "service-10",
        providerId: "provider-6",
        name: "Reiki Energy Healing",
        description: "Full body energy healing session with chakra balancing",
        price: "95.00",
        duration: 60,
        categoryId: "reiki"
      },
      {
        id: "service-11",
        providerId: "provider-6",
        name: "Crystal Therapy",
        description: "Healing session using specific crystals and gemstones",
        price: "110.00",
        duration: 75,
        categoryId: "reiki"
      },
      {
        id: "service-12",
        providerId: "provider-7",
        name: "Homeopathic Consultation",
        description: "Detailed health assessment and personalized remedy selection",
        price: "160.00",
        duration: 90,
        categoryId: "homeopathy"
      },
      {
        id: "service-13",
        providerId: "provider-7",
        name: "Constitutional Remedy",
        description: "Deep-acting homeopathic treatment for chronic conditions",
        price: "200.00",
        duration: 120,
        categoryId: "homeopathy"
      }
    ];

    sampleServices.forEach(service => {
      this.services.set(service.id, service);
    });

    // Seed reviews
    const sampleReviews: Review[] = [
      {
        id: "review-1",
        providerId: "provider-1",
        patientName: "Jennifer M.",
        rating: 5,
        content: "Dr. Chen helped me tremendously with my chronic back pain. After just a few sessions, I noticed significant improvement. She's very knowledgeable and takes time to explain the treatment process. Highly recommend!",
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 3 weeks ago
        verified: true
      },
      {
        id: "review-2",
        providerId: "provider-1",
        patientName: "Michael R.",
        rating: 5,
        content: "Professional, caring, and effective treatment. Dr. Chen's acupuncture sessions have significantly reduced my stress levels and improved my sleep quality. The office is clean and peaceful too.",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
        verified: true
      },
      {
        id: "review-3",
        providerId: "provider-2",
        patientName: "Sarah K.",
        rating: 5,
        content: "Dr. Torres took the time to really understand my health concerns and created a comprehensive treatment plan. I've seen improvements in my energy levels and digestion.",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
        verified: true
      },
      {
        id: "review-4",
        providerId: "provider-3",
        patientName: "David L.",
        rating: 5,
        content: "Lisa is an amazing massage therapist. Her deep tissue work has helped me recover from sports injuries faster than I expected. Highly skilled and professional.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        verified: true
      },
      {
        id: "review-5",
        providerId: "provider-5",
        patientName: "Maria K.",
        rating: 5,
        content: "Dr. Sharma's Ayurvedic approach has transformed my digestive health. Her personalized treatment plan and dietary recommendations have made a huge difference in my overall well-being.",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        verified: true
      },
      {
        id: "review-6",
        providerId: "provider-6",
        patientName: "James P.",
        rating: 5,
        content: "Emily's Reiki sessions are incredible. I always leave feeling balanced and peaceful. Her energy work has helped me manage stress and anxiety much better.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        verified: true
      },
      {
        id: "review-7",
        providerId: "provider-7",
        patientName: "Rebecca S.",
        rating: 4,
        content: "Dr. Thompson's homeopathic treatment has been very helpful for my chronic fatigue. He takes time to understand the whole picture and his remedies are gentle yet effective.",
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
        verified: true
      }
    ];

    sampleReviews.forEach(review => {
      this.reviews.set(review.id, review);
    });
  }

  async getServiceCategories(): Promise<ServiceCategory[]> {
    return Array.from(this.serviceCategories.values());
  }

  async getServiceCategory(id: string): Promise<ServiceCategory | undefined> {
    return this.serviceCategories.get(id);
  }

  async createServiceCategory(insertCategory: InsertServiceCategory): Promise<ServiceCategory> {
    const id = randomUUID();
    const category: ServiceCategory = { 
      ...insertCategory, 
      id,
      providerCount: 0
    };
    this.serviceCategories.set(id, category);
    return category;
  }

  async getProviders(filters?: {
    serviceType?: string;
    location?: string;
    acceptsInsurance?: boolean;
    newPatientsWelcome?: boolean;
    telehealthAvailable?: boolean;
    eveningHours?: boolean;
  }): Promise<Provider[]> {
    let providers = Array.from(this.providers.values());
    
    if (filters) {
      if (filters.acceptsInsurance !== undefined) {
        providers = providers.filter(p => p.acceptsInsurance === filters.acceptsInsurance);
      }
      if (filters.newPatientsWelcome !== undefined) {
        providers = providers.filter(p => p.newPatientsWelcome === filters.newPatientsWelcome);
      }
      if (filters.telehealthAvailable !== undefined) {
        providers = providers.filter(p => p.telehealthAvailable === filters.telehealthAvailable);
      }
      if (filters.eveningHours !== undefined) {
        providers = providers.filter(p => p.eveningHours === filters.eveningHours);
      }
      if (filters.location) {
        providers = providers.filter(p => 
          p.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
          p.state.toLowerCase().includes(filters.location!.toLowerCase()) ||
          p.zipCode.includes(filters.location!)
        );
      }
      if (filters.serviceType && filters.serviceType !== "All Services" && filters.serviceType !== "all") {
        providers = providers.filter(p => {
          const specialty = p.specialty.toLowerCase();
          const filterType = filters.serviceType!.toLowerCase();
          
          // Handle various specialty name variations
          return specialty.includes(filterType) ||
                 (filterType === "acupuncture" && specialty.includes("acupuncturist")) ||
                 (filterType === "naturopathy" && specialty.includes("naturopathic")) ||
                 (filterType === "massage therapy" && specialty.includes("massage")) ||
                 (filterType === "chiropractic" && specialty.includes("chiropractic")) ||
                 (filterType === "herbal medicine" && specialty.includes("herbalist")) ||
                 (filterType === "reiki" && specialty.includes("reiki")) ||
                 (filterType === "ayurveda" && specialty.includes("ayurvedic")) ||
                 (filterType === "homeopathy" && specialty.includes("homeopathic")) ||
                 (filterType === "reflexology" && specialty.includes("reflexologist")) ||
                 (filterType === "aromatherapy" && specialty.includes("aromatherapist")) ||
                 (filterType === "craniosacral therapy" && specialty.includes("craniosacral")) ||
                 (filterType === "meditation" && specialty.includes("meditation"));
        });
      }
    }
    
    return providers;
  }

  async getProvider(id: string): Promise<Provider | undefined> {
    return this.providers.get(id);
  }

  async createProvider(insertProvider: InsertProvider): Promise<Provider> {
    const id = randomUUID();
    const provider: Provider = { 
      ...insertProvider, 
      id,
      rating: "0.00",
      reviewCount: 0
    };
    this.providers.set(id, provider);
    return provider;
  }

  async getFeaturedProviders(): Promise<Provider[]> {
    return Array.from(this.providers.values())
      .filter(p => parseFloat(p.rating) >= 4.7)
      .sort((a, b) => {
        const ratingDiff = parseFloat(b.rating) - parseFloat(a.rating);
        if (ratingDiff === 0) {
          return b.reviewCount - a.reviewCount;
        }
        return ratingDiff;
      })
      .slice(0, 4);
  }

  async getServicesByProvider(providerId: string): Promise<Service[]> {
    return Array.from(this.services.values())
      .filter(service => service.providerId === providerId);
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  async getReviewsByProvider(providerId: string): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.providerId === providerId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: new Date(),
      verified: true
    };
    this.reviews.set(id, review);
    return review;
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = { 
      ...insertAppointment, 
      id,
      createdAt: new Date()
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointmentsByProvider(providerId: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values())
      .filter(appointment => appointment.providerId === providerId);
  }
}

export const storage = new MemStorage();
