export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { user_name, date, exercise, sets, reps, notes } = req.body;

  if (!user_name || !date || !exercise) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Simulate saving to Supabase (replace with real API call)
  console.log("Saving to Supabase:", { user_name, date, exercise, sets, reps, notes });

  return res.status(200).json({ message: 'Workout logged successfully' });
}
