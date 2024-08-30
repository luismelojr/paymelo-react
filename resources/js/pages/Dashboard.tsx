import { DollarSign, EyeOff } from 'lucide-react'
import { useState } from 'react'

import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useUser from '@/hooks/useUser'

export default function Dashboard() {
  const user = useUser()
  const [showValueReceipts, setShowValueReceipts] = useState(
    user.config.hide_values,
  )
  const [showValueExpenses, setShowValueExpenses] = useState(
    user.config.hide_values,
  )
  const [showValueBalance, setShowValueBalance] = useState(
    user.config.hide_values,
  )
  return (
    <DashboardLayout>
      <main className={'flex flex-col'}>
        <div className={'grid grid-cols-1 md:grid-cols-3 gap-4'}>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Receitas do mês
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <button
                className="text-2xl font-bold"
                onClick={() => setShowValueReceipts(!showValueReceipts)}
              >
                {showValueReceipts ? (
                  'R$ 10.000,00'
                ) : (
                  <div
                    className={
                      'flex gap-2 items-center text-muted-foreground text-sm'
                    }
                  >
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    <span>Mostar valor</span>
                  </div>
                )}
              </button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Despesas do mês
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <button
                className="text-2xl font-bold"
                onClick={() => setShowValueExpenses(!showValueExpenses)}
              >
                {showValueExpenses ? (
                  'R$ 10.000,00'
                ) : (
                  <div
                    className={
                      'flex gap-2 items-center text-muted-foreground text-sm'
                    }
                  >
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    <span>Mostar valor</span>
                  </div>
                )}
              </button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Saldo do mês
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <button
                className="text-2xl font-bold"
                onClick={() => setShowValueBalance(!showValueBalance)}
              >
                {showValueBalance ? (
                  'R$ 10.000,00'
                ) : (
                  <div
                    className={
                      'flex gap-2 items-center text-muted-foreground text-sm'
                    }
                  >
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    <span>Mostar valor</span>
                  </div>
                )}
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  )
}
