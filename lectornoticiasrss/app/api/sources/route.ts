import { NextResponse } from 'next/server';
import NewsService from '@/src/lib/newsService';

export async function GET() {
  try {
    const sources = await NewsService.getAllSources();
    return new NextResponse(JSON.stringify(sources), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error al obtener las fuentes:', error);
    return NextResponse.json({ error: 'Error al obtener las fuentes' }, { status: 500 });
  }
}