import i18n from '@/i18n'
const generateTitle = title => {
  return i18n.global.t('route' + '.' + title)
}
export {
  generateTitle
}
