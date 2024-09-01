export default function FormatValuesForSelect(values: any[], isImage = false) {
  return values.map((value) => ({
    value: value.value || value.id,
    label: value.name,
    image: isImage
      ? `https://storage.googleapis.com/controlle_dev_prod/institutions_financials/${value.account_icon}`
      : null,
  }))
}
