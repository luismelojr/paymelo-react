export default function StringFormat() {
  // get the first letter of the name and first letter of the surname
  function getInitials(name: string): string {
    const nameSplit = name.split(' ')
    return nameSplit.length > 1
      ? nameSplit[0].charAt(0).toUpperCase() +
          nameSplit[1].charAt(0).toUpperCase()
      : nameSplit[0].charAt(0).toUpperCase()
  }

  return {
    getInitials,
  }
}
