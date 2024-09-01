import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface SelectSearchProps {
  items: {
    value: string
    label: string
    image: string | null
  }[]
  title: string
  error?: string
  onSubmit: (value: string) => void
  isButton: boolean
}

export default function SelectSearch({
  items,
  title,
  error,
  onSubmit,
  isButton = true,
}: SelectSearchProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div
      className={cn(`w-full flex gap-2 ${isButton ? 'flex-row' : 'flex-col'}`)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between',
              error && 'border-destructive',
            )}
          >
            {value ? items.find((item) => item.value === value)?.label : title}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={'w-[360px] p-0'}>
          <Command>
            <CommandInput placeholder={'Pesquisar...'} className={'h-9'} />
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                    className={'flex items-center gap-2'}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.label}
                        className={'h-6 w-6 rounded-full'}
                      />
                    )}
                    {item.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === item.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {isButton && (
        <Button type={'button'} onClick={() => onSubmit(value)}>
          Continuar
        </Button>
      )}
    </div>
  )
}
