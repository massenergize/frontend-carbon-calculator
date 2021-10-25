const URL = {
  local: 'http://api.massenergize.test:8000/api',
  development: 'http://api.massenergize.dev',
  production: 'http://api.massenergize.org',
}
export const URL_ROOT = URL[process.env.NODE_ENV]
