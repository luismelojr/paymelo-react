import DashboardLayout from '@/components/layouts/DashboardLayout'
import { ConfigInterface } from '@/types'

export default function ConfigIndex({ config }: { config: ConfigInterface }) {
  console.log(config)
  return <DashboardLayout>Configuracao</DashboardLayout>
}
