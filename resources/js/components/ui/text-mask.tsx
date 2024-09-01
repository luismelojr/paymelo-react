import * as React from 'react'
import InputMask from 'react-input-mask'

import { InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TextInputProps extends InputProps {
  label: string
  error: string
  type: string
  id: string
  className?: string
  mask: string
}
export default function TextMask(props: TextInputProps) {
  return (
    <div className={`flex flex-col w-full gap-2 ${props.className}`}>
      <Label htmlFor={props.id}>{props.label}</Label>
      <div className={'relative'}>
        <InputMask
          {...props}
          mask={'(99) 99999-9999'}
          value={props.value}
          onChange={props.onChange}
          className={`${props.error && 'border-red-500'} w-full outline-none flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'`}
        />
      </div>
      {props.error && <p className={'text-xs text-red-500'}>{props.error}</p>}
    </div>
  )
}
