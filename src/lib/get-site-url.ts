export function getSiteURL(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/api/';

  return url;
}

export function getBackendURL(): string {
  const url = 'http://localhost:8000/';

  // return validateURL(url);
  return url;
}

function validateURL(url: string): string {
  let validatedURL: string = url;

  validatedURL = url.includes('http') ? url : `https://${url}`;
  validatedURL = url.endsWith('/') ? url : `${url}/`;

  return validatedURL;
}
