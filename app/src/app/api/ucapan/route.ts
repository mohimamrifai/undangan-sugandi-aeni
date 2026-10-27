import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MAX_NAME = 60;
const MAX_MESSAGE = 500;
const NO_STORE = { 'Cache-Control': 'no-store' };

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, nama_ketik, pesan, dibuat_pada
      FROM ucapan
      WHERE disetujui = TRUE
      ORDER BY dibuat_pada DESC, id DESC
      LIMIT 50
    `;

    return NextResponse.json({ data: rows }, { headers: NO_STORE });
  } catch (err) {
    console.error('Ucapan GET error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil ucapan' },
      { status: 500, headers: NO_STORE },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: 'Data ucapan tidak valid' }, { status: 400 });
    }

    const nama =
      typeof body.nama_ketik === 'string'
        ? body.nama_ketik.replace(/\s+/g, ' ').trim()
        : '';
    const pesan = typeof body.pesan === 'string' ? body.pesan.trim() : '';

    if (nama.length < 2 || nama.length > MAX_NAME) {
      return NextResponse.json(
        { error: `Nama tampilan harus 2 sampai ${MAX_NAME} karakter` },
        { status: 400 },
      );
    }

    if (pesan.length < 1 || pesan.length > MAX_MESSAGE) {
      return NextResponse.json(
        { error: `Ucapan harus 1 sampai ${MAX_MESSAGE} karakter` },
        { status: 400 },
      );
    }

    const rows = (await sql`
      INSERT INTO ucapan (nama_ketik, pesan, disetujui)
      VALUES (${nama}, ${pesan}, FALSE)
      RETURNING id
    `) as { id: number }[];

    return NextResponse.json(
      { ok: true, id: rows[0]?.id },
      { status: 201, headers: NO_STORE },
    );
  } catch (err) {
    console.error('Ucapan POST error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menyimpan ucapan' },
      { status: 500 },
    );
  }
}
