type Dictionary<T> = Partial<Record<keyof T, string>>

type ResultItem<T> = {
  value: T[keyof T]
  label: string
  key: keyof T
}

export function matchDictionaryAndData<T>(
  dictionary: Dictionary<T>,
  data: T
): ResultItem<T>[] {
  return (Object.keys(dictionary) as Array<keyof T>).map(key => ({
    value: data[key],
    label: dictionary[key] as string,
    key,
  }))
}
