const UNKNOWN_ERROR = 'An unknown error occurred'

const isError = (obj: unknown): obj is Error => {
  return obj instanceof Error && typeof obj.message === 'string'
}

export const getErrorMessageOrDefault = (
  err: Error | unknown,
  defaultMessage: string = UNKNOWN_ERROR
): string => {
  if (isError(err)) {
    return err.message
  } else {
    return defaultMessage
  }
}
