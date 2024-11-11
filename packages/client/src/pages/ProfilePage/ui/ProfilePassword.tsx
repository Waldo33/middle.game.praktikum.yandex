import { AppDispatch } from '@app/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { logoutThunk } from '@processes/auth/model/thunks'
import { FormFieldWrapper } from '@processes/auth/ui/FormFieldWrapper'
import { changePassword } from '@processes/profile/api/profileApi'
import { Button } from '@shared/components/ui/button'
import { Form } from '@shared/components/ui/form'
import { validationRules } from '@shared/config/validationRules'
import { useToast } from '@shared/hooks/use-toast'
import { selectAuthLoading } from '@shared/model/selectors'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'

import s from './ProfilePage.module.scss'

export const ProfilePassword: FC = () => {
  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()
  const loading = useSelector(selectAuthLoading)
  const formSchema = z.object({
    oldPassword: validationRules.password,
    newPassword: validationRules.password,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const resultAction = await changePassword(values)
    if (resultAction) {
      toast({
        description: 'Успешно',
      })
    }
  }

  const onLogout = async () => await dispatch(logoutThunk())

  return (
    <div className={s.profile__container}>
      <div className="mt-10">
        <h3>Сменить пароль</h3>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormFieldWrapper
              control={form.control}
              name="oldPassword"
              label="Старый пароль"
            />
            <FormFieldWrapper
              control={form.control}
              name="newPassword"
              label="Новый пароль"
            />
            {loading ? (
              <Button disabled className="w-full" type="submit">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Обработка...
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Отправить
              </Button>
            )}
          </form>
        </Form>
      </div>
      <Button className="mt-10 w-full bg-secondary" onClick={onLogout}>
        Выйти
      </Button>
    </div>
  )
}
