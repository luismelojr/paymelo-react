import { PropsWithChildren, useEffect } from 'react'

import HeaderNavigation from '@/components/ui/header-navigation'
import Sidebar from '@/components/ui/sidebar'
import Toast from '@/components/ui/toast'

export default function DashboardLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    const theme = localStorage.getItem('theme') ?? 'dark'
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [])

  return (
    <>
      <div
        className={
          'min-h-screen min-w-screen grid grid-cols-1 md:grid-cols-[60px_1fr]'
        }
      >
        <div className={'h-full hidden md:block'}>
          <Sidebar />
        </div>
        <div className={'h-full w-full pl-4 flex flex-col gap-4 pt-5'}>
          <HeaderNavigation />
          <div className={'border-t-[1px] pt-5'}>{children}</div>
        </div>
      </div>
      <Toast />
    </>
  )
}
