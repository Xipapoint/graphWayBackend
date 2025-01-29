export default function generateRandomTitle(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const index = Math.round(Math.random() * chars.length);
    result += chars[index];
  }
  return result;
}
