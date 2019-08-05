export const EMAIL = {
  account: process.env.EMAIL_ACCOUNT || 'admin',
  password: process.env.EMAIL_PASSWORD || 'admin',
  from: process.env.EMAIL_ACCOUNT || 'admin',
}

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'admin'
}