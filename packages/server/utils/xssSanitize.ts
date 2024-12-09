import xss from 'xss'

export const xssSanitize = <T>(input: T): T => {
  if (typeof input === 'string') {
    return xss(input) as T
  }

  if (Array.isArray(input)) {
    return input.map(item => xssSanitize(item)) as T
  }

  if (typeof input === 'object' && input !== null) {
    const sanitizedObject: Record<string, unknown> = {}
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitizedObject[key] = xssSanitize(input[key])
      }
    }
    return sanitizedObject as T
  }

  return input
}
