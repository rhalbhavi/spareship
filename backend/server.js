/**
 * Spareship Backend Server
 *
 * A basic Node.js/Express server configured for Render deployment.
 * Provides health-check and API endpoints for the Spareship marketplace.
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ─── Middleware ───────────────────────────────────────────────────────────────

// Enable CORS - Allow requests from any origin (customize for production)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse JSON request bodies
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────

/**
 * Health Check
 * GET /health
 * Returns service status for Render monitoring and uptime checks.
 */
app.get('/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    // A light query to check DB connection.
    // It tries to get metadata from a table. If the table doesn't exist (42P01),
    // the connection is still considered successful for a basic health check.
    const { error } = await supabase.from('parts_categories').select('*', { head: true, count: 'exact' });

    if (error && error.code !== '42P01') { // 42P01 = undefined_table
      throw error;
    }
    dbStatus = 'connected';
  } catch (error) {
    console.error('Health check DB error:', error.message);
  }
  res.status(200).json({
    status: 'ok',
    service: 'spareship-backend',
    db: dbStatus,
  });
});

/**
 * Sample API: Parts Categories
 * GET /api/parts
 * Returns a JSON list of automotive/EV parts categories.
 */
app.get('/api/parts', (req, res) => {
  const partsCategories = [
    {
      vehicleType: '2-Wheeler',
      categories: [
        { name: 'Engine Parts', subcategories: ['Air Filter', 'Axle', 'Bolt', 'Cam Shaft', 'Carburetor Parts', 'Chain Adjuster', 'Chain Cover', 'Chain Guide', 'Clutch Parts', 'Gear Lever', 'Kick', 'O Ring', 'Rocker Set', 'Sprocket'] },
        { name: 'Braking Systems', subcategories: ['Brake Cam', 'Brake Pedal', 'Brake Rod', 'Brake Shoe', 'Disk Brake Parts'] },
        { name: 'Suspension & Steering', subcategories: ['Centre Stand', 'Footrest', 'Fork', 'Handle Bar Parts', 'Head Dowell Kit', 'Hub Plate', 'Shocker Bush', 'Side Stand', 'Cush Rubber'] },
        { name: 'Electricals & Electronics', subcategories: ['Electrical Parts', 'Fan Assy', 'H.L. Bracket', 'H.L. Doom', 'Indicator Stay', 'Self Start Parts', 'Speedometer Parts'] },
        { name: 'Body & Accessories', subcategories: ['Accessories', 'Centre Mat', 'Clamp', 'Graphics', 'Grip', 'Mudguard', 'Number Plate', 'Seat Parts', 'Silencer Parts', 'Tool Box'] },
        { name: 'Fluids & Consumables', subcategories: ['Petrol Pipe', 'Spring', 'Washer'] },
      ],
    },
    {
      vehicleType: '4-Wheeler',
      categories: [
        { name: 'Engine & Drivetrain', subcategories: ['Air Filter', 'Clutch Parts', 'Gear Parts'] },
        { name: 'Braking Systems', subcategories: ['Brake Pads', 'Brake Discs', 'Brake Caliper'] },
        { name: 'Suspension & Steering', subcategories: ['Shock Absorber', 'Control Arm', 'Tie Rod End'] },
        { name: 'Electricals & Electronics', subcategories: ['Alternator', 'Starter Motor', 'ECU'] },
        { name: 'Body & Lighting', subcategories: ['Headlight', 'Taillight', 'Bumper', 'Fender'] },
        { name: 'Fluids & Consumables', subcategories: ['Engine Oil', 'Coolant', 'Brake Fluid'] },
      ],
    },
    {
      vehicleType: 'EV (Electric Vehicles)',
      categories: [
        { name: 'Powertrain & Motors', subcategories: ['Electric Motor', 'Controller', 'Inverter'] },
        { name: 'Battery & BMS', subcategories: ['Battery Pack', 'BMS', 'Cell Modules'] },
        { name: 'Charging Systems', subcategories: ['On-Board Charger', 'Charging Port'] },
        { name: 'EV Electricals & Controllers', subcategories: ['DC-DC Converter', 'Vehicle Control Unit'] },
        { name: 'Chassis & Brakes', subcategories: ['Regenerative Braking System', 'EV-specific Brake Pads'] },
      ],
    },
  ];

  res.status(200).json({
    success: true,
    count: partsCategories.length,
    data: partsCategories,
  });
});

/**
 * Fallback: 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Server Start ────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`⚡ Spareship Backend Server is running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Parts API:    http://localhost:${PORT}/api/parts`);
});
