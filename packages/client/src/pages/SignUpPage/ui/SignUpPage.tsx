import SignupForm from '@processes/auth/ui/SignupForm'
import { FC } from 'react'

export const SignUpPage: FC = () => {
  return (
    <div className="w-1/3 space-y-6">
      <h1 className="text-center">Registration</h1>
      <SignupForm />
    </div>
  )
}
