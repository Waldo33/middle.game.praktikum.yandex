import { getOAuthServiceId } from '@processes/auth/api/authApi'
import { Button } from '@shared/components/ui/button'
import { useToast } from '@shared/hooks/use-toast'
import { getCurrentHostWithPort } from '@shared/lib/getCurrentHostWithPort'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

const OAUTH_URL = 'https://oauth.yandex.ru/authorize'

export const OAuthYandexButton = () => {
  const [isLoading, setLoading] = useState(false)
  const { toast } = useToast()

  const onSubmitOAuth = async () => {
    setLoading(true)
    const redirectUrl = getCurrentHostWithPort()
    const serviceId = await getOAuthServiceId(redirectUrl)

    setLoading(false)

    if (!serviceId) {
      toast({
        description:
          'При авторизации через Яндекс произошла ошибка, попробуйте снова или используйте обычную авторизацию.',
        variant: 'destructive',
      })
      return
    }

    if (serviceId) {
      const OAuthUrl = new URL(OAUTH_URL)
      OAuthUrl.searchParams.set('response_type', 'code')
      OAuthUrl.searchParams.set('client_id', serviceId)
      OAuthUrl.searchParams.set('redirect_uri', redirectUrl)
      location.href = OAuthUrl.toString()
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={onSubmitOAuth}
      className="w-full"
      disabled={isLoading}
      type="button">
      {isLoading && (
        <>
          <Loader2 className="animate-spin" />
          Загрузка
        </>
      )}
      {!isLoading && 'Войти через Яндекс'}
    </Button>
  )
}
