export function generateFrontendUrl(path: string): string {
  return `${process.env.BASE_URL}/${path}`;
}
