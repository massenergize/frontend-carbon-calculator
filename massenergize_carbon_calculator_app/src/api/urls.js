const URL = {
  development: 'http://api-dev.massenergize.org',
  production: 'http://api.massenergize.org',
}
export const URL_ROOT = URL[process.env.NODE_ENV]
