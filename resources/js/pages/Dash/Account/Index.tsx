import { Link, router } from '@inertiajs/react'
import { Check, Trash } from '@phosphor-icons/react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import EmptyAccountImage from '@/components/images/emptyBankAccounts.svg'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import AddAccountModal from '@/components/ui/add-account-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import DeleteModal from '@/components/ui/delete-modal'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AccountInterface } from '@/types'
import StringFormat from '@/utils/string-format'

export default function AccountIndex({
  accounts,
}: {
  accounts: AccountInterface[]
}) {
  const { formatTextTypeAccount } = StringFormat()

  const chartConfig = {
    income: {
      label: 'Receitas',
      color: 'hsl(var(--chart-1))',
    },
    expenses: {
      label: 'Despesas',
      color: 'hsl(var(--chart-2))',
    },
  }

  function onDeleteAccount(account: AccountInterface) {
    try {
      router.delete(route('accounts.destroy', { account }))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <DashboardLayout title={'Contas e Carteiras'}>
      {accounts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Todas as suas contas bancárias e investimentos em um único lugar
            </CardTitle>
          </CardHeader>
          <CardContent className={'border-t-[1px] pt-6'}>
            <div className={'flex justify-between items-center'}>
              <ul className={'space-y-4'}>
                <li className={'flex items-center gap-4 text-sm'}>
                  <Check className={'dark:text-green-300 text-green-600'} />
                  <span>
                    Um extrato detalhado e em tempo real das suas contas
                  </span>
                </li>
                <li className={'flex items-center gap-4 text-sm'}>
                  <Check className={'dark:text-green-300 text-green-600'} />
                  <span>Defina limites e receba alertas</span>
                </li>
                <li className={'flex items-center gap-4 text-sm'}>
                  <Check className={'dark:text-green-300 text-green-600'} />
                  <span>
                    Importe extratos e categorize suas transações
                    automaticamente
                  </span>
                </li>
                <li className={'!mt-8'}>
                  <AddAccountModal />
                </li>
              </ul>
              <div>
                <img src={EmptyAccountImage} alt="Cartão de crédito" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className={'flex justify-end py-4'}>
            <AddAccountModal />
          </div>
          <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
            {accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader>
                  <CardTitle
                    className={'flex justify-between items-start gap-2'}
                  >
                    <div className={'flex items-start gap-2'}>
                      <div>
                        <img
                          src={account.brand as string}
                          alt={account.name}
                          className={'w-10 h-10 rounded-full'}
                        />
                      </div>
                      <div>
                        <div className={'text-sm font-semibold'}>
                          {account.name}
                        </div>
                        <div className={'text-xs text-gray-500'}>
                          {formatTextTypeAccount(account.type_account)}
                        </div>
                        <Link
                          href={''}
                          className={'text-xs text-white hover:underline'}
                        >
                          Ver extrato
                        </Link>
                      </div>
                    </div>
                    <TooltipProvider delayDuration={70}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DeleteModal
                            onDelete={() => onDeleteAccount(account)}
                            loading={false}
                            title={'Remover conta'}
                            message={'Deseja realmente remover essa conta?'}
                            component={
                              <Button variant={'outline'} size={'icon'}>
                                <Trash />
                              </Button>
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent side={'top'} className={'p-2'}>
                          Remover conta
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[200px] w-full"
                  >
                    <BarChart accessibilityLayer data={account.balances}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey="income"
                        type="monotone"
                        fill="var(--color-income)"
                        radius={2}
                      />
                      <Bar
                        dataKey="expenses"
                        type="monotone"
                        fill="var(--color-expenses)"
                        radius={2}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
