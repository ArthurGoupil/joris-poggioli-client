export const slugify = (string: string): string =>
  string
    .replace(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
