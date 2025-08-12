import { pgTable, text, varchar, integer, boolean, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const serviceCategories = pgTable("service_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  providerCount: integer("provider_count").default(0)
});

export const providers = pgTable("providers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  title: text("title").notNull(), // e.g., "Dr.", "LAc", "LMT"
  bio: text("bio").notNull(),
  experience: text("experience").notNull(),
  philosophy: text("philosophy"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  reviewCount: integer("review_count").default(0),
  imageUrl: text("image_url"),
  acceptsInsurance: boolean("accepts_insurance").default(false),
  newPatientsWelcome: boolean("new_patients_welcome").default(true),
  telehealthAvailable: boolean("telehealth_available").default(false),
  eveningHours: boolean("evening_hours").default(false),
  officeHours: jsonb("office_hours").$type<OfficeHours[]>(),
  nextAvailable: text("next_available")
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(), // in minutes
  categoryId: varchar("category_id").references(() => serviceCategories.id)
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  patientName: text("patient_name").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  verified: boolean("verified").default(true)
});

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  serviceId: varchar("service_id").notNull().references(() => services.id),
  patientName: text("patient_name").notNull(),
  patientEmail: text("patient_email").notNull(),
  patientPhone: text("patient_phone").notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  status: text("status").notNull().default("scheduled"), // scheduled, completed, cancelled
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow()
});

// Type definitions
export type OfficeHours = {
  day: string;
  hours: string;
};

export type ServiceCategory = typeof serviceCategories.$inferSelect;
export type InsertServiceCategory = z.infer<typeof insertServiceCategorySchema>;

export type Provider = typeof providers.$inferSelect;
export type InsertProvider = z.infer<typeof insertProviderSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;

// Insert schemas
export const insertServiceCategorySchema = createInsertSchema(serviceCategories).omit({
  id: true,
  providerCount: true
});

export const insertProviderSchema = createInsertSchema(providers).omit({
  id: true,
  rating: true,
  reviewCount: true
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
  verified: true
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true
});
