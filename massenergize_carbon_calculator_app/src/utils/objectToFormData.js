/**
 *
 * Convert all form data type Object into FormData type
 *
 * @param {Object} data A data object that has all the form data
 * @returns {FormData} FormData object with all the fields in data param
 */

export default ({ data = {} }) => {
  const additionalConfig = {
    __is_sandbox: false,
    __is_prod: false,
    __community: {},
    ...data,
  }
  const formData = new FormData()
  Object.keys(additionalConfig).map(k =>
    formData.append(k, additionalConfig[k]),
  )
  return formData
}
