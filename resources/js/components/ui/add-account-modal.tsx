import { Bank, CaretRight, Money, PiggyBank, Plus } from '@phosphor-icons/react'
import { Wallet } from 'lucide-react'
import { useState } from 'react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import SelectSearch from '@/components/ui/select-search'
import ListBankJson from '@/data/list-banks.json'
import FormatValuesForSelect from '@/utils/format-values-for-select'

interface ResultProps {
  type_account: 'current' | 'saving' | 'salary' | 'investment' | 'other' | null
  brand: string | null
  name: string | null
  amount_initial: string | null
  number_account: string | null
  number_agency: string | null
}

export default function AddAccountModal() {
  /*
   * Setp 1: Selecionar o tipo de conta
   * Step 2: Selecionar o banco
   * Step 3: Tela de selecao de outros bancos
   * Step 4: Tela de cadastro de conta
   * */
  const [steps, setSteps] = useState(1)
  const [result, setResult] = useState<ResultProps>({
    type_account: null,
    brand: null,
    name: null,
    amount_initial: null,
    number_account: null,
    number_agency: null,
  })
  const items = FormatValuesForSelect(ListBankJson.results, true)

  function controlOpenModal(status: boolean) {
    if (!status) {
      setSteps(1)
      setResult({
        type_account: null,
        brand: null,
        name: null,
        amount_initial: null,
        number_account: null,
        number_agency: null,
      })
    }
  }

  function selectTypeAccount(
    value: 'current' | 'saving' | 'salary' | 'investment' | 'other',
  ) {
    setResult({ ...result, type_account: value })
    setSteps(2)
  }

  function selectBrandBank(value: string) {
    if (value === 'other') {
      setSteps(3)
      return
    }

    setResult({ ...result, brand: value })
    setSteps(4)
  }

  return (
    <Dialog onOpenChange={controlOpenModal}>
      <DialogTrigger asChild>
        <Button>Adicionar Conta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {steps === 1 && 'Tipo de conta'}{' '}
            {steps === 2 ||
              (steps === 3 &&
                result.type_account !== 'other' &&
                'Selecione o banco')}
            {steps === 4 && 'Nova conta'}
          </DialogTitle>
          <DialogDescription>
            {steps === 1 && 'Escolha o tipo de conta que deseja adicionar'}
          </DialogDescription>
        </DialogHeader>
        {steps === 1 && <Step1 onSelectType={selectTypeAccount} />}
        {steps === 2 && result.type_account !== 'other' && (
          <Step2 selectBrandBank={selectBrandBank} items={items} />
        )}
        {steps === 3 && (
          <Step3 selectBrandBank={selectBrandBank} items={items} />
        )}
        {steps === 4 && <Step4 items={items} />}
      </DialogContent>
    </Dialog>
  )
}

interface Step1Props {
  onSelectType: (
    value: 'current' | 'saving' | 'salary' | 'investment' | 'other',
  ) => void
}
const Step1 = ({ onSelectType }: Step1Props) => {
  return (
    <div className={'space-y-4'}>
      <button
        onClick={() => onSelectType('current')}
        className={
          'border w-full rounded-md flex items-center justify-between gap-4 p-4 text-muted-foreground hover:border-foreground hover:text-foreground'
        }
      >
        <span
          className={
            'w-10 h-10 flex justify-center items-center border rounded-full border-muted-foreground'
          }
        >
          <Bank size={24} />
        </span>
        <span className={'flex-1 flex justify-start'}>Conta corrente</span>
        <CaretRight />
      </button>
      <button
        onClick={() => onSelectType('saving')}
        className={
          'border w-full rounded-md flex items-center justify-between gap-4 p-4 text-muted-foreground hover:border-foreground hover:text-foreground'
        }
      >
        <span
          className={
            'w-10 h-10 flex justify-center items-center border rounded-full border-muted-foreground'
          }
        >
          <PiggyBank size={24} />
        </span>
        <span className={'flex-1 flex justify-start'}>Conta poupança</span>
        <CaretRight />
      </button>
      <button
        onClick={() => onSelectType('investment')}
        className={
          'border w-full rounded-md flex items-center justify-between gap-4 p-4 text-muted-foreground hover:border-foreground hover:text-foreground'
        }
      >
        <span
          className={
            'w-10 h-10 flex justify-center items-center border rounded-full border-muted-foreground'
          }
        >
          <Money size={24} />
        </span>
        <span className={'flex-1 flex justify-start'}>Conta investimento</span>
        <CaretRight />
      </button>
      <button
        onClick={() => onSelectType('other')}
        className={
          'border w-full rounded-md flex items-center justify-between gap-4 p-4 text-muted-foreground hover:border-foreground hover:text-foreground'
        }
      >
        <span
          className={
            'w-10 h-10 flex justify-center items-center border rounded-full border-muted-foreground'
          }
        >
          <Wallet size={24} />
        </span>
        <span className={'flex-1 flex justify-start'}>Outros</span>
        <CaretRight />
      </button>
    </div>
  )
}

