import { NextResponse } from 'next/server' 
import type { NextRequest } from 'next/server' 
import { getToken } from 'next-auth/jwt' 
 
export async function middleware(req: NextRequest) { 
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) 
  const { pathname } = req.nextUrl 
 
  // ต้องล็อกอินจึงเข้า /dashboard ได้ 
  if (pathname.startsWith('/dashboard') && !token) { 
    return NextResponse.redirect(new URL('/login', req.url)) 
  } 
 
  // ต้องเป็น admin จึงเข้า /admin ได้ 
  if (pathname.startsWith('/admin')) { 
    if (!token) return NextResponse.redirect(new URL('/login', req.url)) 
    if (token.role !== 'admin') return NextResponse.redirect(new URL('/unauthorized', req.url)) 
  } 
 
  return NextResponse.next() 
} 
 
export const config = { 
  matcher: ['/dashboard/:path*', '/admin/:path*'], 
}