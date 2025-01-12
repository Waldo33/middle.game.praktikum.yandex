const BASE_THEME_API = 'http://localhost:3001/api/user/theme'

export interface ITheme {
  theme_id: string
}

export const themeSwitch = async (themeData: ITheme) => {
  try {
    const response = await fetch(`${BASE_THEME_API}/${themeData.theme_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(themeData),
      credentials: 'include',
    })
    if (!response.ok) {
      return true
    }
  } catch (err) {
    console.log(err)
    return null
  }
}
