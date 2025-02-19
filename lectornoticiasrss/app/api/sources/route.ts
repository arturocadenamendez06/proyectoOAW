import { NextResponse } from 'next/server';
import NewsService from '@/src/lib/newsService';

export async function GET() {
  try {
    const sources = await NewsService.getAllSources();
    return NextResponse.json(sources);
  } catch (error) {
    console.error('Error al obtener las fuentes:', error);
    return NextResponse.json({ error: 'Error al obtener las fuentes' }, { status: 500 });
  }
}