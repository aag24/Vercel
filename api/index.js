import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { user_name, date, exercise, sets, reps, notes } = req.body;

  if (!user_name || !date || !exercise) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const { error } = await supabase.from('workouts').insert([
    { user_name, date, exercise, sets, reps, notes }
  ]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ message: 'Failed to log workout' });
  }

  return res.status(200).json({ message: 'Workout logged successfully' });
}
