import { PropsWithChildren } from 'react'

import Sidebar from '@/components/ui/sidebar'
import Toast from '@/components/ui/toast'

export default function DashboardLayout({ children }: PropsWithChildren) {
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
        <div className={'h-full w-full pl-4'}>{children}</div>
      </div>
      <Toast />
    </>
  )
}
