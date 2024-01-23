// generateHtml.ts
import * as fs from 'fs';
import * as handlebars from 'handlebars';

export function generateHtml(
  templatePath: string,
  data: Record<string, any>,
): string {
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(templateContent);
  return compiledTemplate(data);
}
