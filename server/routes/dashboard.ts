import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireProvider, requireCustomer } from '../middleware/auth';
import { appointments, providers, services, profileViews, users } from '@shared/schema';
import { eq, desc, count, and, gte, sql } from 'drizzle-orm';

const router = Router();

// Customer dashboard - get user's appointments
router.get('/customer', requireAuth, requireCustomer, async (req, res) => {
  try {
    const userId = req.user!.id;
    
    const userAppointments = await db
      .select({
        id: appointments.id,
        appointmentDate: appointments.appointmentDate,
        status: appointments.status,
        notes: appointments.notes,
        createdAt: appointments.createdAt,
        provider: {
          id: providers.id,
          name: providers.name,
          specialty: providers.specialty,
          phone: providers.phone,
          address: providers.address,
          city: providers.city,
          state: providers.state,
        },
        service: {
          id: services.id,
          name: services.name,
          price: services.price,
          duration: services.duration,
        }
      })
      .from(appointments)
      .leftJoin(providers, eq(appointments.providerId, providers.id))
      .leftJoin(services, eq(appointments.serviceId, services.id))
      .where(eq(appointments.customerId, userId))
      .orderBy(desc(appointments.appointmentDate));

    res.json({ appointments: userAppointments });
  } catch (error) {
    console.error('Customer dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Provider dashboard - get analytics and appointments
router.get('/provider', requireAuth, requireProvider, async (req, res) => {
  try {
    const userId = req.user!.id;
    const providerId = req.user!.providerId;

    if (!providerId) {
      return res.status(400).json({ error: 'Provider profile not found' });
    }

    // Get provider's appointments
    const providerAppointments = await db
      .select({
        id: appointments.id,
        appointmentDate: appointments.appointmentDate,
        status: appointments.status,
        patientName: appointments.patientName,
        patientEmail: appointments.patientEmail,
        patientPhone: appointments.patientPhone,
        notes: appointments.notes,
        createdAt: appointments.createdAt,
        service: {
          id: services.id,
          name: services.name,
          price: services.price,
          duration: services.duration,
        }
      })
      .from(appointments)
      .leftJoin(services, eq(appointments.serviceId, services.id))
      .where(eq(appointments.providerId, providerId))
      .orderBy(desc(appointments.appointmentDate));

    // Get profile view analytics
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const profileViewStats = await db
      .select({
        totalViews: count(profileViews.id),
      })
      .from(profileViews)
      .where(eq(profileViews.providerId, providerId));

    const recentViews30Days = await db
      .select({
        viewsLast30Days: count(profileViews.id),
      })
      .from(profileViews)
      .where(and(eq(profileViews.providerId, providerId), gte(profileViews.viewedAt, thirtyDaysAgo)));

    // Get appointment statistics
    const appointmentStats = await db
      .select({
        totalAppointments: count(appointments.id),
      })
      .from(appointments)
      .where(eq(appointments.providerId, providerId));

    const scheduledCount = await db
      .select({ count: count(appointments.id) })
      .from(appointments)
      .where(and(eq(appointments.providerId, providerId), eq(appointments.status, 'scheduled')));

    const completedCount = await db
      .select({ count: count(appointments.id) })
      .from(appointments)
      .where(and(eq(appointments.providerId, providerId), eq(appointments.status, 'completed')));

    const cancelledCount = await db
      .select({ count: count(appointments.id) })
      .from(appointments)
      .where(and(eq(appointments.providerId, providerId), eq(appointments.status, 'cancelled')));

    // Get recent profile views (last 10)
    const recentViews = await db
      .select({
        id: profileViews.id,
        viewedAt: profileViews.viewedAt,
        source: profileViews.source,
      })
      .from(profileViews)
      .where(eq(profileViews.providerId, providerId))
      .orderBy(desc(profileViews.viewedAt))
      .limit(10);

    res.json({
      appointments: providerAppointments,
      analytics: {
        profileViews: {
          totalViews: profileViewStats[0]?.totalViews || 0,
          viewsLast30Days: recentViews30Days[0]?.viewsLast30Days || 0,
        },
        appointments: {
          totalAppointments: appointmentStats[0]?.totalAppointments || 0,
          scheduledAppointments: scheduledCount[0]?.count || 0,
          completedAppointments: completedCount[0]?.count || 0,
          cancelledAppointments: cancelledCount[0]?.count || 0,
        },
        recentViews: recentViews,
      }
    });
  } catch (error) {
    console.error('Provider dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Track profile view
router.post('/track-view/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;
    const { source = 'direct' } = req.body;
    const viewerIp = req.ip || req.connection.remoteAddress;

    await db.insert(profileViews).values({
      providerId,
      viewerIp,
      source,
    });

    res.json({ message: 'View tracked successfully' });
  } catch (error) {
    console.error('Track view error:', error);
    res.status(500).json({ error: 'Failed to track view' });
  }
});

export default router;