import SigninForm from '@processes/auth/ui/SigninForm'
import { FC } from 'react'

export const SignInPage: FC = () => {
  return (
    <div className="w-1/3 space-y-6">
      <h1 className="text-center">Login</h1>
      <SigninForm />
    </div>
  )
}
