export const getFormattedDate = (date: Date): string => {
  return date.toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
