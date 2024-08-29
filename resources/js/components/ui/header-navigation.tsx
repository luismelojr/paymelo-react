import UserMenu from '@/components/ui/user-menu'

export default function HeaderNavigation() {
  return (
    <div className={'flex justify-between md:justify-end px-4'}>
      <div className={'block md:hidden'}>Menu mobile</div>
      <div>
        <UserMenu />
      </div>
    </div>
  )
}
