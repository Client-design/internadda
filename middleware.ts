import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Session check ko handle karne ke liye safe method
  const { data: { session } } = await supabase.auth.getSession()

  // --- LOGIC START ---
  
  if (pathname.startsWith('/test')) {
    // Agar user logged in hai, toh aage badhne do
    if (session) {
      return response
    }

    // FIX: Agar user just payment karke aaya hai (URL params check)
    // Agar aapke payment success URL mein koi unique identifier hai toh yahan bypass de sakte hain
    const isReturningFromPayment = searchParams.get('status') === 'success'
    
    if (isReturningFromPayment) {
        return response // Bypass login if just paid
    }

    // Default: Redirect to signin
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('returnTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: ['/test/:path*'],
}
