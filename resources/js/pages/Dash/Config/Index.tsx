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
import { ConfigInterface } from '@/types'

export default function ConfigIndex({ config }: { config: ConfigInterface }) {
  const [showValues, setShowValues] = useState(config.hide_values)
  function onCheckedValues(value: boolean) {
    try {
      router.patch(route('config.update.values', { config }), {
        hide_values: value,
      })
    } catch (e) {
      console.log('error', e)
    } finally {
      setShowValues(value)
    }
  }
  return (
    <DashboardLayout>
      <HeaderConfig />
      <div className={'mt-10'}>
        <Card>
          <CardHeader>
            <div className={'flex justify-between items-center'}>
              <div className={'space-y-2'}>
                <CardTitle>Esconder os Totalizadores?</CardTitle>
                <CardDescription>
                  Defina se o valores totalizados são escondidos por padrão
                </CardDescription>
              </div>
              <Switch
                checked={config.hide_values}
                onCheckedChange={onCheckedValues}
              />
            </div>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  )
}
