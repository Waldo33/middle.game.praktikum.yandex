import { useSearchParams } from 'react-router-dom'
import { signinWithOauthToken } from '../api/authApi'
import { getCurrentHostWithPort } from '@shared/lib/getCurrentHostWithPort'
import { useEffect } from 'react'
import { userThunk } from '../model/thunks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@app/store'

export const useOAuthCodeHandle = () => {
  const dispatch: AppDispatch = useDispatch()
  const [params, setParams] = useSearchParams()

  const signin = async (code: string) => {
    await signinWithOauthToken(code, getCurrentHostWithPort())
    dispatch(userThunk())
    setParams('')
  }

  useEffect(() => {
    const oAuthCode = params.get('code')

    if (oAuthCode) {
      signin(oAuthCode)
    }
  }, [params])
}
