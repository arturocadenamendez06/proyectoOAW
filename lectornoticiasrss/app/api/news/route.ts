import { NextResponse } from 'next/server';
import NewsService from '@/src/lib/newsService';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;

    const orderByParam = searchParams.get('orderBy');
    const orderBy = orderByParam === 'asc' || orderByParam === 'desc' ? orderByParam : undefined;


    const news = await NewsService.getAllNews({ category, orderBy, search });
    return new NextResponse(JSON.stringify(news), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=180, stale-while-revalidate=190',
      },
    });
  } catch (error) {
    console.error('Error en la API de noticias:', error);
    return NextResponse.json({ error: 'Error al obtener noticias' }, { status: 500 });
  }
}
