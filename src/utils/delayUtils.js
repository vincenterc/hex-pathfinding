export const delay = second =>
  new Promise(resolve => setTimeout(resolve, 1000 * second))
