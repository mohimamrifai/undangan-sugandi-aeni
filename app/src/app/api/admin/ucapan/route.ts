import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const NO_STORE = { 'Cache-Control': 'no-store' };

type UcapanAdminRow = {
  id: number;
  nama_ketik: string;
  pesan: string;
  dibuat_pada: string;
  disetujui: boolean;
  disetujui_pada: string | null;
};

type Counts = {
  total: number;
  approved: number;
  pending: number;
};

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(cookies().get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: 'Silakan masuk sebagai admin' }, { status: 401, headers: NO_STORE });
  }

  const status = req.nextUrl.searchParams.get('status');

  try {
    const rowsQuery =
      status === 'approved'
        ? sql`
            SELECT id, nama_ketik, pesan, dibuat_pada, disetujui, disetujui_pada
            FROM ucapan
            WHERE disetujui = TRUE
            ORDER BY dibuat_pada DESC, id DESC
            LIMIT 200
          `
        : status === 'all'
          ? sql`
              SELECT id, nama_ketik, pesan, dibuat_pada, disetujui, disetujui_pada
              FROM ucapan
              ORDER BY dibuat_pada DESC, id DESC
              LIMIT 200
            `
          : sql`
              SELECT id, nama_ketik, pesan, dibuat_pada, disetujui, disetujui_pada
              FROM ucapan
              WHERE disetujui = FALSE
              ORDER BY dibuat_pada DESC, id DESC
              LIMIT 200
            `;

    const [rows, countRows] = (await sql.transaction([
      rowsQuery,
      sql`
        SELECT
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE disetujui)::int AS approved,
          COUNT(*) FILTER (WHERE NOT disetujui)::int AS pending
        FROM ucapan
      `,
    ])) as [UcapanAdminRow[], Counts[]];

    const counts = countRows[0] ?? { total: 0, approved: 0, pending: 0 };

    return NextResponse.json({ data: rows, counts }, { headers: NO_STORE });
  } catch (err) {
    console.error('Admin ucapan GET error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil ucapan' },
      { status: 500, headers: NO_STORE },
    );
  }
}
