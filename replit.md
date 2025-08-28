# Your Healthy Alternative

## Overview

"Your Healthy Alternative" is a full-stack web application for connecting patients with alternative medicine providers. The platform allows users to browse providers by specialty (acupuncture, naturopathy, chiropractic, etc.), read reviews, and book appointments. It features a modern React frontend with a comprehensive provider directory, rotating hero images, and visual service categories.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend uses **React with TypeScript** and follows a component-based architecture:

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Authentication**: Custom authentication system with session management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Build Tool**: Vite for fast development and optimized builds

The application is structured with pages for home, provider search, individual provider details, and separate dashboards for customers and providers. Key components include provider cards, search filters, booking widgets, review sections, authentication modals, and dashboard analytics.

### Backend Architecture

The backend uses **Express.js with TypeScript** in a RESTful API pattern:

- **Server Framework**: Express.js with middleware for JSON parsing and request logging
- **Database Layer**: Drizzle ORM for type-safe PostgreSQL database operations
- **Authentication**: Session-based authentication with secure password hashing (bcryptjs)
- **Session Management**: PostgreSQL session store with express-session
- **API Design**: RESTful endpoints for providers, services, appointments, reviews, authentication, and dashboards

The server handles provider search with filtering, appointment booking, review management, user authentication, and dashboard analytics with profile view tracking.

### Data Storage Solutions

**Database Schema** (PostgreSQL via Drizzle):
- **Users**: Customer and provider accounts with authentication credentials and profile information
- **Sessions**: Session storage table for secure user authentication
- **Providers**: Core provider information including specialties, contact details, availability (expanded to 7 providers)
- **Services**: Individual services offered by providers with pricing and duration (13 services total)
- **Service Categories**: Hierarchical categorization of alternative medicine types (12 categories)
- **Reviews**: Patient feedback and ratings system (7 reviews total)
- **Appointments**: Booking management with patient information and provider assignments
- **Profile Views**: Analytics tracking for provider profile visits with source attribution
- **Office Hours**: JSON-based flexible scheduling data

**Service Categories** include: Acupuncture, Naturopathy, Massage Therapy, Chiropractic, Herbal Medicine, Reiki, Ayurveda, Homeopathy, Reflexology, Aromatherapy, Craniosacral Therapy, and Meditation & Mindfulness.

The schema uses string-based primary keys and includes proper foreign key relationships. Authentication uses bcryptjs for secure password hashing.

### Component Architecture

**Shared Components**:
- Reusable UI components from shadcn/ui library
- Custom components for provider cards, search filters, and booking widgets
- Responsive design with mobile-first approach

**Page Structure**:
- Home page with hero section, service categories, and featured providers
- Provider search page with advanced filtering
- Individual provider detail pages with booking capability
- Customer dashboard with appointment management and statistics
- Provider dashboard with analytics, appointment management, and profile insights
- Authentication modals with login/register forms and validation

### Visual Assets

**Image Implementation**:
- Hero section features 5 rotating wellness images (4-second intervals)
- Service categories display custom generated images for each specialty
- Images stored in client/public/images/ for direct URL access
- Successful loading verified with browser console logging

**Asset Structure**:
- `/images/hero/` - 5 rotating hero images (wellness-center, acupuncture-session, etc.)
- `/images/categories/` - 12 service category images matching specialties

### Development & Build Process

**Development Stack**:
- TypeScript for type safety across frontend and backend
- Vite with HMR for fast development iteration
- ESBuild for production server bundling
- PostCSS with Tailwind for CSS processing

**Deployment Architecture**:
- Frontend builds to static assets served by Express
- Single-process deployment with embedded static file serving
- Environment-based configuration for database connections