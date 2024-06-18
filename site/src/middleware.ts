import * as Server from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|monitoring).*)'],
};

const subdomainRegex = /^(?:https?:\/\/)?([a-zA-Z0-9\-]+)\./;

/*
This maps from URL to Sanity site slug.

For example 'www.bersumac.com' will map to 'bersumar' slug.
*/
const DomainsToSanitySlugs: Record<string, string> = {
  'bersumac.com': 'bersumac',
  'www.bersumac.com': 'bersumac',
  'citrusandroots.com': 'citrusandroots',
  'chungeats.com': 'chungeats',
  'www.chungeats.com': 'chungeats',
  'jerumai.com': 'jerumai',
  'www.jerumai.com': 'jerumai',
};

export function middleware(request: Server.NextRequest) {
  const host = request.headers.get('host');
  if (!host) return;

  if (DomainsToSanitySlugs[host]) {
    const slug = DomainsToSanitySlugs[host];
    const updatedPathname = `/${slug}${request.nextUrl.pathname}`;
    request.nextUrl.pathname = updatedPathname;
    const response = Server.NextResponse.rewrite(request.nextUrl);
    return response;
  }

  const matches = host && host.match(subdomainRegex);
  if (matches && matches[1]) {
    const updatedPathname = `/${matches[1]}${request.nextUrl.pathname}`;
    request.nextUrl.pathname = updatedPathname;
    const response = Server.NextResponse.rewrite(request.nextUrl);
    return response;
  }

  return;
}
