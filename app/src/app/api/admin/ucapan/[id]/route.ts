import { NextRequest, NextResponse } from 'next/server';
import {
  getAdminSessionFromRequest,
  isSameOrigin,
} from '@/lib/admin-auth';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!getAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: 'Silakan masuk sebagai admin' }, { status: 401, headers: NO_STORE });
  }

  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Permintaan tidak valid' }, { status: 403, headers: NO_STORE });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: 'Ucapan tidak ditemukan' }, { status: 404, headers: NO_STORE });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Data tidak valid' }, { status: 400, headers: NO_STORE });
  }

  if (typeof body.disetujui !== 'boolean') {
    return NextResponse.json({ error: 'Status persetujuan tidak valid' }, { status: 400, headers: NO_STORE });
  }

  try {
    const rows = (await sql`
      UPDATE ucapan
      SET disetujui = ${body.disetujui},
          disetujui_pada = CASE WHEN ${body.disetujui} THEN NOW() ELSE NULL END
      WHERE id = ${id}
      RETURNING id, disetujui
    `) as { id: number; disetujui: boolean }[];

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Ucapan tidak ditemukan' }, { status: 404, headers: NO_STORE });
    }

    return NextResponse.json({ ok: true, data: rows[0] }, { headers: NO_STORE });
  } catch (err) {
    console.error('Admin ucapan PATCH error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui ucapan' },
      { status: 500, headers: NO_STORE },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!getAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: 'Silakan masuk sebagai admin' }, { status: 401, headers: NO_STORE });
  }

  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Permintaan tidak valid' }, { status: 403, headers: NO_STORE });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: 'Ucapan tidak ditemukan' }, { status: 404, headers: NO_STORE });
  }

  try {
    const rows = (await sql`
      DELETE FROM ucapan
      WHERE id = ${id}
      RETURNING id
    `) as { id: number }[];

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Ucapan tidak ditemukan' }, { status: 404, headers: NO_STORE });
    }

    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (err) {
    console.error('Admin ucapan DELETE error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus ucapan' },
      { status: 500, headers: NO_STORE },
    );
  }
}
