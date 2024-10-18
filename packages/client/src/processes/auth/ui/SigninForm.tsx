import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signinThunk } from '../model/thunks'
import {
  selectAuthLoading,
  // selectAuthError
} from '../model/selectors'

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

const formSchema = z.object({
  login: validationRules.login,
  password: validationRules.password,
})

const SigninForm: FC = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectAuthLoading)
  // const error = useSelector(selectAuthError)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    dispatch(signinThunk(values))
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
        <Button className="w-full" type="submit">
          {loading ? 'Logging in...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

export default SigninForm
