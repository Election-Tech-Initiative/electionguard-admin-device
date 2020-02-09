export default function distinct<T>(
  array: T[],
  byKeySelector: (key: T) => string | number
): T[] {
  const distinctElements: T[] = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0, { length } = array; i < length; i++) {
    const existingElement = distinctElements.find(
      o => byKeySelector(o) === byKeySelector(array[i])
    )
    if (existingElement !== undefined) {
      const existingIndex = distinctElements.indexOf(existingElement)
      distinctElements[existingIndex] = array[i]
    } else {
      distinctElements.push(array[i])
    }
  }

  return distinctElements
}
