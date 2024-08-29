import { Link } from '@inertiajs/react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ThemeSelect from '@/components/ui/theme-select'

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={'rounded-full w-8 h-8 cursor-pointer'}>
          <AvatarFallback>
            <span className="text-xs">LH</span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" sideOffset={10} align="end">
        <DropdownMenuLabel>
          <div className={'flex flex-col'}>
            <span className={'truncate'}>Luis Henrique</span>
            <span className={'truncate text-xs text-[#606060] font-normal'}>
              junimhs10@gmail.com
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/'}>
            <DropdownMenuItem className={'cursor-pointer'}>
              Editar perfil
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className={'flex justify-between items-center p-2'}>
          <p className={'text-sm'}>Escolha o tema</p>
          <ThemeSelect />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={'cursor-pointer'} asChild>
          <Link
            href={route('logout')}
            method={'post'}
            as={'button'}
            className={'w-full'}
          >
            Sair
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
