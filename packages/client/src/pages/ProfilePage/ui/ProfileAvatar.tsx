import { FC } from 'react'
import './ProfilePage.scss'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/ui/avatar'
import { Camera } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectUser } from '@processes/auth/model/selectors'
import { changeAvatar } from '@processes/profile/api/profileApi'
import { useToast } from '@shared/hooks/use-toast'

export const ProfileAvatar: FC = () => {
  const user = useSelector(selectUser),
    login = user?.login,
    avatar = user?.avatar,
    avatarUrl = 'https://ya-praktikum.tech/api/v2/resources' + avatar
  const { toast } = useToast()

  const onChange = async (evt: React.SyntheticEvent) => {
    const target = evt.target as HTMLInputElement,
      form = target.closest('form') as HTMLFormElement,
      formData = new FormData(form),
      avatarValue = target.value

    formData.append('avatar', avatarValue)
    const resultAction = await changeAvatar(formData)
    if (resultAction) {
      toast({
        description: 'Успешно',
      })
    }
  }

  return (
    <form>
      <label className="profile__file">
        <Avatar className="profile__avatar">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="profile__fallback">
            {login?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="profile__file-hover">
          <Camera color="white" size={48} />
        </div>
        <input onChange={onChange} type="file" name="avatar" />
      </label>
    </form>
  )
}
