import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupThunk } from '../model/thunks'
import { selectAuthLoading } from '@shared/model/selectors'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@shared/components/ui/button'
import { Form } from '@shared/components/ui/form'
import { validationRules } from '@shared/config/validationRules'
import { useNavigate } from 'react-router-dom'

import { AppDispatch } from '@app/store'
import { ROUTES } from '@shared/config/routes'
import { useToast } from '@shared/hooks/use-toast'
import { FormFieldWrapper } from './FormFieldWrapper'

const formSchema = z.object({
  login: validationRules.login,
  password: validationRules.password,
  first_name: validationRules.first_name,
  second_name: validationRules.second_name,
  email: validationRules.email,
  phone: validationRules.phone,
})

const SignupForm: FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  const loading = useSelector(selectAuthLoading)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
      first_name: '',
      second_name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const resultAction = await dispatch(signupThunk(values))

    if (resultAction.payload === true) {
      sessionStorage.setItem('from', 'signup')
      navigate(ROUTES.INDEX)
    } else {
      toast({
        description: resultAction.payload,
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormFieldWrapper control={form.control} name="login" label="Логин" />
        <FormFieldWrapper
          control={form.control}
          name="password"
          label="Пароль"
        />
        <FormFieldWrapper
          control={form.control}
          name="first_name"
          label="Имя"
        />
        <FormFieldWrapper
          control={form.control}
          name="second_name"
          label="Фамилия"
        />
        <FormFieldWrapper
          control={form.control}
          name="email"
          label="Электронная почта"
        />
        <FormFieldWrapper
          control={form.control}
          name="phone"
          label="Номер телефона"
        />
        <Button className="w-full" type="submit">
          {loading ? 'Загрузка...' : 'Войти'}
        </Button>
      </form>
    </Form>
  )
}

export default SignupForm
