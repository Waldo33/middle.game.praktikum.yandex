import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shared/components/ui/form'
import { Input } from '@shared/components/ui/input'
import { Control } from 'react-hook-form'

interface FormFieldWrapperProps {
  control: Control<any>
  name: string
  label: string
}

export const FormFieldWrapper = ({
  control,
  name,
  label,
}: FormFieldWrapperProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
