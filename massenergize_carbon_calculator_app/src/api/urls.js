const URL = {
  development: 'http://localhost:8000',
  production: 'http://api.massenergize.org',
}
export const URL_ROOT = URL[process.env.NODE_ENV]
