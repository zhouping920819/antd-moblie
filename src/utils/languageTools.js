/**
 * 语言工具类
 *
 * landenli
 */

import antd_enUS from 'antd-mobile/lib/locale-provider/en_US'
import zh_cn from '../i18n/zh_CN'
import en_us from '../i18n/en_US'
import Config from '../../config/config'


/**
 * 得到语言
 */
const getLanguage = () => {
  if(__DEV__){
    return Config.i18n_locale
  }
  return navigator.language.split('-')[0]
}

/**
 * 得到语言，给出react-intl的类型
 */
const chooseIntlLanguage = () => {
  switch (getLanguage()) {
    case 'zh':
      return zh_cn
    default:
      return en_us
  }
}

/**
 * 得到语言，给出antd的类型
 */
const chooseAntdLanguage = () => {
  switch (getLanguage()) {
    case 'zh':
      return undefined
    default:
      return antd_enUS
  }
}

export default {
  getLanguage,
  chooseIntlLanguage,
  chooseAntdLanguage
}
