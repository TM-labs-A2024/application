export const formatDate = (date: string) => {
  const chunks = date.split('-')

  const newDate = chunks[1] + '-' + chunks[2] + '-' + chunks[0]

  return newDate
}
