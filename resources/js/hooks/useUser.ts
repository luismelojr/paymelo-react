import { usePage } from '@inertiajs/react'

import { PageProps } from '@/types'

export default function useUser() {
  const { props } = usePage<PageProps>()

  return props.auth.user
}
