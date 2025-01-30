export function generateFrontendUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/api/${path}`;
}
