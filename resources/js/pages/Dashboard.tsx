import DashboardLayout from '@/components/layouts/DashboardLayout'
import Stats from '@/components/ui/stats'
import useUser from '@/hooks/useUser'

export default function Dashboard() {
  const user = useUser()
  return (
    <DashboardLayout>
      <main className={'flex flex-col'}>
        <div className={'grid grid-cols-1 md:grid-cols-3 gap-4'}>
          <Stats
            title={'Receita'}
            value={100}
            showValue={user.config.hide_values}
          />
          <Stats
            title={'Despesas'}
            value={1500}
            showValue={user.config.hide_values}
          />
          <Stats
            title={'Despesas'}
            value={500}
            showValue={user.config.hide_values}
          />
        </div>
      </main>
    </DashboardLayout>
  )
}
