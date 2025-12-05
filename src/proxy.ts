import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from 'next/server';

const publicPaths = [{ path: '/', whenAutenticated: 'redirect' }];
const REDIRECT_WHEN_NOT_AUTHENTICATED = '/';
const REDIRECT_WHEN_AUTHENTICATED = '/dashboard';

export function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isAuthenticated = !!req.cookies.get('access_token');

  const publicRoute = publicPaths.find((p) => p.path === path);

  if (!isAuthenticated && publicRoute) {
    return NextResponse.next();
  }

  if (!isAuthenticated && !publicRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    isAuthenticated &&
    publicRoute &&
    publicRoute.whenAutenticated === 'redirect'
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|bmp|tif|tiff|avif|mp4|webm|mp3|wav|woff|woff2|ttf|otf|eot|json|txt)).*)',
  ],
};
