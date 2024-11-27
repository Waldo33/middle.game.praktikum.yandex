import { useSearchParams } from 'react-router-dom'
import { signinWithOauthToken } from '../api/authApi'
import { getCurrentHostWithPort } from '@shared/lib/getCurrentHostWithPort'
import { useEffect } from 'react'

export const useOAuthCodeHandle = () => {
  const [params, setParams] = useSearchParams()

  const signin = async (code: string) => {
    await signinWithOauthToken(code, getCurrentHostWithPort())
    setParams('')
  }

  useEffect(() => {
    const oAuthCode = params.get('code')

    if (oAuthCode) {
      signin(oAuthCode)
    }
  }, [params])
}
