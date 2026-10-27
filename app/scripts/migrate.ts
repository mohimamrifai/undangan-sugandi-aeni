import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config({ path: '.env.local' });

if (!process.env.POSTGRES_URL) {
  console.error('POSTGRES_URL belum diatur di .env.local');
  process.exit(1);
}

const sql = neon(process.env.POSTGRES_URL);

async function columnExists(table: string, column: string): Promise<boolean> {
  const rows = (await sql`
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = ${table} AND column_name = ${column}
  `) as unknown[];
  return rows.length > 0;
}

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS rsvp (
      id SERIAL PRIMARY KEY,
      nama TEXT NOT NULL,
      jumlah TEXT,
      kehadiran TEXT,
      ucapan TEXT,
      dibuat_pada TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ucapan (
      id SERIAL PRIMARY KEY,
      nama_ketik TEXT NOT NULL,
      pesan TEXT NOT NULL,
      disetujui BOOLEAN NOT NULL DEFAULT FALSE,
      dibuat_pada TIMESTAMP DEFAULT NOW(),
      disetujui_pada TIMESTAMP
    )
  `;

  // Email hanya dipakai oleh alur login lama. Ucapan sekarang tanpa login dan tanpa email.
  if (await columnExists('ucapan', 'email')) {
    await sql`ALTER TABLE ucapan DROP COLUMN email`;
  }

  if (!(await columnExists('ucapan', 'disetujui'))) {
    await sql`ALTER TABLE ucapan ADD COLUMN disetujui BOOLEAN NOT NULL DEFAULT FALSE`;
  }

  if (!(await columnExists('ucapan', 'disetujui_pada'))) {
    await sql`ALTER TABLE ucapan ADD COLUMN disetujui_pada TIMESTAMP`;
  }

  await sql`
    CREATE INDEX IF NOT EXISTS ucapan_disetujui_idx
    ON ucapan (disetujui, dibuat_pada DESC)
  `;

  console.log('Migrasi selesai.');
}

migrate().catch((err: unknown) => {
  console.error('Migrasi gagal:', err);
  process.exit(1);
});
