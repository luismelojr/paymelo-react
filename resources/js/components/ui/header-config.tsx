import { Link } from '@inertiajs/react'

interface ItemProps {
  name: string
  href: string
  isActive: boolean
}

function Item({ name, href, isActive }: ItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`text-sm ${isActive ? 'text-foreground' : 'text-[#606060]'} hover:text-foreground`}
      >
        {name}
      </Link>
    </li>
  )
}

const menus = [
  {
    name: 'Visualização',
    href: route('config.show'),
    routeActive: ['config.show'],
  },
  {
    name: 'Notificações',
    href: route('notification.show'),
    routeActive: ['notification.show'],
  },
]

export default function HeaderConfig() {
  const isActivated = (routeName: Array<string>) => {
    const value = routeName.map((item) => {
      return route().current(item)
    })

    return value.includes(true)
  }

  return (
    <div>
      <nav>
        <ul className={'flex gap-6 items-center'}>
          {menus.map((menu) => (
            <Item
              key={menu.name}
              name={menu.name}
              href={menu.href}
              isActive={isActivated(menu.routeActive)}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}
