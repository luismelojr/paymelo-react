import { DollarSign, EyeOff } from 'lucide-react'
import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatsProps {
  title: string
  value: number
  showValue: boolean
}

export default function Stats({ title, value, showValue }: StatsProps) {
  const [showValues, setShowValues] = useState(showValue)
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <button
          className="text-2xl font-bold"
          onClick={() => setShowValues(!showValues)}
        >
          {showValues ? (
            `${Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value)}`
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
  )
}
