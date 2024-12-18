export const parseCookieString = (cookies: string) => {
  return cookies
    .split(';')
    .map(cookie => cookie.trim())
    .reduce((acc, cookie) => {
      const [name, value] = cookie.split('=')
      acc[name] = value
      return acc
    }, {} as Record<string, string>)
}

export const getCookies = (cookie: string) => {
  const { uuid, authCookie } = parseCookieString(cookie || '')

  const haveRequestCookies = uuid && authCookie

  if (process.env.NODE_ENV === 'development' && !haveRequestCookies) {
    return {
      uuid: process.env.YANDEX_UUID,
      authCookie: process.env.YANDEX_AUTH_COOKIE,
    }
  }

  return { uuid, authCookie }
}
