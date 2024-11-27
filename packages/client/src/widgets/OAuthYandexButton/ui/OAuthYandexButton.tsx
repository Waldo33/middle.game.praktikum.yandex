import { getOAuthServiceId } from '@processes/auth/api/authApi'
import { Button } from '@shared/components/ui/button'
import { getCurrentHostWithPort } from '@shared/lib/getCurrentHostWithPort'

const OAUTH_URL = 'https://oauth.yandex.ru/authorize'

export const OAuthYandexButton = () => {
  const onSubmitOAuth = async () => {
    try {
      const redirectUrl = getCurrentHostWithPort()
      const serviceId = await getOAuthServiceId(redirectUrl)

      if (serviceId) {
        const OAuthUrl = new URL(OAUTH_URL)
        OAuthUrl.searchParams.set('response_type', 'code')
        OAuthUrl.searchParams.set('client_id', serviceId)
        OAuthUrl.searchParams.set('redirect_uri', redirectUrl)
        location.href = OAuthUrl.toString()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={onSubmitOAuth}
      className="w-full"
      type="button">
      Войти через Яндекс
    </Button>
  )
}
