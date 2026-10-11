import { Pool } from 'pg'

const globalForDb = globalThis as unknown as {
  dbPool: Pool | undefined
}

export const pool =
  globalForDb.dbPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })

if (process.env.NODE_ENV !== 'production') {
  globalForDb.dbPool = pool
}

export async function query(text: string, params?: unknown[]) {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  return { ...res, duration }
}
