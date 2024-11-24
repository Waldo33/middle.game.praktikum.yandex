import { useState, useEffect, useCallback } from 'react'

interface UseNotificationsResult {
  isSupported: boolean
  permission: NotificationPermission
  requestPermission: () => Promise<NotificationPermission>
  showNotification: (title: string, options?: NotificationOptions) => void
}

export const useNotifications = (): UseNotificationsResult => {
  const [permission, setPermission] =
    useState<NotificationPermission>('default')
  const [isSupported, setIsSupported] = useState<boolean>(false)

  useEffect(() => {
    const supported = 'Notification' in window
    setIsSupported(supported)
    if (supported) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission =
    useCallback(async (): Promise<NotificationPermission> => {
      if (!isSupported) {
        return 'denied'
      }

      try {
        const result = await Notification.requestPermission()
        setPermission(result)
        return result
      } catch (error) {
        console.error(
          'Ошибка запроса разрешения на отправку уведомлений:',
          error
        )
        return 'denied'
      }
    }, [isSupported])

  const showNotification = useCallback(
    (title: string, options?: NotificationOptions): void => {
      if (!isSupported || permission !== 'granted') {
        console.warn(
          'Уведомление не отображено: разрешение не предоставлено или не поддерживается.'
        )
        return
      }

      try {
        new Notification(title, options)
      } catch (error) {
        console.error('Ошибка отображения уведомления:', error)
      }
    },
    [isSupported, permission]
  )

  return {
    isSupported,
    permission,
    requestPermission,
    showNotification,
  }
}
