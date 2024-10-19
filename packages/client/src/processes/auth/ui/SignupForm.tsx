import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupThunk, userThunk } from '../model/thunks'
import { selectAuthLoading } from '../model/selectors'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@shared/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@shared/components/ui/form'
import { Input } from '@shared/components/ui/input'
import { validationRules } from '@shared/config/validationRules'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../hooks/use-toast'
import { AppDispatch } from '@app/store'
import { ROUTES } from '@shared/config/routes'

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
      dispatch(userThunk())
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
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input {...field} className="haha" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="second_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {loading ? 'Logging in...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

export default SignupForm
