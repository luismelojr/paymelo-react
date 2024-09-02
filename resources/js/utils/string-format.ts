export default function StringFormat() {
  // get the first letter of the name and first letter of the surname
  function getInitials(name: string): string {
    const nameSplit = name.split(' ')
    return nameSplit.length > 1
      ? nameSplit[0].charAt(0).toUpperCase() +
          nameSplit[1].charAt(0).toUpperCase()
      : nameSplit[0].charAt(0).toUpperCase()
  }

  function formatTextTypeAccount(type: string | null) {
    switch (type) {
      case 'current':
        return 'Conta corrente'
      case 'saving':
        return 'Conta poupança'
      case 'investment':
        return 'Conta investimento'
      case 'other':
        return 'Outros'
      default:
        return ''
    }
  }

  return {
    getInitials,
    formatTextTypeAccount,
  }
}
