import React, { FC } from 'react'
import { useParams } from 'react-router'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/components/ui/form'
import { Textarea } from '@shared/components/ui/textarea'
import { Button } from '@shared/components/ui/button'
import { validationRules } from '@shared/config/validationRules'
import { commentTopic } from '@processes/forum/api/forumApi'
import { useToast } from '@shared/hooks/use-toast'
import { useSelector } from 'react-redux'
import { selectUser } from '@shared/model/selectors'

const formSchema = z.object({
  content: validationRules.forum_message,
  author: validationRules.login,
})

export const CommentForm: FC = () => {
  const { toast } = useToast()
  const routeParams = useParams(),
    currentRouteParam = routeParams.id
  const user = useSelector(selectUser),
    login = user?.login
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      author: login,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const resultAction = await commentTopic(values, Number(currentRouteParam))
    if (resultAction) {
      toast({
        description: 'Успешно',
      })
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="space-y-8 p-4 md:p-8 mt-8 rounded-lg bg-accent">
        <h5 className="italic">добавить коммент</h5>
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
        <div className="flex flex-row gap-4">
          <Button type="submit">отправить →</Button>
        </div>
      </form>
    </FormProvider>
  )
}