interface Step2Props {
  selectBrandBank: (value: string) => void
  items: { value: string; label: string; image: string | null }[]
}

const Step2 = ({ selectBrandBank, items }: Step2Props) => {
  console.log(items)
  // Pegar os bancos mais utilizados
  const selectedItems = items.filter((item) => {
    const banks = [
      'Bradesco',
      'Banco do Brasil',
      'Santander',
      'Caixa Econômica Federal',
      'Itaú Unibanco',
      'C6 Bank',
      'Nubank',
    ]

    return banks.includes(item.label)
  })

  return (
    <div className={'grid grid-cols-2 md:grid-cols-4 gap-2 items-start'}>
      {selectedItems.map((item) => (
        <button
          key={item.value}
          onClick={() => selectBrandBank(item.value)}
          className={
            'flex flex-col text-center gap-4 justify-center items-center py-4 rounded-md hover:dark:bg-[#1c1c23] hover:bg-zinc-100 transition-all'
          }
        >
          {item.image && (
            <img src={item.image} className={'w-12 h-12'} alt={item.label} />
          )}
          <span className={'text-xs text-muted-foreground'}>{item.label}</span>
        </button>
      ))}
      <button
        onClick={() => selectBrandBank('other')}
        className={
          'flex flex-col text-center gap-4 justify-center items-center py-4 rounded-md hover:dark:bg-[#1c1c23] hover:text-foreground text-muted-foreground hover:bg-zinc-100 transition-all'
        }
      >
        <div
          className={
            'border-dashed border w-12 h-12 flex justify-center items-center rounded-full hover:border-foreground'
          }
        >
          <Plus />
        </div>
        <span className={'text-xs text-muted-foreground'}>Outros</span>
      </button>
    </div>
  )
}

interface Step3Props {
  selectBrandBank: (value: string) => void
  items: { value: string; label: string; image: string | null }[]
}

const Step3 = ({ selectBrandBank, items }: Step3Props) => {
  const [error, setError] = useState('')

  function onSubmit(value: string) {
    if (value === '') {
      setError('Selecione um banco')
      return
    }

    selectBrandBank(value)
  }

  return (
    <div className={'w-full flex flex-col gap-2'}>
      <SelectSearch
        items={items}
        title={'Selecione o banco'}
        error={error}
        onSubmit={onSubmit}
        isButton={true}
      />
      {error && <p className={'text-xs text-red-500'}>{error}</p>}
    </div>
  )
}

interface Step4Props {
  items: { value: string; label: string; image: string | null }[]
}

const Step4 = ({ items }: Step4Props) => {
  return (
    <div className={'w-full flex flex-col gap-2'}>
      <SelectSearch
        items={items}
        title={'Selecione o banco'}
        onSubmit={() => {}}
        isButton={false}
      />
    </div>
  )
}
