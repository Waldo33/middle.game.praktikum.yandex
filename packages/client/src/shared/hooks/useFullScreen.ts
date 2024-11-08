import { useRef, useCallback, useState, useEffect } from 'react'

interface UseFullScreenResult {
  canvasContainerRef: React.RefObject<HTMLDivElement>
  showFullScreen: () => Promise<void>
  isFullScreen: boolean
}

export const useFullScreen = (): UseFullScreenResult => {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)

  const showFullScreen = useCallback(async (): Promise<void> => {
    const container = canvasContainerRef.current
    if (container) {
      try {
        if (!document.fullscreenElement) {
          await container.requestFullscreen()
          setIsFullScreen(true)
        } else if (document.exitFullscreen) {
          await document.exitFullscreen()
          setIsFullScreen(false)
        }
      } catch (error) {
        console.error('Ошибка в работе полноэкранного режима: ', error)
      }
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return { canvasContainerRef, showFullScreen, isFullScreen }
}
