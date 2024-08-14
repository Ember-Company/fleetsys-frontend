export function getSiteURL(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/';

  return validateURL(url);
}

export function getBackendURL(): string {
  const url = process.env.NEXT_APP_BACKEND_URL ?? 'http://127.0.0.1:8000/api/';

  return validateURL(url);
}

function validateURL(url: string): string {
  let validatedURL: string = url;

  validatedURL = url.includes('http') ? url : `https://${url}`;
  validatedURL = url.endsWith('/') ? url : `${url}/`;

  return validatedURL;
}
