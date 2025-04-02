import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const endpoint = request.nextUrl.pathname.split('/').pop();
  return NextResponse.json({ error: `API route ${endpoint} is not found` }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const endpoint = request.nextUrl.pathname.split('/').pop();
  return NextResponse.json({ error: `API route ${endpoint} is not found` }, { status: 404 });
}

export async function PUT(request: NextRequest) {
  const endpoint = request.nextUrl.pathname.split('/').pop();
  return NextResponse.json({ error: `API route ${endpoint} is not found` }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  const endpoint = request.nextUrl.pathname.split('/').pop();
  return NextResponse.json({ error: `API route ${endpoint} is not found` }, { status: 404 });
}