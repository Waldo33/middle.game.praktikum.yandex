import { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select'
import { themeSwitch } from '@processes/theme/api/themeApi'

export const ThemeSwitcher: FC = () => {
  const handleThemeChange = async (value: string) => {
    const theme = value === '2' ? 'dark' : 'default'
    await themeSwitch({ theme_id: value })

    localStorage.setItem('theme', theme)
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-4">
      <small>можно выбрать тему!</small>
      <Select onValueChange={handleThemeChange} data-side="top">
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Default</SelectItem>
          <SelectItem value="2">Dark</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
