import { Link } from '@inertiajs/react'
import Cookies from 'js-cookie'
import { Wallet } from 'lucide-react'

import { MainMenu } from '@/components/ui/main-menu'

export default function Sidebar() {
  const initialItems = JSON.parse(Cookies.get('menu-list') || '[]')
  return (
    <aside className={'h-full w-full'}>
      <div className={'flex flex-col pt-4 justify-center items-center'}>
        <div>
          <Link href={route('dashboard')}>
            <Wallet size={32} />
          </Link>
        </div>
        <div className={'mt-10'}>
          <MainMenu initialItems={initialItems} />
        </div>
      </div>
    </aside>
  )
}
