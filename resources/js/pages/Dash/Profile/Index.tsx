import { router, useForm } from '@inertiajs/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import DeleteModal from '@/components/ui/delete-modal'
import TextInput from '@/components/ui/text-input'
import TextMask from '@/components/ui/text-mask'
import { UserInterface } from '@/types'

export default function ProfileIndex({ user }: { user: UserInterface }) {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    name: user.name,
    phone: user.phone || '',
  })

  const formPassword = useForm({
    password_actual: '',
    password: '',
    password_confirmation: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    form.put(route('profile.update'))
  }

  function handleSubmitPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    formPassword.patch(route('profile.update.password'))
  }

  function handleDeleteAccount() {
    try {
      setLoading(true)
      router.delete(route('profile.destroy'))
    } catch (e) {
      toast.error('Erro ao deletar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout title={'Perfil'}>
      <div className={'flex flex-col gap-4'}>
        <Card>
          <CardHeader>
            <CardTitle>Editar Perfil</CardTitle>
            <CardDescription>
              Edite as informações do seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent className={'border-t-[1px] py-6'}>
            <form className={'space-y-4'} onSubmit={handleSubmit}>
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
              <div className={'flex justify-end'}>
                <Button
                  type={'submit'}
                  variant={'default'}
                  loading={form.processing}
                >
                  Editar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Editar Senha</CardTitle>
            <CardDescription>Edite a senha da sua conta</CardDescription>
          </CardHeader>
          <CardContent className={'border-t-[1px] py-6'}>
            <form className={'space-y-4'} onSubmit={handleSubmitPassword}>
              <TextInput
                label={'Senha atual'}
                error={formPassword.errors.password_actual as string}
                value={formPassword.data.password_actual as string}
                onChange={(e) =>
                  formPassword.setData('password_actual', e.target.value)
                }
                type={'password'}
                id={'password_actual'}
              />
              <TextInput
                label={'Senha'}
                error={formPassword.errors.password as string}
                value={formPassword.data.password as string}
                onChange={(e) =>
                  formPassword.setData('password', e.target.value)
                }
                type={'password'}
                id={'password'}
              />
              <TextInput
                label={'Confirme a senha'}
                error={formPassword.errors.password_confirmation as string}
                value={formPassword.data.password_confirmation as string}
                onChange={(e) =>
                  formPassword.setData('password_confirmation', e.target.value)
                }
                type={'password'}
                id={'password_confirmation'}
              />
              <div className={'flex justify-end'}>
                <Button
                  type={'submit'}
                  variant={'default'}
                  loading={formPassword.processing}
                >
                  Editar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className={'border-destructive'}>
          <CardHeader>
            <CardTitle>Deleta Conta</CardTitle>
            <CardDescription>
              Remover permanentemente a sua conta é uma ação irreversível. Todos
              os seus dados serão apagados e você não poderá recuperá-los.
            </CardDescription>
          </CardHeader>
          <CardFooter className={'flex justify-end border-t-[1px] py-6'}>
            <DeleteModal
              onDelete={handleDeleteAccount}
              loading={loading}
              title={'Deletar Conta'}
              message={'Tem certeza que deseja deletar sua conta?'}
            />
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
