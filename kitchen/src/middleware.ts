import * as Server from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|monitoring).*)'],
};

const subdomainRegex = /^(?:https?:\/\/)?([a-zA-Z0-9\-]+)\./;

export function middleware(request: Server.NextRequest) {
  const host = request.headers.get('host');
  if (!host) return;

  const matches = host && host.match(subdomainRegex);
  if (matches && matches[1]) {
    const updatedPathname = `/${matches[1]}${request.nextUrl.pathname}`;
    request.nextUrl.pathname = updatedPathname;
    const response = Server.NextResponse.rewrite(request.nextUrl);
    return response;
  }

  return;
}
