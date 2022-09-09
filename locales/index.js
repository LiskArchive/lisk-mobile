import i18n from 'i18next'
import resources from './resources'

i18n.init({
  fallbackLng: 'en',
  resources,
  lang: 'en',
  ns: ['common'],
  defaultNS: 'common',
  saveMissing: true,
  debug: false,
  nsSeparator: '|',
})

export default i18n
