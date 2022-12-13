export const slugify = (string: string): string =>
  string
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
    .replaceAll('&-', '')
    .toLowerCase()
