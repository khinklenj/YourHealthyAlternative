import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Service Categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service categories" });
    }
  });

  // Providers
  app.get("/api/providers", async (req, res) => {
    try {
      const filters = {
        serviceType: req.query.serviceType as string,
        location: req.query.location as string,
        acceptsInsurance: req.query.acceptsInsurance === "true" ? true : undefined,
        newPatientsWelcome: req.query.newPatientsWelcome === "true" ? true : undefined,
        telehealthAvailable: req.query.telehealthAvailable === "true" ? true : undefined,
        eveningHours: req.query.eveningHours === "true" ? true : undefined
      };
      
      // Remove undefined values but keep empty strings for serviceType and location
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => {
          if (key === 'serviceType' || key === 'location') {
            return value !== undefined;
          }
          return value !== undefined && value !== false;
        })
      );
      
      const providers = await storage.getProviders(cleanFilters);
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch providers" });
    }
  });

  app.get("/api/providers/featured", async (_req, res) => {
    try {
      const providers = await storage.getFeaturedProviders();
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured providers" });
    }
  });

  app.get("/api/providers/:id", async (req, res) => {
    try {
      const provider = await storage.getProvider(req.params.id);
      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      res.json(provider);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch provider" });
    }
  });

  // Services
  app.get("/api/providers/:id/services", async (req, res) => {
    try {
      const services = await storage.getServicesByProvider(req.params.id);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Reviews
  app.get("/api/providers/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviewsByProvider(req.params.id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Appointments
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid appointment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  // Provider Applications
  app.post("/api/provider-applications", async (req, res) => {
    try {
      // For now, just log the application data and return success
      // In production, you would save this to a provider_applications table
      console.log("Provider application received:", req.body);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.status(201).json({
        message: "Application submitted successfully",
        applicationId: `app_${Date.now()}`,
        status: "under_review"
      });
    } catch (error) {
      console.error("Provider application error:", error);
      res.status(500).json({ message: "Failed to submit application" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
