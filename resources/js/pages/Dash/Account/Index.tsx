import { Link } from '@inertiajs/react'
import { Check } from '@phosphor-icons/react'

import EmptyAccountImage from '@/components/images/emptyBankAccounts.svg'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import AddAccountModal from '@/components/ui/add-account-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AccountInterface } from '@/types'

export default function AccountIndex({
  accounts,
}: {
  accounts: AccountInterface[]
}) {
  return (
    <DashboardLayout title={'Contas e Carteiras'}>
      {accounts.length === 0 && (
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
      )}
    </DashboardLayout>
  )
}
