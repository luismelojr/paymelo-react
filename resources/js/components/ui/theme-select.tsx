import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Theme = 'dark' | 'light'

const themes = ['dark', 'light']

type Props = {
  currentTheme?: Theme
}

const ThemeIcon = ({ currentTheme }: Props) => {
  switch (currentTheme) {
    case 'dark':
      return <Moon size={12} />
    case 'light':
      return <Sun size={12} />
    default:
      return <Sun size={12} />
  }
}
export default function ThemeSelect() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) ?? 'dark',
  )

  const setTheme = (theme: Theme) => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'dark')
      document.body.classList.add('dark')
    } else {
      localStorage.setItem('theme', 'light')
      document.body.classList.remove('dark')
    }
    setCurrentTheme(theme)
  }

  return (
    <div className={'flex items-center relative'}>
      <Select
        defaultValue={currentTheme}
        onValueChange={(value: Theme) => setTheme(value)}
      >
        <SelectTrigger
          className={
            'w-full pl-6 pr-3 py-1.5 bg-transparent outline-none capitalize h-[32px] text-xs'
          }
        >
          <SelectValue placeholder={'Selecionar tema'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {themes.map((theme) => (
              <SelectItem value={theme} key={theme} className={'capitalize'}>
                {theme}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className={'absolute left-2 pointer-events-none'}>
        <ThemeIcon currentTheme={currentTheme} />
      </div>
    </div>
  )
}
