import MenuMobile from '@/components/ui/menu-mobile'
import UserMenu from '@/components/ui/user-menu'

export default function HeaderNavigation() {
  return (
    <div className={'flex justify-between items-center md:justify-end px-4'}>
      <div className={'block md:hidden'}>
        <MenuMobile />
      </div>
      <div>
        <UserMenu />
      </div>
    </div>
  )
}
