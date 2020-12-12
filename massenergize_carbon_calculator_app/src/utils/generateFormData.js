export default ({ data = {} }) => {
  const additionalConfig = {
    __is_sandbox: false,
    __is_prod: false,
    __community: {},
    ...data,
  }
  const formData = new FormData()
  Object.keys(additionalConfig).map(k =>
    formData.append(k, additionalConfig[k])
  )
  return formData
}
