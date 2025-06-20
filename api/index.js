import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// Initialize Supabase client using environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// JWT secret from Supabase project settings
const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  // Check for Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  // Extract and verify JWT token
  const token = authHeader.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Destructure workout data from request
  const { user_name, date, exercise, sets, reps, notes } = req.body;

  // Basic validation
  if (!user_name || !date || !exercise) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Insert into Supabase
  const { error } = await supabase.from('workouts').insert([
    { user_name, date, exercise, sets, reps, notes }
  ]);

  // Error handling
  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ message: 'Failed to log workout' });
  }

  // Success response
  return res.status(200).json({ message: 'Workout logged successfully' });
}
