import { AppDispatch } from '@app/store'
import { logoutThunk } from '@processes/auth/model/thunks'
import { Button } from '@shared/components/ui/button'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const GamePage: FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = async () => {
    const resultAction = await dispatch(logoutThunk())

    if (resultAction.payload === true) {
      navigate('/signin')
    }
  }

  return (
    <div>
      <Button onClick={handleClick}>Logout</Button>
    </div>
  )
}
