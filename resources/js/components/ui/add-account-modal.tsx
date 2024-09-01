import { zodResolver } from '@hookform/resolvers/zod'
import { Bank, CaretRight, Money, PiggyBank, Plus } from '@phosphor-icons/react'
import { Wallet } from 'lucide-react'
import { useState } from 'react'
import { useForm as useFormReactForm } from 'react-hook-form'

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
import { SelectBankInterface, selectBankSchema } from '@/schemas/schema-account'
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
          </DialogTitle>
          <DialogDescription>
            {steps === 1 && 'Escolha o tipo de conta que deseja adicionar'}
          </DialogDescription>
        </DialogHeader>
        {steps === 1 && <Step1 onSelectType={selectTypeAccount} />}
        {steps === 2 && result.type_account !== 'other' && (
          <Step2 selectBrandBank={selectBrandBank} />
        )}
        {steps === 3 && <Step3 />}
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
}

const Step2 = ({ selectBrandBank }: Step2Props) => {
  return (
    <div className={'grid grid-cols-2 md:grid-cols-4 gap-2'}>
      <button
        onClick={() => selectBrandBank('bradesco')}
        className={
          'flex flex-col text-center gap-4 justify-center items-center py-4 rounded-md hover:dark:bg-[#1c1c23] hover:bg-zinc-100 transition-all'
        }
      >
        <img
          src={
            'https://storage.googleapis.com/controlle_dev_prod/institutions_financials/bradesco.png'
          }
          className={'w-12 h-12'}
          alt={'Bradesco'}
        />
        <span>Bradesco</span>
      </button>
      <button
        onClick={() => selectBrandBank('nubank')}
        className={
          'flex flex-col text-center gap-4 justify-center items-center py-4 rounded-md hover:dark:bg-[#1c1c23] hover:bg-zinc-100 transition-all'
        }
      >
        <img
          src={
            'https://storage.googleapis.com/controlle_dev_prod/institutions_financials/nubank.png'
          }
          className={'w-12 h-12'}
          alt={'Bradesco'}
        />
        <span>Nubank</span>
      </button>
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
        <span>Outros</span>
      </button>
    </div>
  )
}

const Step3 = () => {
  const items = FormatValuesForSelect(ListBankJson.results, true)
  const [error, setError] = useState('')

  function onSubmit(value: string) {
    if (value === '') {
      setError('Selecione um banco')
    }
  }

  return (
    <div className={'w-full flex gap-2'}>
      <SelectSearch
        items={items}
        title={'Selecione o banco'}
        error={error}
        onSubmit={onSubmit}
      />
    </div>
  )
}
