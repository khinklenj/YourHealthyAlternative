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
      if (filters.serviceType && filters.serviceType !== "All Services") {
        providers = providers.filter(p => 
          p.specialty.toLowerCase().includes(filters.serviceType!.toLowerCase())
        );
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
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 3);
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
