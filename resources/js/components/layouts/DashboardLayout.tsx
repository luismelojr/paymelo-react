import { Link } from '@inertiajs/react'
import { PropsWithChildren, useEffect } from 'react'

import { Alert } from '@/components/ui/alert'
import AlertNotRegisterPhone from '@/components/ui/alert-not-register-phone'
import HeaderNavigation from '@/components/ui/header-navigation'
import Sidebar from '@/components/ui/sidebar'
import Toast from '@/components/ui/toast'
import useUser from '@/hooks/useUser'

interface DashboardLayoutProps extends PropsWithChildren {
  title: string
}
export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const user = useUser()
  useEffect(() => {
    const theme = localStorage.getItem('theme') ?? 'dark'
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [])

  return (
    <div className={'min-h-screen min-w-screen'}>
      {!user.phone && <AlertNotRegisterPhone />}
      <div className={'grid grid-cols-1 md:grid-cols-[60px_1fr]'}>
        <div className={'h-full hidden md:block'}>
          <Sidebar />
        </div>
        <div className={'h-full w-full pl-4 flex flex-col gap-4 pt-5'}>
          <HeaderNavigation />
          <div className={'border-t-[1px] pt-5 pr-4'}>
            <h3 className={'text-2xl font-semibold'}>{title}</h3>
            <div className={'mt-6'}>{children}</div>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  )
}
