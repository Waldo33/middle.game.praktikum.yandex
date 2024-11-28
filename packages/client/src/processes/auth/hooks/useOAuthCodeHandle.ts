import { useSearchParams } from 'react-router-dom'
import { signinWithOauthToken } from '../api/authApi'
import { getCurrentHostWithPort } from '@shared/lib/getCurrentHostWithPort'
import { useEffect } from 'react'
import { userThunk } from '../model/thunks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@app/store'
import { useAuth } from '@shared/hooks/useAuth'

export const useOAuthCodeHandle = () => {
  const dispatch: AppDispatch = useDispatch()
  const [params, setParams] = useSearchParams()
  const isAuth = useAuth()

  useEffect(() => {
    const handleOAuthCode = async (code: string) => {
      await signinWithOauthToken(code, getCurrentHostWithPort())
      dispatch(userThunk())
      setParams('')
    }

    const oAuthCode = params.get('code')
    if (oAuthCode && !isAuth) {
      handleOAuthCode(oAuthCode)
    }
  }, [params])
}
