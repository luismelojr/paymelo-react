import * as zod from 'zod'

export const selectBankSchema = zod.object({
  brand: zod.string(),
})

export type SelectBankInterface = zod.infer<typeof selectBankSchema>
