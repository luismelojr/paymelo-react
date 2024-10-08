import { Link, useForm } from '@inertiajs/react'
import { GoogleLogo } from '@phosphor-icons/react'

import AuthLayout from '@/components/layouts/AuthLayout'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import TextInput from '@/components/ui/text-input'

export default function Login() {
  const form = useForm({
    email: '',
    password: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    form.post(route('login'))
  }

  return (
    <AuthLayout>
      <div className={'flex flex-col justify-center flex-1'}>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-2xl font-semibold tracking-tight'}>
            Acessar o painel
          </h1>
          <p className={'text-sm text-muted-foreground'}>
            Faça login para acessar o painel de controle
          </p>
        </div>
        <form className={'space-y-4 mt-10'} onSubmit={handleSubmit}>
          <TextInput
            label={'E-mail'}
            error={form.errors.email as string}
            value={form.data.email as string}
            onChange={(e) => form.setData('email', e.target.value)}
            type={'email'}
            id={'email'}
          />
          <TextInput
            label={'Senha'}
            error={form.errors.password as string}
            value={form.data.password as string}
            onChange={(e) => form.setData('password', e.target.value)}
            type={'password'}
            id={'password'}
          />
          <div className={'!mt-2'}>
            <Link
              href={route('login')}
              className={
                'text-sm text-primary dark:text-foreground transition-all hover:text-indigo-500'
              }
            >
              Esqueci minha senha
            </Link>
          </div>
          <Button
            type={'submit'}
            className={'w-full'}
            loading={form.processing}
          >
            Acessar o painel
          </Button>
          <Separator />
          <Button variant={'outline'} className={'w-full'} asChild>
            <a
              href={route('oauth.google')}
              className={'flex gap-1 items-center'}
            >
              <GoogleLogo className={'h-5 w-5'} />
              <span className={'ml-2'}>Entrar com Google</span>
            </a>
          </Button>
        </form>
        <div className={'mt-10 text-center'}>
          <Button
            variant={'link'}
            asChild
            className={'text-sm text-muted-foreground'}
          >
            <Link href={route('register')}>Não tem uma conta? Registre-se</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
