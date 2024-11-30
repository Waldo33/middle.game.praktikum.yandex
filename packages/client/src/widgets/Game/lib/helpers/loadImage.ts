export const loadImage = async (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url

    const onLoad = () => {
      resolve(img)
      img.removeEventListener('load', onLoad) // Cleanup
    }

    img.addEventListener('load', onLoad)

    img.addEventListener('error', () => {
      reject(new Error(`Ошибка загрузки изображения ${url}`))
      img.removeEventListener('load', onLoad) // Cleanup
    })
  })
}
