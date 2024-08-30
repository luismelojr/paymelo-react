export interface ConfigInterface {
  hide_values: boolean
  hide_summaries: boolean
  visualization: 'list' | 'card'
}

export interface UserInterface {
  id: number
  name: string
  email: string
  email_verified_at?: string
  config: ConfigInterface
}

export interface Toast {
  duration: number
  text: string
  type: string
  description: string | null
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: UserInterface
    toasts: Toast[]
  }
}
