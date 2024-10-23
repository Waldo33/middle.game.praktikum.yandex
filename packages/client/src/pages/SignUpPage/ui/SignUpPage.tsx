import SignupForm from '@processes/auth/ui/SignupForm'
import { ROUTES } from '@shared/config/routes'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export const SignUpPage: FC = () => {
  return (
    <div className="md:w-50 m-auto space-y-6">
      <h1 className="text-center">Registration</h1>
      <SignupForm />
      <p className="text-center">
        Already have an account?{' '}
        <Link
          className="underline underline-offset-4 hover:text-primary"
          to={ROUTES.SIGNIN}>
          Sign in
        </Link>
      </p>
    </div>
  )
}
