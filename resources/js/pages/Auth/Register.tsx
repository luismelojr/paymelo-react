import { Link, useForm } from '@inertiajs/react'
import { GoogleLogo } from '@phosphor-icons/react'
import InputMask from 'react-input-mask'

import AuthLayout from '@/components/layouts/AuthLayout'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import TextInput from '@/components/ui/text-input'
import TextMask from '@/components/ui/text-mask'

export default function Login() {
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    form.post(route('register'))
  }

  return (
    <AuthLayout>
      <div className={'flex flex-col justify-center flex-1'}>
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-2xl font-semibold tracking-tight'}>
            Cadastre-se
          </h1>
          <p className={'text-sm text-muted-foreground'}>
            Crie uma conta para acessar o painel de controle
          </p>
        </div>
        <form className={'space-y-4 mt-10'} onSubmit={handleSubmit}>
          <TextInput
            label={'Nome'}
            error={form.errors.name as string}
            value={form.data.name as string}
            onChange={(e) => form.setData('name', e.target.value)}
            type={'text'}
            id={'name'}
          />
          <TextMask
            label={'Telefone'}
            value={form.data.phone as string}
            onChange={(e) => form.setData('phone', e.target.value)}
            error={form.errors.phone as string}
            type={'text'}
            id={'phone'}
            mask={'(99) 99999-9999'}
          />
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
          <TextInput
            label={'Confirme a senha'}
            error={form.errors.password_confirmation as string}
            value={form.data.password_confirmation as string}
            onChange={(e) =>
              form.setData('password_confirmation', e.target.value)
            }
            type={'password'}
            id={'password_confirmation'}
          />
          <Button
            type={'submit'}
            className={'w-full'}
            loading={form.processing}
          >
            Acessar o painel
          </Button>
          <Separator />
          <Button variant={'outline'} className={'w-full'} asChild>
            <a href="#" className={'flex gap-1 items-center'}>
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
            <Link href={route('login')}>Já tem uma conta? Acesse o painel</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
