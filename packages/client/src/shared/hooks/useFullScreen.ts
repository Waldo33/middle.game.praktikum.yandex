import { useRef } from 'react'

interface Document {
  fullscreenElement: Element
  mozFullScreenElement: Element
  webkitFullscreenElement: Element
  msFullscreenElement: Element
  requestFullscreen: () => void
  mozRequestFullScreen: () => void
  webkitRequestFullscreen: (ALLOW_KEYBOARD_INPUT: unknown) => void
  msRequestFullscreen: () => void
  exitFullscreen: () => void
  mozCancelFullScreen: () => void
  msExitFullscreen: () => void
  webkitExitFullscreen: () => void
}

export const useFullScreen = () => {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null),
    container = canvasContainerRef.current

  const showFullScreen = () => {
    if (
      container &&
      !document.fullscreenElement &&
      !(document as unknown as Document).mozFullScreenElement &&
      !(document as unknown as Document).webkitFullscreenElement &&
      !(document as unknown as Document).msFullscreenElement
    ) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      } else if ((container as unknown as Document).msRequestFullscreen) {
        ;(container as unknown as Document).msRequestFullscreen()
      } else if ((container as unknown as Document).mozRequestFullScreen) {
        ;(container as unknown as Document).mozRequestFullScreen()
      } else if ((container as unknown as Document).webkitRequestFullscreen) {
        ;(container as unknown as Document).webkitRequestFullscreen(
          (Element as any).ALLOW_KEYBOARD_INPUT
        )
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as unknown as Document).msExitFullscreen) {
      ;(document as unknown as Document).msExitFullscreen()
    } else if ((document as unknown as Document).mozCancelFullScreen) {
      ;(document as unknown as Document).mozCancelFullScreen()
    } else if ((document as unknown as Document).webkitExitFullscreen) {
      ;(document as unknown as Document).webkitExitFullscreen()
    }
  }

  return { canvasContainerRef, showFullScreen }
}
