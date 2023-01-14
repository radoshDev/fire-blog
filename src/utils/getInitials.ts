export const getInitials = (first: string, second: string): string => {
  return `${first[0].toUpperCase()}${second[0].toUpperCase()}`
}
