export const geneateVerifyCode = (len): string => {
  const origin =
    '01234567890abcdefghijklmnopqrstuvwsyzABCDEFGHIJKLMNOPQRSTUVWSYZ'
  let result = ''
  for (let i = 0; i < len; i++) {
    result += origin[Math.floor(Math.random() * origin.length)]
  }
  return result
}