import { NextResponse } from 'next/server';
import db from '@/src/lib/db';

export async function GET() {
  try {
    const result = await db.query('SELECT NOW()');
    return NextResponse.json({ currentTime: result.rows[0].now });
  } catch (error) {
    console.error('Error fetching current time:', error);
    return NextResponse.json({ error: 'Error fetching current time' }, { status: 500 });
  }
}
