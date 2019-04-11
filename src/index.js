/**
 * 页面入口
 *
 * landenli
 */

import { Provider } from 'react-redux'
import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'
import itLocaleData from 'react-intl/locale-data/it'
import zhLocaleData from 'react-intl/locale-data/zh'
import { LocaleProvider } from 'antd-mobile'
import App from './connect/app'
import configureStore, { history } from './connect/configureStore'
import zh_cn from './i18n/zh_CN'
import en_us from './i18n/en_US'
import { LanguageTools } from 'utils'
import Config from 'configs'

// 加载国际化文件
addLocaleData([...itLocaleData, ...zhLocaleData, en_us])

// store初始化
const initialState = Immutable.Map()
const store = configureStore(initialState)
// intl语言
const intlLanguage = LanguageTools.chooseIntlLanguage()
// antd语言
const antdLanguage = LanguageTools.chooseAntdLanguage()
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale={LanguageTools.getLanguage()} messages={intlLanguage}>
        <LocaleProvider locale={antdLanguage}>
          <App history={history} />
        </LocaleProvider>
      </IntlProvider>
    </Provider>,
    document.getElementById('react-root')
  )
}

render()

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./connect/app', () => {
    render()
  })
}
