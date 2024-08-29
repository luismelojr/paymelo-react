import { Link } from '@inertiajs/react'
import { Gear, Plus, SquaresFour, User, X } from '@phosphor-icons/react'
import { useClickAway } from '@uidotdev/usehooks'
import { motion, Reorder, useMotionValue } from 'framer-motion'
import { useState } from 'react'
import { useLongPress } from 'use-long-press'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { updateMenu } from '@/utils/update-menu'

const defaultItems = [
  {
    route: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    route: 'login',
    name: 'Configurações',
    path: '/settings',
  },
  {
    route: 'login',
    name: 'Usuários',
    path: '/users',
  },
]

const icons: Record<string, any> = {
  '/dashboard': () => <SquaresFour size={22} />,
  '/settings': () => <Gear size={22} />,
  '/users': () => <User size={22} />,
}

interface ItemProps {
  item: { route: string; name: string; path: string }
  isActive: boolean
  isCustomizing: boolean
  onRemove: (path: string) => void
  disableRemove: boolean
  onDragEnd: () => void
  onSelect?: () => void
}

const Item = ({
  item,
  isActive,
  isCustomizing,
  onRemove,
  disableRemove,
  onDragEnd,
  onSelect,
}: ItemProps) => {
  const y = useMotionValue(0)
  const Icon = icons[item.path]

  return (
    <TooltipProvider delayDuration={70}>
      <Link
        href={route(item.route)}
        onClick={(evt) => {
          if (isCustomizing) {
            evt.preventDefault()
          }
          onSelect?.()
        }}
        onMouseDown={(evt) => {
          if (isCustomizing) {
            evt.preventDefault()
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger className={'w-full'} asChild>
            <Reorder.Item
              onDragEnd={onDragEnd}
              key={item.path}
              value={item}
              id={item.path}
              style={{ y }}
              layoutRoot
              className={cn(
                'relative border border-transparent md:w-[45px] h-[45px] flex items-center md:justify-center',
                'hover:bg-accent hover:border-[#DCDAD2] hover:dark:border-[#2C2C2C]',
                isActive &&
                  'bg-[#F2F1EF] dark:bg-secondary border-[#DCDAD2] dark:border-[#2C2C2C]',
                isCustomizing &&
                  'bg-background border-[#DCDAD2] dark:border-[#2C2C2C]',
              )}
            >
              <motion.div
                className={'relative'}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {!disableRemove && isCustomizing && (
                  <Button
                    onClick={() => onRemove(item.path)}
                    variant="ghost"
                    size="icon"
                    className={
                      'absolute -left-4 -top-4 w-4 h-4 p-0 rounded-full bg-border hover:bg-border hover:scale-150 z-10 transition-all'
                    }
                  >
                    <X className={'w-3 h-3'} />
                  </Button>
                )}

                <div
                  className={cn(
                    'flex space-x-3 p-0 items-center pl-2 md:pl-0',
                    isCustomizing &&
                      'animate-[swing_0.3s_ease-in-out_infinite] transform-gpu pointer-events-none',
                  )}
                >
                  <Icon />
                  <span className="flex md:hidden">{item.name}</span>
                </div>
              </motion.div>
            </Reorder.Item>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="px-3 py-1.5 text-xs hidden md:flex"
            sideOffset={10}
          >
            {item.name}
          </TooltipContent>
        </Tooltip>
      </Link>
    </TooltipProvider>
  )
}

interface MainMenuProps {
  initialItems?: { route: string; name: string; path: string }[]
  onSelect?: () => void
}

const listVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
}

const itemVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

export function MainMenu({ initialItems, onSelect }: MainMenuProps) {
  const [items, setItems] = useState(initialItems ?? defaultItems)
  const [isCustomizing, setIsCustomizing] = useState(false)
  const hiddenItems = defaultItems.filter(
    (item) => !items.some((i) => i.path === item.path),
  )

  const onReorder = (
    items: { route: string; name: string; path: string }[],
  ) => {
    setItems(items)
  }

  const onDragEnd = async () => {
    await updateMenu(items)
  }

  const onRemove = async (path: string) => {
    setItems(items.filter((item) => item.path !== path))
    await updateMenu(items.filter((item) => item.path !== path))
  }

  const onAdd = async (item: { route: string; name: string; path: string }) => {
    setItems([...items, item])
    await updateMenu([...items, item])
  }

  const bind = useLongPress(
    () => {
      setIsCustomizing(true)
    },
    {
      cancelOnMovement: 0,
    },
  )

  const ref = useClickAway(() => {
    setIsCustomizing(false)
  })

  return (
    <div {...bind()} ref={ref as any}>
      <nav>
        <Reorder.Group
          axis={'y'}
          onReorder={onReorder}
          values={items}
          className={'flex flex-col gap-1.5'}
        >
          {items.map((item) => {
            return (
              <Item
                key={item.path}
                item={item}
                isActive={false}
                isCustomizing={isCustomizing}
                onRemove={onRemove}
                disableRemove={items.length === 1}
                onDragEnd={onDragEnd}
                onSelect={onSelect}
              />
            )
          })}
        </Reorder.Group>
      </nav>
      {hiddenItems.length > 0 && isCustomizing && (
        <nav className={'border-t-[1px] mt-6 pt-6'}>
          <motion.ul
            variants={listVariant}
            initial={'hidden'}
            animate={'show'}
            className={'flex flex-col gap-1.5'}
          >
            {hiddenItems.map((item) => {
              const Icon = icons[item.path]

              return (
                <motion.li
                  variants={itemVariant}
                  key={item.path}
                  className={cn(
                    'border border-transparent w-[45px] h-[45px] flex items-center md:justify-center',
                    'hover:bg-secondary hover:border-[#DCDAD2] hover:dark:border-[#2C2C2C]',
                    'bg-background border-[#DCDAD2] dark:border-[#2C2C2C]',
                  )}
                >
                  <div className={'relative'}>
                    <Button
                      onClick={() => onAdd(item)}
                      variant={'ghost'}
                      size={'icon'}
                      className={
                        'absolute -left-4 -top-4 w-4 h-4 p-0 rounded-full bg-border hover:bg-border hover:scale-150 z-10 transition-all'
                      }
                    >
                      <Plus className={'w-3 h-3'} />
                    </Button>
                    <Icon />
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </nav>
      )}
    </div>
  )
}
