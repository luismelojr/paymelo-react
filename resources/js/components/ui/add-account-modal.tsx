import { useForm } from '@inertiajs/react'
import { Bank, CaretRight, Money, PiggyBank, Plus } from '@phosphor-icons/react'
import { Wallet } from 'lucide-react'
import { useState } from 'react'
import * as React from 'react'
import { CurrencyInput } from 'react-currency-mask'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import SelectSearch from '@/components/ui/select-search'
import TextInput from '@/components/ui/text-input'
import ListBankJson from '@/data/list-banks.json'
import FormatValuesForSelect from '@/utils/format-values-for-select'
import StringFormat from '@/utils/string-format'

export interface BrandProps {
  value: string
  label: string
  image: string | null
}
interface ResultProps {
  type_account: 'current' | 'saving' | 'salary' | 'investment' | 'other' | null
  brand: BrandProps
  name: string | null
  amount_initial: string
  number_account: string
  number_agency: string
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
    brand: { value: '', label: '', image: '' },
    name: null,
    amount_initial: '',
    number_account: '',
    number_agency: '',
  })
  const items = FormatValuesForSelect(ListBankJson.results, true)
  const [open, setOpen] = useState(false)
  const { formatTextTypeAccount } = StringFormat()

  function controlOpenModal(status: boolean) {
    setOpen(status)
    if (!status) {
      setSteps(1)
      setResult({
        type_account: null,
        brand: { value: '', label: '', image: '' },
        name: null,
        amount_initial: '',
        number_account: '',
        number_agency: '',
      })
    }
  }

  function selectTypeAccount(
    value: 'current' | 'saving' | 'salary' | 'investment' | 'other',
  ) {
    setResult({ ...result, type_account: value })
    setSteps(2)
  }

  function selectBrandBank(value: BrandProps) {
    if (value.label === 'other') {
      setSteps(3)
      return
    }

    setResult({ ...result, brand: value })
    setSteps(4)
  }

  return (
    <Dialog onOpenChange={controlOpenModal} open={open}>
      <DialogTrigger asChild>
        <Button>Adicionar Conta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {steps === 1 && 'Tipo de conta'}{' '}
            {steps === 2 || (steps === 3 && 'Selecione o banco')}
            {steps === 4 &&
              `Nova conta - ${formatTextTypeAccount(result.type_account)}`}
          </DialogTitle>
          <DialogDescription>
            {steps === 1 && 'Escolha o tipo de conta que deseja adicionar'}
          </DialogDescription>
        </DialogHeader>
        {steps === 1 && <Step1 onSelectType={selectTypeAccount} />}
        {steps === 2 && (
          <Step2 selectBrandBank={selectBrandBank} items={items} />
        )}
        {steps === 3 && (
          <Step3 selectBrandBank={selectBrandBank} items={items} />
        )}
        {steps === 4 && (
          <Step4 items={items} result={result} close={() => setOpen(false)} />
        )}
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
  selectBrandBank: (value: BrandProps) => void
  items: { value: string; label: string; image: string | null }[]
}

const Step2 = ({ selectBrandBank, items }: Step2Props) => {
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
          onClick={() => selectBrandBank(item)}
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
        onClick={() =>
          selectBrandBank({ value: 'other', label: 'other', image: null })
        }
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
  selectBrandBank: (value: BrandProps) => void
  items: { value: string; label: string; image: string | null }[]
}

const Step3 = ({ selectBrandBank, items }: Step3Props) => {
  const [error, setError] = useState('')

  function onSubmit(value: BrandProps | null) {
    if (value === null) {
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
  result: ResultProps
  close: () => void
}

const Step4 = ({ items, result, close }: Step4Props) => {
  const form = useForm({
    type_account: result?.type_account || null,
    brand: result.brand,
    name: result.brand.label,
    amount_initial: '',
    number_account: '',
    number_agency: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    form.post(route('accounts.store'), {
      onSuccess: () => {
        close()
      },
    })
  }

  return (
    <form className={'w-full space-y-4'} onSubmit={handleSubmit}>
      <TextInput
        label={'Nome do banco'}
        error={form.errors.name as string}
        type={'text'}
        id={'name'}
        value={form.data.name as string}
        onChange={(e) => form.setData('name', e.target.value)}
      />

      <div className={'space-y-2'}>
        <Label htmlFor={'brand-bank'}>Selecionar banco</Label>
        <SelectSearch
          items={items}
          title={'Selecione o banco'}
          onSubmit={(value) => form.setData('brand', value as BrandProps)}
          isValue={form.data.brand}
          isButton={false}
          error={form.errors.brand as string}
        />
      </div>
      <CurrencyInput
        value={form.data?.amount_initial as string}
        onChangeValue={(_, value) =>
          form.setData('amount_initial', value as string)
        }
        InputElement={
          <TextInput
            label="Valor Mínimo"
            name="minimum_value"
            id="minimum_value"
            error={form.errors.amount_initial as string}
            type={'text'}
          />
        }
      />
      <TextInput
        label={'Agência do banco (opcional)'}
        error={form.errors.number_agency as string}
        type={'text'}
        id={'name'}
        value={form.data.number_agency as string}
        onChange={(e) => form.setData('number_agency', e.target.value)}
      />
      <TextInput
        label={'Numero da conta (opcional)'}
        error={form.errors.number_account as string}
        type={'text'}
        id={'name'}
        value={form.data.number_account as string}
        onChange={(e) => form.setData('number_account', e.target.value)}
      />
      <Button className={'w-full'} type={'submit'} loading={form.processing}>
        Cadastrar conta
      </Button>
    </form>
  )
}
