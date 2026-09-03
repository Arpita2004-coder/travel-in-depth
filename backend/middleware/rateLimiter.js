// Simple in-memory rate limiter — good enough for now.
// Limits each logged-in user to a max number of AI planner requests per window.
// NOTE: this resets if the server restarts, and won't work across multiple
// server instances — fine for a single-server deployment, revisit if you scale.

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 10;

const requestLog = new Map(); // userId -> [timestamps]

export const plannerRateLimit = (req, res, next) => {
  const userId = req.userId;
  const now = Date.now();

  const timestamps = (requestLog.get(userId) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({
      message: `Too many planner requests. Limit is ${MAX_REQUESTS} per 15 minutes — please wait and try again.`,
    });
  }

  timestamps.push(now);
  requestLog.set(userId, timestamps);
  next();
};