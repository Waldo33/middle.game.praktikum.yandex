import SigninForm from '@processes/auth/ui/SigninForm'
import { ROUTES } from '@shared/config/routes'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export const SignInPage: FC = () => {
  return (
    <div className="md:w-50 m-auto space-y-6">
      <h1 className="text-center">Вход</h1>
      <SigninForm />
      <p className="text-center">
        Нет аккаунта?{' '}
        <Link
          to={ROUTES.SIGNUP}
          className="underline underline-offset-4 hover:text-primary">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  )
}
