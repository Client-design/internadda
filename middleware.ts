import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 🔥 Important: getSession not getUser
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user
  const { pathname } = request.nextUrl

  // If logged in and trying to access auth page → redirect home
  if (user && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Protected routes
  const isProtectedPage =
    pathname.startsWith('/test') ||
    pathname.startsWith('/apply')

  if (isProtectedPage && !user) {
    const redirectUrl = new URL('/auth/signin', request.url)
    redirectUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}
