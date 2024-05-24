export function dateConversion(date: string) {
  const dateParts = date.split('-');

  if (dateParts.length !== 3) {
    throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
  }
  const [year, month, day] = dateParts;

  return `${day}-${month}-${year}`;
}
