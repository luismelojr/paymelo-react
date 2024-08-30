import { router } from '@inertiajs/react'
import { useState } from 'react'

import DashboardLayout from '@/components/layouts/DashboardLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import HeaderConfig from '@/components/ui/header-config'
import Stats from '@/components/ui/stats'
import { Switch } from '@/components/ui/switch'
import useUser from '@/hooks/useUser'
import { NotificationInterface } from '@/types'

export default function NotificationIndex({
  notification,
}: {
  notification: NotificationInterface
}) {
  const user = useUser()
  function onCheckedValues(value: boolean, type: string) {
    const params = {
      [type]: value,
    }
    try {
      router.patch(
        route('notification.update.values', { notification }),
        params,
      )
    } catch (e) {
      console.log('error', e)
    }
  }
  return (
    <DashboardLayout title={'Configurações'}>
      <HeaderConfig />
      <div className={'mt-10 space-y-4'}>
        <Card>
          <CardHeader>
            <div className={'flex justify-between items-center'}>
              <div className={'space-y-2'}>
                <CardTitle>Notificar Pagamento A Vencer</CardTitle>
                <CardDescription>
                  Defina se o sistema deve notificar sobre pagamentos a vencer
                  com 1 dia de antecedência
                </CardDescription>
              </div>
              <Switch
                checked={notification.notify_payment}
                onCheckedChange={(checked: boolean) =>
                  onCheckedValues(checked, 'notify_payment')
                }
              />
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className={'flex justify-between items-center'}>
              <div className={'space-y-2'}>
                <CardTitle>Receber Notificações Por E-mail</CardTitle>
                <CardDescription>
                  Defina se o sistema deve enviar notificações por e-mail
                </CardDescription>
              </div>
              <Switch
                checked={notification.notify_email}
                onCheckedChange={(checked: boolean) =>
                  onCheckedValues(checked, 'notify_email')
                }
              />
            </div>
          </CardHeader>
        </Card>
        <Card className={`${!user.phone ? 'opacity-[0.4]' : 'opacity-1'}`}>
          <CardHeader>
            <div className={'flex justify-between items-center'}>
              <div className={'space-y-2'}>
                <CardTitle>Receber Notificações Whatsapp</CardTitle>
                <CardDescription>
                  Defina se o sistema deve enviar notificações por Whatsapp,
                  <b className={'underline'}>
                    antes verifique se o número de telefone está correto
                  </b>
                </CardDescription>
              </div>
              <Switch
                checked={notification.notify_whatsapp}
                disabled={!user.phone}
                onCheckedChange={(checked: boolean) =>
                  onCheckedValues(checked, 'notify_whatsapp')
                }
              />
            </div>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  )
}
