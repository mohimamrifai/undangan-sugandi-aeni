import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

const JUMLAH_VALUES = new Set(['1 orang', '2 orang', '3 orang', '4 orang', 'Lebih dari 4']);
const KEHADIRAN_VALUES = new Set(['Hadir', 'Berhalangan hadir']);
const MAX_NAME = 80;
const MAX_MESSAGE = 500;

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: 'Data RSVP tidak valid' }, { status: 400 });
    }

    const nama = typeof body.nama === 'string' ? body.nama.replace(/\s+/g, ' ').trim() : '';
    const jumlah = typeof body.jumlah === 'string' ? body.jumlah.trim() : '';
    const kehadiran = typeof body.kehadiran === 'string' ? body.kehadiran.trim() : '';
    const ucapan = typeof body.ucapan === 'string' ? body.ucapan.trim() : '';

    if (!nama || !jumlah || !kehadiran) {
      return NextResponse.json(
        { error: 'Nama, jumlah tamu, dan kehadiran wajib diisi' },
        { status: 400 },
      );
    }

    if (nama.length < 2 || nama.length > MAX_NAME) {
      return NextResponse.json(
        { error: `Nama harus 2 sampai ${MAX_NAME} karakter` },
        { status: 400 },
      );
    }

    if (!JUMLAH_VALUES.has(jumlah)) {
      return NextResponse.json({ error: 'Jumlah tamu tidak valid' }, { status: 400 });
    }

    if (!KEHADIRAN_VALUES.has(kehadiran)) {
      return NextResponse.json({ error: 'Pilihan kehadiran tidak valid' }, { status: 400 });
    }

    if (ucapan.length > MAX_MESSAGE) {
      return NextResponse.json(
        { error: `Ucapan maksimal ${MAX_MESSAGE} karakter` },
        { status: 400 },
      );
    }

    const rows = (await sql`
      INSERT INTO rsvp (nama, jumlah, kehadiran, ucapan)
      VALUES (${nama}, ${jumlah}, ${kehadiran}, ${ucapan})
      RETURNING id
    `) as { id: number }[];

    return NextResponse.json({ ok: true, id: rows[0]?.id }, { status: 201 });
  } catch (err) {
    console.error('RSVP error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menyimpan RSVP' },
      { status: 500 },
    );
  }
}
