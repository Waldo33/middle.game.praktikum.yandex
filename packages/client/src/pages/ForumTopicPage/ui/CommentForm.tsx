import React, { FC, useEffect, useRef } from 'react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/components/ui/form'
import { Input } from '@shared/components/ui/input'
import { Textarea } from '@shared/components/ui/textarea'
import { Button } from '@shared/components/ui/button'
import { validationRules } from '@shared/config/validationRules'

const formSchema = z.object({
  message: validationRules.forum_message,
  file: validationRules.forum_file,
})

export const CommentForm: FC = () => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function onSubmit(values: z.infer<typeof formSchema>) {
    const file = fileInputRef.current?.files?.[0] // Доступ к файлу через useRef
    console.log({ ...values, file })
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
        className="space-y-8 p-4 md:p-8 mt-8 rounded-lg bg-accent">
        <h5 className="italic">добавить коммент</h5>
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
          <Button type="submit">отправить →</Button>
        </div>
      </form>
    </FormProvider>
  )
}
