# Vercel Middleware – Log Workout API

This serverless function allows logging a workout via POST request.

## Example Endpoint

POST /api/log-workout

## Example Body

```json
{
  "user_name": "Alexander",
  "date": "2025-06-19",
  "exercise": "BOSU Pushups",
  "sets": 4,
  "reps": 10,
  "notes": "Side-to-side shifts"
}
```
