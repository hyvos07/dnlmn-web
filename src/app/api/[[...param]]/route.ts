import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ error: 'API route not found' }, { status: 404 });
}

export async function POST(request: Request) {
  return NextResponse.json({ error: 'API route not found' }, { status: 404 });
}

export async function PUT(request: Request) {
  return NextResponse.json({ error: 'API route not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ error: 'API route not found' }, { status: 404 });
}