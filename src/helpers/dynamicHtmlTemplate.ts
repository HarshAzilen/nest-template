import * as fs from 'fs';
import * as handlebars from 'handlebars';

export async function generateDynamicHtml(path: string, data: any): Promise<string> {
  try {
    const htmlTemplate = await fs.promises.readFile(path, 'utf8');

    const template = handlebars.compile(htmlTemplate);
    return template(data);
  } catch (error) {
    console.error('Error generating dynamic HTML:', error);
    throw new Error(error.message);
  }
}
