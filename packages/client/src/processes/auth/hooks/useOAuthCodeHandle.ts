import { useSearchParams } from 'react-router-dom'
import { signinWithOauthToken } from '../api/authApi'
import { getCurrentHostWithPort } from '@shared/lib/getCurrentHostWithPort'
import { useEffect } from 'react'
import { userThunk } from '../model/thunks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@app/store'
import { useAuth } from '@shared/hooks/useAuth'
import { useToast } from '@shared/hooks/use-toast'

export const useOAuthCodeHandle = () => {
  const dispatch: AppDispatch = useDispatch()
  const [params, setParams] = useSearchParams()
  const { toast } = useToast()
  const isAuth = useAuth()

  useEffect(() => {
    const handleOAuthCode = async (code: string) => {
      const success = await signinWithOauthToken(code, getCurrentHostWithPort())
      if (!success) {
        toast({
          description:
            'При авторизации через Яндекс произошла ошибка, попробуйте снова или используйте обычную авторизацию.',
          variant: 'destructive',
        })
        return
      }
      dispatch(userThunk())
      setParams('')
    }

    const oAuthCode = params.get('code')
    if (oAuthCode && !isAuth) {
      handleOAuthCode(oAuthCode)
    }
  }, [params])
}
