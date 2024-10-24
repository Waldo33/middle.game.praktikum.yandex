import { FC } from 'react'
import './ProfilePage.scss'
import { Button } from '@shared/components/ui/button'
import { Form } from '@shared/components/ui/form'
import { changePassword } from '@processes/profile/api/profileApi'
import { z } from 'zod'
import { validationRules } from '@shared/config/validationRules'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormFieldWrapper } from '@processes/auth/ui/FormFieldWrapper'
import { useSelector } from 'react-redux'
import { selectAuthLoading } from '@processes/auth/model/selectors'
import { useToast } from '@shared/hooks/use-toast'

export const ProfilePassword: FC = () => {
  const { toast } = useToast()
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

  return (
    <div className="profile__container">
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
            <Button className="w-full" type="submit">
              {loading ? 'Обработка...' : 'Отправить'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
