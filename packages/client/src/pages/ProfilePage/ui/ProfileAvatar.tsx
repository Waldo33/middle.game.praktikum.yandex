import { FC } from 'react'
import s from './ProfilePage.module.scss'
import { Camera } from 'lucide-react'
import { useSelector } from 'react-redux'
import { AvatarWidget } from '@widgets/avatar/avatar'
import { selectUser } from '@processes/auth/model/selectors'
import { useAvatarUpload } from './AvatarUpload'

export const ProfileAvatar: FC = () => {
  const upload = useAvatarUpload()
  const user = useSelector(selectUser)
  if (!user) return null
  const login = user.login,
    avatar = user.avatar

  return (
    <form ref={upload.formRef}>
      <label className={s.profile__file}>
        <AvatarWidget login={login} avatar={avatar} />
        <div className={s.profile__file_hover}>
          <Camera color="white" size={48} />
        </div>
        <input
          ref={upload.inputFileRef}
          onChange={upload.handleAvatarChange}
          type="file"
          name="avatar"
        />
      </label>
    </form>
  )
}
