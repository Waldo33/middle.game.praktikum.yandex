import React, { FC, useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@shared/config/routes'
import { z } from 'zod'
import { useToast } from '@shared/hooks/use-toast'
import { createTopic } from '@processes/forum/api/forumApi'
import { selectUser } from '@shared/model/selectors'
import { useSelector } from 'react-redux'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/components/ui/form'
import { Input } from '@shared/components/ui/input'
import { Button } from '@shared/components/ui/button'
import { Textarea } from '@shared/components/ui/textarea'
import { validationRules } from '@shared/config/validationRules'

const formSchema = z.object({
  title: validationRules.forum_topic_title,
  content: validationRules.forum_message,
  author: validationRules.login,
  //file: validationRules.forum_file,
})

export const ForumForm: FC = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const user = useSelector(selectUser),
    login = user?.login
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      author: login,
    },
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const resultAction = await createTopic(values)
    if (resultAction) {
      console.log(values)
      toast({
        description: 'Успешно',
      })
      navigate(ROUTES.FORUM)
    }
    /*const file = fileInputRef.current?.files?.[0] // Доступ к файлу через useRef
    console.log({ ...values, file })*/
  }

  useEffect(() => {
    return () => {
      fileInputRef.current = null
    }
  }, [])

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[600px]">
        <FormField
          control={formMethods.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>тема</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>сообщение</FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<FormItem>
          <FormLabel>можно прикрепить файл</FormLabel>
          <FormControl>
            <Input id="file" type="file" ref={fileInputRef} />
          </FormControl>
          <FormMessage />
        </FormItem>*/}
        <div className="flex flex-row gap-4">
          <Button asChild variant="outline">
            <Link to={ROUTES.FORUM}>← назад к форуму</Link>
          </Button>
          <Button type="submit">отправить →</Button>
        </div>
      </form>
    </FormProvider>
  )
}
