export interface ConfigInterface {
  hide_values: boolean
  hide_summaries: boolean
  visualization: 'list' | 'card'
}

export interface NotificationInterface {
  id: string
  notify_email: boolean
  notify_whatsapp: boolean
  notify_payment: boolean
}

export interface UserInterface {
  id: number
  name: string
  email: string
  phone: string | null
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
