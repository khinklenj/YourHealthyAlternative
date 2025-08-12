# Alternative Medicine Provider Platform

## Overview

This is a full-stack web application for connecting patients with alternative medicine providers. The platform allows users to browse providers by specialty (acupuncture, naturopathy, chiropractic, etc.), read reviews, and book appointments. It features a modern React frontend with a comprehensive provider directory and booking system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend uses **React with TypeScript** and follows a component-based architecture:

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Build Tool**: Vite for fast development and optimized builds

The application is structured with pages for home, provider search, and individual provider details. Key components include provider cards, search filters, booking widgets, and review sections.

### Backend Architecture

The backend uses **Express.js with TypeScript** in a RESTful API pattern:

- **Server Framework**: Express.js with middleware for JSON parsing and request logging
- **Database Layer**: Drizzle ORM for type-safe database operations
- **Storage Pattern**: Repository pattern with in-memory storage implementation (easily extendable to database)
- **API Design**: RESTful endpoints for providers, services, appointments, and reviews

The server handles provider search with filtering, appointment booking, and review management.

### Data Storage Solutions

**Database Schema** (designed for PostgreSQL via Drizzle):
- **Providers**: Core provider information including specialties, contact details, availability
- **Services**: Individual services offered by providers with pricing and duration
- **Service Categories**: Hierarchical categorization of alternative medicine types
- **Reviews**: Patient feedback and ratings system
- **Appointments**: Booking management with patient information
- **Office Hours**: JSON-based flexible scheduling data

The schema uses UUID primary keys and includes proper foreign key relationships.

### Component Architecture

**Shared Components**:
- Reusable UI components from shadcn/ui library
- Custom components for provider cards, search filters, and booking widgets
- Responsive design with mobile-first approach

**Page Structure**:
- Home page with hero section, service categories, and featured providers
- Provider search page with advanced filtering
- Individual provider detail pages with booking capability

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