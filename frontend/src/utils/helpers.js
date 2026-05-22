export const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const calculateReadingTime = (content) => {
  if (!content) return 1;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const slugify = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
};
