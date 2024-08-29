import { Link } from '@inertiajs/react'
import { Menu, Wallet } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { MainMenu } from '@/components/ui/main-menu'
import { Sheet, SheetContent } from '@/components/ui/sheet'

export default function MenuMobile() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={() => setIsOpen(!isOpen)}
          className={'rounded-full w-8 h-8 items-center relative flex'}
        >
          <Menu size={16} />
        </Button>
      </div>
      <SheetContent side={'left'} className={'border-none rounded-none -ml-2'}>
        <Link
          href={route('login')}
          className="flex items-center gap-2 text-xl text-foreground"
        >
          <Wallet size={20} />
          paymelo
        </Link>
        <div className={'mt-10 -ml-2'}>
          <MainMenu onSelect={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
