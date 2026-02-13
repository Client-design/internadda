import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Initial response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Verify environment variables exist to prevent 500 error
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables")
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refresh session if expired - Important for Gatekeeper
  const { data: { session } } = await supabase.auth.getSession()

  // Guard: Only apply to /test routes
  if (request.nextUrl.pathname.startsWith('/test')) {
    if (!session) {
      // Redirect to signin if no session found
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/signin'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: ['/test/:path*'],
}
