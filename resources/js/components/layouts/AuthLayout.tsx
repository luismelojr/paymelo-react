import { Link } from '@inertiajs/react'
import { Wallet } from 'lucide-react'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className={'p-4 mt-10 flex flex-col'}>
        <Link
          href={route('login')}
          className="flex items-center gap-2 text-2xl text-foreground"
        >
          <Wallet size={30} />
          paymelo
        </Link>
        {children}
        <div className={'mt-auto text-center'}>
          <a
            href="https://www.linkedin.com/in/luis-henrique-da-silva-melo-junior-416579155/"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground transition-all"
            rel="noreferrer"
          >
            Desenvolvido por Luis Melo
          </a>
        </div>
      </div>
      <div className="bg-[url('/assets/images/banner.jpg')] bg-no-repeat bg-cover bg-center relative hidden md:block lg:col-span-2" />
    </div>
  )
}
