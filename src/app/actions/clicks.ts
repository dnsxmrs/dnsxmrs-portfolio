'use server';

import { redis } from '@/lib/redis';
import { pusherServer } from '@/lib/pusher';

const REDIS_KEY = 'portfolio_clicks';
const PUSHER_CHANNEL = 'global-clicks';
const PUSHER_EVENT = 'click-update';

/**
 * Atomically increments the global click counter in Redis,
 * then broadcasts the new count to all connected clients via Pusher.
 */
export async function incrementClick() {
  // Atomic increment — no race conditions
  const newCount = await redis.incr(REDIS_KEY);

  // Broadcast to every connected client
  await pusherServer.trigger(PUSHER_CHANNEL, PUSHER_EVENT, {
    count: newCount,
  });

  return newCount;
}

/**
 * Atomically increments the global click counter by `amount`.
 * Used for batched rapid clicks — the client accumulates clicks
 * and flushes them in one call to avoid flooding the server.
 */
export async function incrementClickBy(amount: number) {
  if (amount <= 0) return 0;

  // Atomic increment by N — no race conditions
  const newCount = await redis.incrby(REDIS_KEY, amount);

  // Broadcast the final count to every connected client
  await pusherServer.trigger(PUSHER_CHANNEL, PUSHER_EVENT, {
    count: newCount,
  });

  return newCount;
}

/**
 * Reads the current global click count from Redis.
 * Used for initial hydration on component mount.
 */
export async function getClickCount(): Promise<number> {
  const count = await redis.get<number>(REDIS_KEY);
  return count ?? 0;
}
