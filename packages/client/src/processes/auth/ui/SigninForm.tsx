import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { signinThunk } from '../model/thunks'
import { selectAuthLoading } from '../model/selectors'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@shared/components/ui/button'
import { Form } from '@shared/components/ui/form'

import { validationRules } from '@shared/config/validationRules'

import { AppDispatch } from '@app/store'
import { ROUTES } from '@shared/config/routes'
import { useToast } from '@shared/hooks/use-toast'
import { FormFieldWrapper } from './FormFieldWrapper'

const formSchema = z.object({
  login: validationRules.login,
  password: validationRules.password,
})

const SigninForm: FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  const loading = useSelector(selectAuthLoading)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const resultAction = await dispatch(signinThunk(values))

    if (resultAction.payload === true) {
      navigate(ROUTES.GAME)
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
        <FormFieldWrapper control={form.control} name="login" label="Login" />
        <FormFieldWrapper
          control={form.control}
          name="password"
          label="Password"
        />
        <Button className="w-full" type="submit">
          {loading ? 'Logging in...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

export default SigninForm
