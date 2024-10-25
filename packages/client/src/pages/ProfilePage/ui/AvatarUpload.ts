import { useRef } from 'react'
import { useToast } from '@shared/hooks/use-toast'
import { changeAvatar } from '@widgets/avatar/avatarApi'

export const useAvatarUpload = () => {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement | null>(null),
    inputFileRef = useRef<HTMLInputElement | null>(null)

  const handleAvatarChange = async () => {
    const form = formRef.current,
      inputFile = inputFileRef.current

    if (!inputFile?.files?.length || !form) return

    const formData = new FormData(form)
    formData.append('avatar', inputFile.value)

    try {
      const result = await changeAvatar(formData)
      if (result) {
        toast({
          description: 'Аватар успешно изменён',
        })
      }
    } catch (e) {
      toast({
        description: 'Произошла ошибка при смене аватара',
        variant: 'destructive',
      })
    }
  }

  return { formRef, inputFileRef, handleAvatarChange }
}
