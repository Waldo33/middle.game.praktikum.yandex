import React, { FC, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/config/routes'
import { z } from 'zod'

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
  message: validationRules.forum_message,
  file: validationRules.forum_file,
})

export const ForumForm: FC = () => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      message: '',
    },
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function onSubmit(values: z.infer<typeof formSchema>) {
    const file = fileInputRef.current?.files?.[0] // Доступ к файлу через useRef
    console.log({ ...values, file })
  }

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
          name="message"
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
        <FormItem>
          <FormLabel>можно прикрепить файл</FormLabel>
          <FormControl>
            <Input id="file" type="file" ref={fileInputRef} />
          </FormControl>
          <FormMessage />
        </FormItem>
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
