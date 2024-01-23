export function generateFrontendUrl(path: string): string {
  return `${process.env.URL_FRONTEND}/${path}`;
}
