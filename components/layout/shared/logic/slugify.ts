export const slugify = (string: string): string =>
  string
    .replace(/ /g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&-/g, '')
    .toLowerCase()
