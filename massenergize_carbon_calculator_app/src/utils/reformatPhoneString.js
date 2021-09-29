/**
 *
 * Trim and reformat phone number into href useable format
 *
 * @param {string} phone phone number with format XXX XXX XXXX
 * @returns {string} phone number with format +1XXXXXXXXXX
 *
 */

export default phone => {
  const cleaned = `${phone}`.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `+1${match[1]}${match[2]}${match[3]}`
  }
  return null
}
