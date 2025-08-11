import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/lib/auth'

const protectedRoutes = ['/']

export default async function middleware(request: NextRequest) {
  const session = await auth()

  const { pathname } = request.nextUrl

  console.log(pathname)

  const isProtected = protectedRoutes.some((route) => route === pathname)

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next() // not needed
}
