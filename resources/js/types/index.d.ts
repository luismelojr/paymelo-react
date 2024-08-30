interface Config {
  hide_values: boolean
  hide_summaries: boolean
  visualization: 'list' | 'card'
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
  config: Config
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
    user: User
    toasts: Toast[]
  }
}
